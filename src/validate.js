const {Authentication} = require('../models/authentication');

const validate = async (decoded, request, h) => {
  try {
    // Cari pengguna berdasarkan id yang terdekripsi (decoded.userId)
    const user = await Authentication.findOne({ where: { id_auth: decoded.userId } });

    // Jika pengguna tidak ditemukan, kembalikan isValid: false
    if (!user) {
      return { isValid: false };
    }

    // Jika pengguna ditemukan, kembalikan isValid: true
    return { isValid: true };
  } catch (error) {
    console.error('Error validating JWT:', error);
    return { isValid: false };
  }
};

module.exports = { validate };
