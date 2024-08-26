const Survey = require('../models/add_pemenang');

const createSurvey = async (request, h) => {
    try {
        const { tahun, triwulan, nama } = request.payload;
        const foto = request.payload.foto._data;  // Mengambil file foto dari payload

        const newSurvey = await Survey.create({
            tahun,
            triwulan,
            nama,
            foto
        });

        return h.response(newSurvey).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

const getSurveys = async (request, h) => {
    try {
        const surveys = await Survey.findAll();
        return h.response(surveys).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

const getSurveyById = async (request, h) => {
    try {
        const survey = await Survey.findByPk(request.params.id);
        if (!survey) {
            return h.response({ message: 'Survey not found' }).code(404);
        }
        return h.response(survey).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

const updateSurvey = async (request, h) => {
    try {
        const { id } = request.params;
        const { tahun, triwulan, nama } = request.payload;
        const foto = request.payload.foto ? request.payload.foto._data : null;

        const survey = await Survey.findByPk(id);
        if (!survey) {
            return h.response({ message: 'Survey not found' }).code(404);
        }

        await survey.update({
            tahun,
            triwulan,
            nama,
            foto: foto || survey.foto  // Jika foto tidak diupdate, tetap pakai yang lama
        });

        return h.response(survey).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

const deleteSurvey = async (request, h) => {
    try {
        const { id } = request.params;
        const survey = await Survey.findByPk(id);
        if (!survey) {
            return h.response({ message: 'Survey not found' }).code(404);
        }

        await survey.destroy();
        return h.response({ message: 'Survey deleted successfully' }).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

module.exports = {
    createSurvey,
    getSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey,
};
