const {survey_budaya_organisasi} = require('../models/survey_budaya_organisasi');
const {hasil_survey_priker, hasil_survey_leadbo, hasil_survey_pebo, hasil_survey_sysbo} = require('../models/hasil_survey_sbo');

const { Op, Model, where } = require('sequelize');
const {pertanyaan_perilaku} = require('../models/pertanyaan_perilaku');
const { pertanyaan_peop } = require('../models/pertanyaan_people');
const { pertanyaan_lead } = require('../models/pertanyaan_lead');
const { pertanyaan_sys } = require('../models/pertanyaan_system');

//asosiasi table
hasil_survey_priker.belongsTo(pertanyaan_perilaku, { foreignKey: 'id_pertanyaan', targetKey: 'id_pertanyaan', as: 'pertanyaan_perilaku' });
pertanyaan_perilaku.hasMany(hasil_survey_priker, { foreignKey: 'id_pertanyaan', sourceKey: 'id_pertanyaan' });
hasil_survey_pebo.belongsTo(pertanyaan_peop, { foreignKey: 'id_pertanyaan', targetKey: 'id_pertanyaan', as: 'pertanyaan_people' });
pertanyaan_peop.hasMany(hasil_survey_pebo, { foreignKey: 'id_pertanyaan', sourceKey: 'id_pertanyaan' });
hasil_survey_leadbo.belongsTo(pertanyaan_lead, { foreignKey: 'id_pertanyaan', targetKey: 'id_pertanyaan', as: 'pertanyaan_leadership' });
pertanyaan_lead.hasMany(hasil_survey_leadbo, { foreignKey: 'id_pertanyaan', sourceKey: 'id_pertanyaan' });
hasil_survey_sysbo.belongsTo(pertanyaan_sys, { foreignKey: 'id_pertanyaan', targetKey: 'id_pertanyaan', as: 'pertanyaan_system' });
pertanyaan_sys.hasMany(hasil_survey_sysbo, { foreignKey: 'id_pertanyaan', sourceKey: 'id_pertanyaan' });


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

// fungsi untuk menghitung triwulan
const calculateTriwulan = async (label, year) => {
  const lastEntry = await survey_budaya_organisasi.findOne({
    where: { label: { [Op.like]: `${label}%` }, tahun: year },
    order: [['triwulan', 'DESC']]
  });

  return lastEntry ? lastEntry.triwulan : 1;
};

//fungsi untuk mengecek apakah data triwulan dan tahun ada pada tabel  hasil_survey_priker, dll
const checkExistingTriwulan = async (Model, year, triwulan) => {
  const existingEntry = await Model.findOne({
    where: { tahun: year, triwulan: triwulan }
  });

  return !!existingEntry;
};

// Function to get the latest triwulan from survey_budaya_organisasi
//fungsi untuk men
const getLatestTriwulan = async (year, label) => {
  const latestEntry = await survey_budaya_organisasi.findOne({
    where: { tahun: year, label: { [Op.like]: `${label}%` } },
    order: [['triwulan', 'DESC']]
  });

  return latestEntry ? latestEntry.triwulan : null;
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
    const latestTriwulan = await getLatestTriwulan(tahun, label);

    if (!latestTriwulan || latestTriwulan < triwulan) {
      return h.response({ error: `Survey dengan triwulan ${triwulan} belum ada` }).code(400);
    }

    const Model = getModelByLabel(label); // Function to get the model based on the label
    const existingTriwulan = await checkExistingTriwulan(Model, tahun, triwulan);

    if (existingTriwulan) {
      return h.response({ error: `Survey ${label} dengan triwulan ${triwulan} sudah dihitung` }).code(400);
    }

    const { avgScoresHarapan, avgScoresKinerja } = await calculateAverageScores(label, triwulan, tahun);
    const PertanyaanModel = getPertanyaanModelByLabel(label); // Function to get the pertanyaan model based on the label
    const numQuestions = getNumQuestionsByLabel(label); // Function to get the number of questions based on the label

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
        triwulan: triwulan,
        id_pertanyaan: idPertanyaan
      });
    }

    return h.response({ label, avgScoresHarapan, avgScoresKinerja }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

// Function to get the appropriate model based on the label
const getModelByLabel = (label) => {
  switch (label) {
    case 'PriKer':
      return hasil_survey_priker;
    case 'PeBO':
      return hasil_survey_pebo;
    case 'LeadBO':
      return hasil_survey_leadbo;
    case 'SysBO':
      return hasil_survey_sysbo;
    default:
      throw new Error('Invalid label');
  }
};

// Function to get the appropriate pertanyaan model based on the label
const getPertanyaanModelByLabel = (label) => {
  switch (label) {
    case 'PriKer':
      return pertanyaan_perilaku;
    case 'PeBO':
      return pertanyaan_peop;
    case 'LeadBO':
      return pertanyaan_lead;
    case 'SysBO':
      return pertanyaan_sys;
    default:
      throw new Error('Invalid label');
  }
};

// Function to get the number of questions based on the label
const getNumQuestionsByLabel = (label) => {
  switch (label) {
    case 'PriKer':
      return 7;
    case 'PeBO':
      return 21;
    case 'LeadBO':
      return 8;
    case 'SysBO':
      return 11;
    default:
      throw new Error('Invalid label');
  }
};

// mengecek apabila triwulan ada pada table
const checkTriwulanExists = async (Model, tahun, triwulan) => {
  const existingEntry = await Model.findOne({
    where: { tahun: tahun, triwulan: triwulan }
  });

  return !!existingEntry;
};

//menampilkan hasil survey pada diagram kartesius
const getSurveyDataByLabelYearAndQuarter = async (request, h) => {
  const { label, tahun, triwulan } = request.params;

  let Model;
  let PertanyaanModel;
  let pertanyaanAlias;

  switch (label) {
    case 'PriKer':
      Model = hasil_survey_priker;
      PertanyaanModel = pertanyaan_perilaku;
      pertanyaanAlias = 'pertanyaan_perilaku';
      break;
    case 'PeBO':
      Model = hasil_survey_pebo;
      PertanyaanModel = pertanyaan_peop;
      pertanyaanAlias = 'pertanyaan_people';
      break;
    case 'LeadBO':
      Model = hasil_survey_leadbo;
      PertanyaanModel = pertanyaan_lead;
      pertanyaanAlias = 'pertanyaan_leadership';
      break;
    case 'SysBO':
      Model = hasil_survey_sysbo;
      PertanyaanModel = pertanyaan_sys;
      pertanyaanAlias = 'pertanyaan_system';
      break;
    default:
      return h.response({ error: 'Invalid label' }).code(400);
  }

  try {
     
    const triwulanExists = await checkTriwulanExists(Model, tahun, triwulan);

    if (!triwulanExists) {
      return h.response({ error: `Survey dengan triwulan ${triwulan} belum tersedia` }).code(400);
    }

    const surveyData = await Model.findAll({
      where: { tahun: tahun, triwulan: triwulan },
      include: [{
        model: PertanyaanModel,
        required: true,
        attributes: ['label'],
        as: pertanyaanAlias
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
        label: item[pertanyaanAlias].label,
      }))
    };

    return h.response(formattedResponse).code(200);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return h.response({ error: 'Internal server error' }).code(500);
  }
};

module.exports = { isiSurveyHandler, getAverageScoresHandler, getAverageScoresHandler, calculateAverageScores, getSurveyDataByLabelYearAndQuarter };
