const {hasil_survey_priker, hasil_survey_leadbo, hasil_survey_pebo, hasil_survey_sysbo} = require('../models/hasil_survey_sbo');
const {pertanyaan_perilaku} = require('../models/pertanyaan_perilaku');
const { pertanyaan_peop } = require('../models/pertanyaan_people');
const { pertanyaan_lead } = require('../models/pertanyaan_lead');
const { pertanyaan_sys } = require('../models/pertanyaan_system');
const { konversi } = require('../models/karyawan_teladan');

const calculateGap = (data, alias) => {
    return data.map(item => {
        const gap = parseFloat(item.y) - parseFloat(item.x);
        const konversi = (gap / 4) * 100;
        const indikator = item[alias] ? item[alias].label : 'N/A';
        return {
            indikator,
            x: item.x,
            y: item.y,
            tahun: item.tahun,
            triwulan: item.triwulan,
            gap: gap.toFixed(2),
            konversi: konversi.toFixed(2)
        };
    });
};

const getHasilSurveyPriker = async (request, h) => {
    const { tahun, triwulan } = request.params;

    try {
        const hasilSurvey = await hasil_survey_priker.findAll({
            where: { tahun, triwulan },
            include: [{ model: pertanyaan_perilaku, as: 'pertanyaan_priker' }]
        });
        const result = calculateGap(hasilSurvey, 'pertanyaan_priker');
        return h.response(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        return h.response({ error: 'Failed to fetch data' }).code(500);
    }
};

const getHasilSurveyLeadbo = async (request, h) => {
    const { tahun, triwulan } = request.params;

    try {
        const hasilSurvey = await hasil_survey_leadbo.findAll({
            where: { tahun, triwulan },
            include: [{ model: pertanyaan_lead, as: 'pertanyaan_lead' }]
        });
        const result = calculateGap(hasilSurvey, 'pertanyaan_lead');
        return h.response(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        return h.response({ error: 'Failed to fetch data' }).code(500);
    }
};

const getHasilSurveyPebo = async (request, h) => {
    const { tahun, triwulan } = request.params;

    try {
        const hasilSurvey = await hasil_survey_pebo.findAll({
            where: { tahun, triwulan },
            include: [{ model: pertanyaan_peop, as: 'pertanyaan_peop' }]
        });
        const result = calculateGap(hasilSurvey, 'pertanyaan_peop');
        return h.response(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        return h.response({ error: 'Failed to fetch data' }).code(500);
    }
};

const getHasilSurveySysbo = async (request, h) => {
    const { tahun, triwulan } = request.params;

    try {
        const hasilSurvey = await hasil_survey_sysbo.findAll({
            where: { tahun, triwulan },
            include: [{ model: pertanyaan_sys, as: 'pertanyaan_sys' }]
        });
        const result = calculateGap(hasilSurvey, 'pertanyaan_sys');
        return h.response(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        return h.response({ error: 'Failed to fetch data' }).code(500);
    }
};

module.exports = {getHasilSurveyPriker, getHasilSurveyLeadbo, getHasilSurveyPebo, getHasilSurveySysbo};
