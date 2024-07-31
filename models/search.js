const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', // Ganti dengan user database Anda
    password: '', // Ganti dengan password database Anda
    database: 'sbo'
});


async function search(triwulan, tahun) {
    const [rows] = await connection.execute(
        'SELECT * FROM pemenang_survey_pegawai_teladan WHERE triwulan = ? AND tahun LIKE ? ORDER BY nilai DESC LIMIT 1',
        [triwulan, `%${tahun}%`]
    );
    return rows;
}

module.exports = { search };