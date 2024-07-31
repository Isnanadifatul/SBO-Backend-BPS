const { nilai_tambah, konversi } = require('../models/relasi');
const { pemenangSPT, saveTopCandidates } = require('../models/pemenang_spt');
const Sequelize = require('sequelize');

const getCombinedScores = async (request, h) => {
    try {
        const results = await konversi.findAll({
            attributes: [
              'tahun',
              'triwulan',
                'nomor_kandidat',
                'nama_kandidat',
                [Sequelize.literal(`
                  ROUND(
                    COALESCE(
                        (
                            nilai_konversi + (
                                SELECT COALESCE(SUM(nilai_kip_app + nilai_presensi), 0)
                                FROM nilai_tambah
                                WHERE nilai_tambah.tahun = nilai_konversi_survey.tahun AND
                                nilai_tambah.triwulan = nilai_konversi_survey.triwulan AND
                                nilai_tambah.nomor_kandidat = nilai_konversi_survey.nomor_kandidat 

                            )
                        ) 
                    , nilai_konversi
                    ), 2
                )
                `), 'result_scores']
            ],
            group: ['tahun','triwulan','nomor_kandidat'],
            raw: true
        });

        if (results.length === 0) {
            return h.response({ error: 'Data not found' }).code(404);
        }

        for (const result of results) {
          const nilai = result.result_scores;
          const { tahun, triwulan, nomor_kandidat, nama_kandidat } = result;

          console.log(`Menyimpan hasil untuk kandidat ${nomor_kandidat}: ${nilai}`);

          if (nilai !== undefined) {
              await saveTopCandidates(tahun, triwulan, nomor_kandidat, nama_kandidat, nilai);
          } else {
              console.warn(`Nilai untuk ${nomor_kandidat} adalah undefined`);
          }
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
