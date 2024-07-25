const { nilai_tambah, konversi } = require('../models/relasi');
const Sequelize = require('sequelize');

const getCombinedScores = async (request, h) => {
    try {
        const results = await konversi.findAll({
            attributes: [
                'nomor_kandidat',
                'nama_kandidat',
                [Sequelize.literal(`
                    COALESCE(
                        (
                            nilai_konversi + (
                                SELECT COALESCE(SUM(nilai_kip_app + nilai_presensi), 0)
                                FROM nilai_tambah
                                WHERE nilai_tambah.nomor_kandidat = nilai_konversi_survey.nomor_kandidat
                            )
                        ) / 3
                    , nilai_konversi / 3)
                `), 'total_nilai_divided_by_3']
            ],
            raw: true
        });

        if (results.length === 0) {
            return h.response({ error: 'Data not found' }).code(404);
        }

        return h.response(results).code(200);
    } catch (err) {
        console.error('Failed to calculate total scores:', err);
        return h.response({ error: 'Failed to calculate total scores' }).code(500);
    }
};

module.exports = {
    getCombinedScores
};