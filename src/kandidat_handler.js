const { Kandidat, insertKandidat, updateKandidat, deleteKandidat } = require('../models/kandidat');

const createKandidat = async (request, h) => {
  const { nomor_kandidat, nama_kandidat } = request.payload;
    const file = request.payload.file;

    if (!file) {
        return h.response({ message: 'No file uploaded' }).code(400);
    }

    try {
        const filePath = file.path;
        const imageBuffer = fs.readFileSync(filePath);
        const imageBase64 = imageBuffer.toString('base64');

        const [result] = await pool.execute(
            'INSERT INTO kandidat (nomor_kandidat, nama_kandidat, foto) VALUES (?, ?, ?)',
            [nomor_kandidat, nama_kandidat, imageBase64]
        );

        fs.unlinkSync(filePath); // Hapus file setelah disimpan
        return h.response({ message: 'Image uploaded successfully!', id: result.insertId }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ message: 'Failed to upload image.' }).code(500);
    }
};

const getKandidat = async (request, h) => {
  const { id } = request.params;
  const kandidat = await Kandidat.findByPk(id);

  if (kandidat) {
    return kandidat;
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

const updateKandidatHandler = async (request, h) => {
  const { id } = request.params;
  const { nomor_kandidat, nama_kandidat, foto } = request.payload;
  const base64Image = foto.toString('base64');

  const success = await updateKandidat(id, { nomor_kandidat, nama_kandidat, foto: base64Image });
  if (success) {
    return { message: 'Kandidat berhasil diperbarui' };
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

const deleteKandidatHandler = async (request, h) => {
  const { id } = request.params;
  const success = await deleteKandidat(id);

  if (success) {
    return { message: 'Kandidat berhasil dihapus' };
  }
  return h.response({ message: 'Kandidat tidak ditemukan' }).code(404);
};

module.exports = {
  createKandidat,
  getKandidat,
  updateKandidatHandler,
  deleteKandidatHandler
};
