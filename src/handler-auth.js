const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Joi = require('joi');
const { updateAuthenticationById, Authentication } = require('../models/authentication');
const { Pegawai } = require('../models/pegawai');
const { where } = require('sequelize');
const { error } = require('@hapi/joi/lib/base');

// Fungsi untuk memeriksa apakah nip sudah ada
async function isUsernameExist(nip) {
  const user = await Authentication.findOne({ where: { nip } });
  return !!user;
}

async function createAuthentication(request, h) {
  try {
    const { role, password, confirmasi_password, nip } = request.payload;

    // Validasi input menggunakan Joi
    const schema = Joi.object({
      role: Joi.string().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      confirmasi_password: Joi.string().valid(Joi.ref('password')).required(),
      nip: Joi.string().required()
    });

    const { error } = schema.validate({ role, password, confirmasi_password, nip });
    if (error) {
      return h.response(error.details[0].message).code(400);
    }

    // Cek apakah nip sudah ada
    const usernameExist = await isUsernameExist(nip);
    if (usernameExist) {
      return h.response('NIP already exists.').code(400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    await Authentication.create({
      role,
      password: hashedPassword,
      confirmasi_password, // Simpan hashed password di kolom confirmasi_password juga jika memang dibutuhkan
      nip
    });

    return h.response('Registration successful!').code(201);
  } catch (error) {
    console.error('Error during registration:', error);
    return h.response('Internal Server Error').code(500);
  }
};

// Asosiasi dengan Pegawai
Authentication.belongsTo(Pegawai, { foreignKey: 'nip', targetKey: 'nip' });
// Asosiasi dengan Authentication
Pegawai.hasMany(Authentication, { foreignKey: 'nip', sourceKey: 'nip' });

//read all akun 

const getAuth = async (request, h) => {
  try {
    // Ambil data autentikasi dan pegawai
    const data = await Authentication.findAll({
      attributes: ['nip', 'confirmasi_password', 'role'], // Ambil atribut yang diinginkan dari Authentication
      include: [{
        model: Pegawai,
        attributes: ['nama'], // Ambil atribut 'nama' dari Pegawai
      }]
    });

    // Format data untuk hasil akhir
    const result = data.map(auth => ({
      nip: auth.nip,
      nama: auth.Pegawai.nama,
      confirmasi_password: auth.confirmasi_password,
      role: auth.role
    }));

    return h.response(result);
  } catch (error) {
    console.error(error);
    return h.response('Terjadi kesalahan saat mengambil data').code(500);
  }
};

const updateAuthenticationHandler = async (request, h) => {
  try {
    const { id } = request.params; // ID dari authentication yang akan di-update
    const newData = request.payload; // Data baru yang akan di-update, termasuk password jika ada perubahan

    // Lakukan update
    const result = await updateAuthenticationById(id, newData);

    if (result) {
      return h.response(`Data Authentication dengan ID ${id} berhasil diupdate.`).code(200);
    } else {
      return h.response(`Data Authentication dengan ID ${id} tidak ditemukan.`).code(404);
    }
  } catch (error) {
    console.error('Error mengupdate data Authentication:', error);
    return h.response(`Error mengupdate data Authentication: ${error.message}`).code(500);
  }
};

//handler login
const loginHandler = async (request, h) => {
  try {
    const { nip, password, role} = request.payload;

    // Log request payload for debugging
    console.log('Login request payload:', { nip, password, role });

    const user = await Authentication.findOne({ where: { nip } });

    // Log user information if found
    if (user) {
      console.log('User found:', user.toJSON());
    } else {
      console.log('NIP is incorrect');
      return h.response('NIP is incorrect').code(401);
    }

    // Log hash length for debugging
    console.log('Stored hash length:', user.password.length);

    const isValidPassword = await bcrypt.compare(password, user.password);

    // Log password verification result
    if (isValidPassword) {
      console.log('Password is correct');
    } else {
      console.log('Password is incorrect');
      return h.response('Password is incorrect').code(401);
    }
     // Generate JWT token
     const token = JWT.sign(
      {
        userId: user.id_auth,
        username: user.nama,
        role: user.role // Include any additional data you want in the token payload
      },
      process.env.JWT_SECRET, // Secret key for signing the token, should be stored securely
      { expiresIn: '24h' } // Token expiry time
    );

    const userRole = await Authentication.findOne({ where: { role } });

    if(userRole){
      console.log('Role is Correct');
    }else{
      console.log('Role is not Correct');
      return h.response('Role is incorrect').code(401);
    }
    //Mengambil date pegawai yang berelasi
    const pegawai = await Pegawai.findOne({
      where: {nip},
      attributes: ['nip', 'nama']
  }); //hanya mengambil atribut nip dan nama
    
  if (!pegawai) {
    console.log('Pegawai not found for the given NIP');
    return h.response('Pegawai not found').code(404);
  }

    // Log pegawai information if found
    console.log('Pegawai found:', pegawai.toJSON());

    
     // Mengembalikan data nip, nama dari Pegawai dan role dari Authentication
     return h.response({
      message: 'Login Successful',
      token: token,
      user: {
        nip: pegawai.nip,
        nama: pegawai.nama,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    return h.response({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred'
    }).code(500);
  }
};

const logoutHandler = (request, h) => {
  try {
     

      // Redirect ke halaman loginy
      return h.response('Logout Successful');
  } catch (error) {
      console.error(error);
      return h.response('Internal Server Error').code(500);
  }
};

module.exports = { createAuthentication, updateAuthenticationHandler, loginHandler, logoutHandler ,getAuth};
