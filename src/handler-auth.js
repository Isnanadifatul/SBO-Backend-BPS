const bcrypt = require('bcrypt');
const Joi = require('joi');
const { updateAuthenticationById, Authentication } = require('../models/authentication');

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
}

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
    const { nip, password } = request.payload;

    // Log request payload for debugging
    console.log('Login request payload:', { nip, password });

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
    
    // Set cookie untuk sesi
    h.state('userSession', { nip });

    return h.response('Login Successful');
  } catch (error) {
    console.error('Error during login:', error);
    return h.response('Internal Server Error').code(500);
  }
};

const logoutHandler = (request, h) => {
  try {
      // Hapus both userSession and username cookies
      h.unstate('userSession');
   

      // Redirect ke halaman login
      return h.response('Logout Successful');
  } catch (error) {
      console.error(error);
      return h.response('Internal Server Error').code(500);
  }
};

module.exports = { createAuthentication, updateAuthenticationHandler, loginHandler, logoutHandler };
