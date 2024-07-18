const {survey_budaya_organisasi} = require('../models/survey_budaya_organisasi');
const {hasil_survey_priker} = require('../models/hasil_survey_sbo');
const {pertanyaan_perilaku} = require('../models/pertanyaan_perilaku');

const { Op } = require('sequelize');

const isiSurveyHandler = async (request, h) => {
    const { nama, jenis_kelamin, umur, pendidikan, masa_kerja, score_harapan, score_kinerja, label } = request.payload;

    try {

       // Cek apakah label sudah ada
       let uniqueLabel = label;
       const existingEntry = await survey_budaya_organisasi.findOne({
           where: { label: uniqueLabel }
       });

       if (existingEntry) {
           uniqueLabel = `${label}-${Date.now()}`;
       }
      
        const newSurveyResponse = await survey_budaya_organisasi.create({
            label: uniqueLabel,
            nama,
            jenis_kelamin,
            umur,
            pendidikan,
            masa_kerja,
            score_harapan,
            score_kinerja
        });

        return h.response({ message: 'Respon survey berhasil disimpan', id: newSurveyResponse.id_survey_b }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};


//read all
const getSurveyPriker = async (request, h) => {
    try {
      const surveys = await hasil_survey_priker.findAll();
      return h.response(surveys).code(200);
    } catch (error) {
      console.error(error);
      return h.response('Error fetching data').code(500);
    }
  };


  //definisi asosiasi
  hasil_survey_priker.belongsTo(pertanyaan_perilaku, { foreignKey: 'id_hasil_priker', targetKey: 'id_pertanyaan' });

const getSurveyDataByYearAndQuarter = async (request, h) => {
  const { tahun, triwulan } = request.params;
  try {
    const surveyData = await hasil_survey_priker.findAll({
      where: { tahun: tahun, triwulan: triwulan },
      include: [{
        model: pertanyaan_perilaku,
        required: true,
        attributes: ['label'],
      }]
    });

    const formattedResponse = {
      tahun: tahun,
      triwulan: triwulan,
      data: surveyData.map(item => ({
        x: parseFloat(item.x),
        y: parseFloat(item.y),
        label: item.pertanyaan_perilaku.label,
      }))
    };

    return h.response(formattedResponse).code(200);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return h.response({ error: 'Internal server error' }).code(500);
  }
};



/*
const calculateAverageScores = async (label) => {
  try {
      const surveyResponses = await survey_budaya_organisasi.findAll({
          where: { label: { [Op.like]: `${label}%` } },
          attributes: ['score_harapan', 'score_kinerja'],
      });

      if (!surveyResponses.length) {
          throw new Error(`No survey responses found for label: ${label}`);
      }

      const scoresHarapan = [];
      const scoresKinerja = [];

      surveyResponses.forEach((response) => {
          const scoreHarapanArray = JSON.parse(response.score_harapan);
          const scoreKinerjaArray = JSON.parse(response.score_kinerja);

          if (!Array.isArray(scoreHarapanArray) || !Array.isArray(scoreKinerjaArray)) {
              throw new Error('score_harapan or score_kinerja is not an array');
          }

          scoreHarapanArray.forEach((score, index) => {
              if (!scoresHarapan[index]) {
                  scoresHarapan[index] = [];
              }
              scoresHarapan[index].push(score);
          });
          scoreKinerjaArray.forEach((score, index) => {
              if (!scoresKinerja[index]) {
                  scoresKinerja[index] = [];
              }
              scoresKinerja[index].push(score);
          });
      });

      const avgScoresHarapan = scoresHarapan.map(scores => {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          return Math.round(avg * 100) / 100; // Membulatkan ke dua angka di belakang koma
      });
      const avgScoresKinerja = scoresKinerja.map(scores => {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          return Math.round(avg * 100) / 100; // Membulatkan ke dua angka di belakang koma
      });

      return {
          label,
          avgScoresHarapan,
          avgScoresKinerja
      };
  } catch (error) {
      console.error('Error calculating average scores:', error);
      throw error;
  }
};
*/
const getAverageScoresHandler = async (request, h) => {
  const { label } = request.params;
  try {
      const averageScores = await calculateAverageScores(label);
      return h.response(averageScores).code(200);
  } catch (error) {
      return h.response({ error: error.message }).code(500);
  }
};

//menyimpan rata-rata
const saveAverageScores = async (label, avgScoresHarapan, avgScoresKinerja) => {
  const currentYear = new Date().getFullYear();
  const surveyInterval = 3; // interval survey in months
  const totalSurveysPerYear = 12 / surveyInterval;
  const getTriwulan = () => {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / surveyInterval);
  };

  const triwulan = getTriwulan();
  let model;

  switch (label) {
    case 'PriKer':
      model = hasil_survey_priker;
      break;
    case 'PeBO':
      model = hasil_survey_pebo;
      break;
    case 'LeadBO':
      model = hasil_survey_leadbo;
      break;
    case 'SysBO':
      model = hasil_survey_sysbo;
      break;
    default:
      throw new Error(`Unknown label: ${label}`);
  }

  const records = avgScoresHarapan.map((avgHarapan, index) => ({
    x: avgScoresKinerja[index].toFixed(2),
    y: avgHarapan.toFixed(2),
    tahun: currentYear.toString(),
    triwulan: triwulan.toString(),
  }));

  await model.bulkCreate(records);
};

//menghitung rat-rata
const calculateAverageScores = async (label) => {
  try {
    const surveyResponses = await survey_budaya_organisasi.findAll({
      where: { label: { [Op.like]: `${label}%` } },
      attributes: ['score_harapan', 'score_kinerja'],
    });

    if (!surveyResponses.length) {
      throw new Error(`No survey responses found for label: ${label}`);
    }

    const scoresHarapan = [];
    const scoresKinerja = [];

    surveyResponses.forEach((response) => {
      const scoreHarapanArray = JSON.parse(response.score_harapan);
      const scoreKinerjaArray = JSON.parse(response.score_kinerja);

      if (!Array.isArray(scoreHarapanArray) || !Array.isArray(scoreKinerjaArray)) {
        throw new Error('score_harapan or score_kinerja is not an array');
      }

      scoreHarapanArray.forEach((score, index) => {
        if (!scoresHarapan[index]) {
          scoresHarapan[index] = [];
        }
        scoresHarapan[index].push(score);
      });
      scoreKinerjaArray.forEach((score, index) => {
        if (!scoresKinerja[index]) {
          scoresKinerja[index] = [];
        }
        scoresKinerja[index].push(score);
      });
    });

    const avgScoresHarapan = scoresHarapan.map(scores => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return Math.round(avg * 100) / 100; // Membulatkan ke dua angka di belakang koma
    });
    const avgScoresKinerja = scoresKinerja.map(scores => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return Math.round(avg * 100) / 100; // Membulatkan ke dua angka di belakang koma
    });

    await saveAverageScores(label, avgScoresHarapan, avgScoresKinerja);

    return {
      label,
      avgScoresHarapan,
      avgScoresKinerja
    };
  } catch (error) {
    console.error('Error calculating average scores:', error);
    throw error;
  }
};


module.exports = { isiSurveyHandler, getAverageScoresHandler, getSurveyPriker, getSurveyDataByYearAndQuarter };
