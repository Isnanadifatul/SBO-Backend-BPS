const { hasil_survey_priker } = require('../models/hasil_survey_sbo');

const calculateGap = (data) => {
    return data.map(item => {
        const gap = parseFloat(item.y) - parseFloat(item.x);
        const gapPercentage = (gap / 4) * 100;
        return {
            ...item.dataValues,
            gap: gap.toFixed(2),
            gapPercentage: gapPercentage.toFixed(2)
        };
    });
};

const getHasilSurveyPriKer = async (request, h) => {
    try {
        const hasilSurvey = await hasil_survey_priker.findAll();
        const result = calculateGap(hasilSurvey);
        return h.response(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        return h.response({ error: 'Failed to fetch data' }).code(500);
    }
};

module.exports = { getHasilSurveyPriKer };
