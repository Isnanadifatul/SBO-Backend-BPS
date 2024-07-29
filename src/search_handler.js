const { search } = require('../models/search');

async function searchHandler(request, h) {
    const { triwulan, tahun } = request.query;

    try {
        const data = await search(triwulan, tahun);
        return h.response(data);
    } catch (err) {
        console.error(err);
        return h.response({ error: 'Error retrieving data' }).code(500);
    }
}

module.exports = { searchHandler };