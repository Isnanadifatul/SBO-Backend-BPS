const {survey_budaya_organisasi} = require('../models/survey_budaya_organisasi');



const isiSurveyHandler = async (request, h) => {
    const { nip, nama, jenis_kelamin, umur, pendidikan, masa_kerja, score_harapan, score_kinerja, hasil } = request.payload;

    try {
        // Mendapatkan satu id_pertanyaan secara acak dari tabel pertanyaan_leadership
        const pertanyaan = await PertanyaanLead.findOne({
            order: [Sequelize.fn('RAND')]
        });

        if (!pertanyaan) {
            return h.response({ error: 'Pertanyaan tidak ditemukan' }).code(404);
        }

        const newSurveyResponse = await survey_budaya_organisasi.create({
            nip,
            id_pertanyaan_b: pertanyaan.id_pertanyaan,
            nama,
            jenis_kelamin,
            umur,
            pendidikan,
            masa_kerja,
            score_harapan,
            score_kinerja,
            hasil
        });

        return h.response({ message: 'Respon survey berhasil disimpan', id: newSurveyResponse.id_survey_b }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

  
module.exports ={isiSurveyHandler};