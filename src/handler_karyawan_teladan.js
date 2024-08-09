const {Sequelize} = require('sequelize');
const { survey_pegawai_teladan, insertUser, dbConnection,pool, konversi, saveKonversi} = require('../models/karyawan_teladan');
const { connection } = require('../db-config/connect');

//insert survey1
async function insertSurveyHandler(request, h) {
  try {
      const {triwulan, nama_lengkap, nip, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21} = request.payload;

      // Insert user baru
      await insertUser(triwulan, nama_lengkap, nip, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21);

      return h.response('Input Success').code(201);
    } catch (error) {
      console.error(error);
      return h.response('Internal Server Error').code(500);
    }
  };

  //get data hasil survey
  const totalSurveyHandler = async (request, h) => {
    try {
        const { tahun, triwulan, nomor_kandidat } = request.query;

        // Validasi parameter tahun
        if (!tahun) {
            return h.response({ error: 'Parameter tahun diperlukan' }).code(400);
        }

        // Membuat query SQL dinamis
        let query = `SELECT 
                        tahun, 
                        triwulan, 
                        nomor_kandidat, 
                        nama_kandidat,
                        AVG(pertanyaan_1) AS pertanyaan_1,
                        AVG(pertanyaan_2) AS pertanyaan_2,
                        AVG(pertanyaan_3) AS pertanyaan_3,
                        AVG(pertanyaan_4) AS pertanyaan_4,
                        AVG(pertanyaan_5) AS pertanyaan_5,
                        AVG(pertanyaan_6) AS pertanyaan_6,
                        AVG(pertanyaan_7) AS pertanyaan_7,
                        AVG(pertanyaan_8) AS pertanyaan_8,
                        AVG(pertanyaan_9) AS pertanyaan_9,
                        AVG(pertanyaan_10) AS pertanyaan_10,
                        AVG(pertanyaan_11) AS pertanyaan_11,
                        AVG(pertanyaan_12) AS pertanyaan_12,
                        AVG(pertanyaan_13) AS pertanyaan_13,
                        AVG(pertanyaan_14) AS pertanyaan_14,
                        AVG(pertanyaan_15) AS pertanyaan_15,
                        AVG(pertanyaan_16) AS pertanyaan_16,
                        AVG(pertanyaan_17) AS pertanyaan_17,
                        AVG(pertanyaan_18) AS pertanyaan_18,
                        AVG(pertanyaan_19) AS pertanyaan_19,
                        AVG(pertanyaan_20) AS pertanyaan_20,
                        AVG(pertanyaan_21) AS pertanyaan_21
                    FROM survey_pegawai_teladan
                    WHERE tahun LIKE ?`;

        const params = [`%${tahun}%`];

        if (triwulan) {
            query += ' AND triwulan = ?';
            params.push(triwulan);
        }

        if (nomor_kandidat) {
            query += ' AND nomor_kandidat = ?';
            params.push(nomor_kandidat);
        }

        query += ' GROUP BY tahun, triwulan, nomor_kandidat';

        const [rows] = await pool.execute(query, params);

        return h.response(rows).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Terjadi kesalahan saat mengambil data' }).code(500);
    }
};


//get rata rata skor
const AVGSurveyPerKandidat = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
          attributes: [
            "nama_lengkap",
            "nip",
              'tahun',
            'triwulan',
          'nama_kandidat',
              [Sequelize.fn('AVG', Sequelize.literal(`
                  (pertanyaan_1 + pertanyaan_2 + pertanyaan_3 + pertanyaan_4 + pertanyaan_5 + 
                   pertanyaan_6 + pertanyaan_7 + pertanyaan_8 + pertanyaan_9 + pertanyaan_10 + 
                   pertanyaan_11 + pertanyaan_12 + pertanyaan_13 + pertanyaan_14 + pertanyaan_15 + 
                   pertanyaan_16 + pertanyaan_17 + pertanyaan_18 + pertanyaan_19 + pertanyaan_20 + 
                   pertanyaan_21) / 21
              `)), 'avg_total_hasil']
          ],
          group: ['tahun','triwulan','nomor_kandidat'],
          order: [['triwulan', 'DESC']]
      });

      if (results.length === 0) {
          return h.response({ error: 'Data not found' }).code(404);
      }

      return h.response(results).code(200);
  } catch (err) {
      console.error(err);
      return h.response({ error: 'Failed to fetch data' }).code(500);
  }
};

//Nilai rata rata dikali 30%
const AVGConvert30 = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
          attributes: [
              'tahun',
              'triwulan',
              'nomor_kandidat',
              'nama_kandidat',
              [Sequelize.fn('ROUND', Sequelize.literal(`
                  AVG(
                      (pertanyaan_1 + pertanyaan_2 + pertanyaan_3 + pertanyaan_4 + pertanyaan_5 + 
                       pertanyaan_6 + pertanyaan_7 + pertanyaan_8 + pertanyaan_9 + pertanyaan_10 + 
                       pertanyaan_11 + pertanyaan_12 + pertanyaan_13 + pertanyaan_14 + pertanyaan_15 + 
                       pertanyaan_16 + pertanyaan_17 + pertanyaan_18 + pertanyaan_19 + pertanyaan_20 + 
                       pertanyaan_21) / 21 * 0.3
                  )
              `), 2), 'avg_total_hasil_30_percent' ]
          ],
          group: ['tahun','triwulan','nomor_kandidat'],
          raw: true,
      });

      if (results.length === 0) {
          return h.response({ error: 'Data not found' }).code(404);
      }

      for (const result of results) {
          const avgTotal = result.avg_total_hasil_30_percent;
          const { tahun, triwulan, nomor_kandidat, nama_kandidat } = result;

          console.log(`Menyimpan hasil untuk kandidat ${nomor_kandidat}: ${avgTotal}`);

          if (avgTotal !== undefined) {
              await saveKonversi(tahun, triwulan, nomor_kandidat, nama_kandidat, avgTotal);
          } else {
              console.warn(`Nilai untuk ${nomor_kandidat} adalah undefined`);
          }
      }

      return h.response(results).code(200);
  } catch (err) {
      console.error('Failed to fetch data:', err);
      return h.response({ error: 'Failed to fetch data' }).code(500);
  }
};



const getSurveyKandidat = async (request, h) => {
  try {
      const { tahun, triwulan, nomor_kandidat } = request.query;

      // Validasi parameter tahun
      if (!tahun) {
        return h.response({ error: 'Parameter tahun diperlukan' }).code(400);
      }

      // Membuat query dasar
      let query = `
        SELECT 
          nama_lengkap,
          nip,
          tahun,
          triwulan,
          nomor_kandidat,
          nama_kandidat,
          pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5,
          pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
          pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
          pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
          pertanyaan_21
        FROM survey_pegawai_teladan
        WHERE tahun LIKE ?`;

      const params = [`%${tahun}%`];

      // Tambahkan kondisi tambahan berdasarkan triwulan dan nomor_kandidat jika tersedia
      if (triwulan) {
          query += ' AND triwulan = ?';
          params.push(triwulan);
      }

      if (nomor_kandidat) {
          query += ' AND nomor_kandidat = ?';
          params.push(nomor_kandidat);
      }

      // Tambahkan order by dan grouping
      query += ' ORDER BY tahun DESC, triwulan DESC';

      // Eksekusi query
      const [rows] = await pool.execute(query, params);

      // Cek jika data ditemukan
      if (rows.length === 0) {
          return h.response({ error: 'Data tidak ditemukan' }).code(404);
      }

      // Return hasil
      return h.response(rows).code(200);
  } catch (error) {
      console.error(error);
      return h.response({ error: 'Terjadi kesalahan saat mengambil data' }).code(500);
  }
};


  module.exports = { 
    insertSurveyHandler,
    totalSurveyHandler,
    getSurveyKandidat,
    AVGSurveyPerKandidat,
    AVGConvert30
    };
