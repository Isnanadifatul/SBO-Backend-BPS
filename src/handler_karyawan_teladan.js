const {Sequelize} = require('sequelize');
const { survey_pegawai_teladan, insertUser, dbConnection, konversi, saveKonversi} = require('../models/karyawan_teladan');
const { connection } = require('../db-config/connect');

//insert survey1
async function insertSurveyHandler(request, h) {
  try {
      const {nama_lengkap, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
        pertanyaan_1, pertanyaan_2, pertanyaan_3, pertanyaan_4, pertanyaan_5, 
        pertanyaan_6, pertanyaan_7, pertanyaan_8, pertanyaan_9, pertanyaan_10,
        pertanyaan_11, pertanyaan_12, pertanyaan_13, pertanyaan_14, pertanyaan_15,
        pertanyaan_16, pertanyaan_17, pertanyaan_18, pertanyaan_19, pertanyaan_20,
        pertanyaan_21} = request.payload;

      // Insert user baru
      await insertUser(nama_lengkap, jenis_kelamin, umur, pendidikan, masa_kerja, nomor_kandidat, nama_kandidat,
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
        const result = await survey_pegawai_teladan.findAll({ 
          attributes: [
          'nama_kandidat',
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_1')), 'pertanyaan_1'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_2')), 'pertanyaan_2'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_3')), 'pertanyaan_3'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_4')), 'pertanyaan_4'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_5')), 'pertanyaan_5'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_6')), 'pertanyaan_6'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_7')), 'pertanyaan_7'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_8')), 'pertanyaan_8'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_9')), 'pertanyaan_9'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_10')), 'pertanyaan_10'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_11')), 'pertanyaan_11'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_12')), 'pertanyaan_12'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_13')), 'pertanyaan_13'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_14')), 'pertanyaan_14'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_15')), 'pertanyaan_15'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_16')), 'pertanyaan_16'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_17')), 'pertanyaan_17'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_18')), 'pertanyaan_18'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_19')), 'pertanyaan_19'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_20')), 'pertanyaan_20'],
                [Sequelize.fn('AVG', Sequelize.col('pertanyaan_21')), 'pertanyaan_21']
      ],
      group: ['nomor_kandidat']
  });

  if (result.length === 0) {
      return h.response({ error: 'Kandidat not found' }).code(404);
  }

  return h.response(result).code(200);

  


} catch (err) {
  console.error(err);
  return h.response({ error: 'Error Guysssss' }).code(500);
}
};

//get rata rata skor
const AVGSurveyPerKandidat = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
          attributes: [
              'nama_kandidat',
              [Sequelize.fn('AVG', Sequelize.literal(`
                  (pertanyaan_1 + pertanyaan_2 + pertanyaan_3 + pertanyaan_4 + pertanyaan_5 + 
                   pertanyaan_6 + pertanyaan_7 + pertanyaan_8 + pertanyaan_9 + pertanyaan_10 + 
                   pertanyaan_11 + pertanyaan_12 + pertanyaan_13 + pertanyaan_14 + pertanyaan_15 + 
                   pertanyaan_16 + pertanyaan_17 + pertanyaan_18 + pertanyaan_19 + pertanyaan_20 + 
                   pertanyaan_21) / 21
              `)), 'avg_total_hasil']
          ],
          group: ['nomor_kandidat']
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
            'nomor_kandidat',
            'nama_kandidat',
            [Sequelize.fn('ROUND', Sequelize.literal(`
                AVG(
                    (pertanyaan_1 + pertanyaan_2 + pertanyaan_3 + pertanyaan_4 + pertanyaan_5 + 
                     pertanyaan_6 + pertanyaan_7 + pertanyaan_8 + pertanyaan_9 + pertanyaan_10 + 
                     pertanyaan_11 + pertanyaan_12 + pertanyaan_13 + pertanyaan_14 + pertanyaan_15 + 
                     pertanyaan_16 + pertanyaan_17 + pertanyaan_18 + pertanyaan_19 + pertanyaan_20 + 
                     pertanyaan_21) / 21
                )
            `), 2), 'avg_total_hasil_30_percent']
        ],
        group: ['nomor_kandidat', 'nama_kandidat'],
        raw: true
    });

    if (results.length === 0) {
        return h.response({ error: 'Data not found' }).code(404);
    }

    for (const result of results) {
        const avgTotal = result.avg_total_hasil_30_percent;
        const nomorKandidat = result.nomor_kandidat;
        const namaKandidat = result.nama_kandidat;

        console.log(`Menyimpan hasil untuk kandidat ${nomorKandidat}: ${avgTotal}`);

        if (avgTotal !== undefined) {
            await saveKonversi(nomorKandidat, namaKandidat, avgTotal);
        } else {
            console.warn(`Nilai untuk ${nomorKandidat} adalah undefined`);
        }
    }

    return h.response(results).code(200);
} catch (err) {
    console.error('Failed to fetch data:', err);
    return h.response({ error: 'Failed to fetch data' }).code(500);
}
};



const getSurveyKandidat1 = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
        attributes: [
          'nama_kandidat',
          'pertanyaan_1','pertanyaan_2','pertanyaan_3','pertanyaan_4','pertanyaan_5',
          'pertanyaan_6','pertanyaan_7','pertanyaan_8','pertanyaan_9','pertanyaan_10',
          'pertanyaan_11','pertanyaan_12','pertanyaan_13','pertanyaan_14', 'pertanyaan_15',
          'pertanyaan_16','pertanyaan_17', 'pertanyaan_18', 'pertanyaan_19', 'pertanyaan_20',
          'pertanyaan_21'
      ],
          where: {
            nomor_kandidat: 'Kandidat 1'
          }
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
const getSurveyKandidat2 = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
        attributes: [
          'nama_kandidat',
          'pertanyaan_1','pertanyaan_2','pertanyaan_3','pertanyaan_4','pertanyaan_5',
          'pertanyaan_6','pertanyaan_7','pertanyaan_8','pertanyaan_9','pertanyaan_10',
          'pertanyaan_11','pertanyaan_12','pertanyaan_13','pertanyaan_14', 'pertanyaan_15',
          'pertanyaan_16','pertanyaan_17', 'pertanyaan_18', 'pertanyaan_19', 'pertanyaan_20',
          'pertanyaan_21'
      ],
          where: {
            nomor_kandidat: 'Kandidat 2'
          }
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

const getSurveyKandidat3 = async (request, h) => {
  try {
      const results = await survey_pegawai_teladan.findAll({
        attributes: [
          'nama_kandidat',
          'pertanyaan_1','pertanyaan_2','pertanyaan_3','pertanyaan_4','pertanyaan_5',
          'pertanyaan_6','pertanyaan_7','pertanyaan_8','pertanyaan_9','pertanyaan_10',
          'pertanyaan_11','pertanyaan_12','pertanyaan_13','pertanyaan_14', 'pertanyaan_15',
          'pertanyaan_16','pertanyaan_17', 'pertanyaan_18', 'pertanyaan_19', 'pertanyaan_20',
          'pertanyaan_21'
      ],
          where: {
            nomor_kandidat: 'Kandidat 3'
          }
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

  module.exports = { 
    insertSurveyHandler,
    totalSurveyHandler,
    getSurveyKandidat1,
    getSurveyKandidat2,
    getSurveyKandidat3,
    AVGSurveyPerKandidat,
    AVGConvert30
    };
