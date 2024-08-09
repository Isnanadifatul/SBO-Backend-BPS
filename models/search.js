const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'umkmpalangan.my.id',
    user: 'umkmpal1_aang', // Ganti dengan user database Anda
    password: 'Aang2024_', // Ganti dengan password database Anda
    database: 'umkmpal1_aang'
});


async function search(triwulan, tahun) {
    const [rows] = await connection.execute(
        'SELECT * FROM pemenang_survey_pegawai_teladan WHERE triwulan = ? AND tahun LIKE ? ORDER BY nilai DESC LIMIT 1',
        [triwulan, `%${tahun}%`]
    );
    return rows;
}

module.exports = { search };
