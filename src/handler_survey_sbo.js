const {survey_budaya_organisasi} = require('../models/survey_budaya_organisasi');
const {hasil_survey_priker, hasil_survey_leadbo, hasil_survey_pebo, hasil_survey_sysbo} = require('../models/hasil_survey_sbo');

const { Op, Model, where } = require('sequelize');
const {pertanyaan_perilaku} = require('../models/pertanyaan_perilaku');
const { pertanyaan_peop } = require('../models/pertanyaan_people');
const { pertanyaan_lead } = require('../models/pertanyaan_lead');
const { pertanyaan_sys } = require('../models/pertanyaan_system');

const isiSurveyHandler = async (request, h) => {
    const {triwulan, nama, jenis_kelamin, umur, pendidikan, masa_kerja, score_harapan, score_kinerja, label} = request.payload;
    const tahun = new Date().getFullYear();

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
            triwulan,
            tahun,
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

// Function to calculate triwulan value
const calculateTriwulan = async (Model, year, maxTriwulan) => {
  const lastEntry = await Model.findOne({
    where: { tahun: year },
    order: [['triwulan', 'DESC']]
  });

  let triwulan = lastEntry ? lastEntry.triwulan + 1 : 1;

  if (triwulan > maxTriwulan) {
    throw new Error(`Triwulan tidak boleh lebih dari ${maxTriwulan} dalam satu tahun`);
  }

  return triwulan;
};


// Function to calculate average scores
const calculateAverageScores = async (label, triwulan, tahun) => {
  const responses = await survey_budaya_organisasi.findAll({
    where: {
      label: {
        [Op.like]: `${label}%`,
      },
      triwulan: triwulan,
      tahun: tahun
    },
    attributes: ['score_harapan', 'score_kinerja'],
  });

  let totalHarapan = [];
  let totalKinerja = [];
  let count = 0;

  responses.forEach((response) => {
    const harapanArray = JSON.parse(response.score_harapan);
    const kinerjaArray = JSON.parse(response.score_kinerja);
    harapanArray.forEach((score, index) => {
      totalHarapan[index] = (totalHarapan[index] || 0) + score;
    });
    kinerjaArray.forEach((score, index) => {
      totalKinerja[index] = (totalKinerja[index] || 0) + score;
    });
    count++;
  });

  const avgScoresHarapan = totalHarapan.map((total) => (total / count).toFixed(2));
  const avgScoresKinerja = totalKinerja.map((total) => (total / count).toFixed(2));

  return { label, avgScoresHarapan, avgScoresKinerja };
};

// Handler function for the route
const getAverageScoresHandler = async (request, h) => {
  const { label, triwulan, tahun } = request.params;

  try {
      const { avgScoresHarapan, avgScoresKinerja } = await calculateAverageScores(label, triwulan, tahun);
      let Model;
      let PertanyaanModel;
      let numQuestions;

      switch (label) {
          case 'PriKer':
              Model = hasil_survey_priker;
              PertanyaanModel = pertanyaan_perilaku;
              numQuestions = 7;
              break;
          case 'PeBO':
              Model = hasil_survey_pebo;
              PertanyaanModel = pertanyaan_peop;
              numQuestions = 21;
              break;
          case 'LeadBO':
              Model = hasil_survey_leadbo;
              PertanyaanModel = pertanyaan_lead;
              numQuestions = 8;
              break;
          case 'SysBO':
              Model = hasil_survey_sysbo;
              PertanyaanModel = pertanyaan_sys;
              numQuestions = 11;
              break;
          default:
              throw new Error('Invalid label');
      }

      const calculatedTriwulan = await calculateTriwulan(Model, tahun, 4);

      for (let i = 0; i < avgScoresHarapan.length; i++) {
          const idPertanyaan = i < numQuestions ? i + 1 : null;

          if (idPertanyaan) {
              const pertanyaanExists = await PertanyaanModel.findByPk(idPertanyaan);
              if (!pertanyaanExists) {
                  throw new Error(`id_pertanyaan ${idPertanyaan} tidak ditemukan dalam tabel pertanyaan`);
              }
          }

          await Model.create({
              x: avgScoresKinerja[i],
              y: avgScoresHarapan[i],
              tahun: tahun,
              triwulan: calculatedTriwulan,
              id_pertanyaan: idPertanyaan
          });
      }

      return h.response({ label, avgScoresHarapan, avgScoresKinerja }).code(200);
  } catch (error) {
      return h.response({ error: error.message }).code(500);
  }
};

/*
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
*/
/*
// Definisi asosiasi
hasil_survey_priker.belongsTo(pertanyaan_perilaku, { foreignKey: 'id_pertanyaan', targetKey: 'id_pertanyaan' });

//Menampilkan hasil survey pada Diagram Kartesius
const getSurveyDataByYearAndQuarter = async (request, h) => {
  const { tahun, triwulan } = request.params;
  try {
    const surveyData = await hasil_survey_priker.findAll({
      where: { tahun: tahun, triwulan: triwulan },
      include: [{
        model: pertanyaan_perilaku,
        required: true,
        attributes: ['label'],
      }],
      logging: console.log
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
*/

//menampilkan hasil survey pada diagram kartesius
const getSurveyDataByLabelYearAndQuarter = async (request, h) => {
  const { label, tahun, triwulan } = request.params;

  let Model;
  let PertanyaanModel;

  switch (label) {
    case 'PriKer':
      Model = hasil_survey_priker;
      PertanyaanModel = pertanyaan_perilaku;
      break;
    case 'PeBO':
      Model = hasil_survey_pebo;
      PertanyaanModel = pertanyaan_peop;
      break;
    case 'LeadBO':
      Model = hasil_survey_leadbo;
      PertanyaanModel = pertanyaan_lead;
      break;
    case 'SysBO':
      Model = hasil_survey_sysbo;
      PertanyaanModel = pertanyaan_sys;
      break;
    default:
      return h.response({ error: 'Invalid label' }).code(400);
  }

  try {
    const surveyData = await Model.findAll({
      where: { tahun: tahun, triwulan: triwulan },
      include: [{
        model: PertanyaanModel,
        required: true,
        attributes: ['label'],
      }],
      logging: console.log
    });

    const formattedResponse = {
      label: label,
      tahun: tahun,
      triwulan: triwulan,
      data: surveyData.map(item => ({
        x: parseFloat(item.x),
        y: parseFloat(item.y),
        label: item[PertanyaanModel.name].label,
      }))
    };

    return h.response(formattedResponse).code(200);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return h.response({ error: 'Internal server error' }).code(500);
  }
};




module.exports = { isiSurveyHandler, getAverageScoresHandler, getAverageScoresHandler, calculateAverageScores, getSurveyDataByLabelYearAndQuarter };
