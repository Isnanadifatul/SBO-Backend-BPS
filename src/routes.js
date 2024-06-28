const {createPegawai, readAllPegawai, updatePegawaiHandler, deletePegawaiHandler} = require('./handler-pegawai');


const routes = [
    {
        method: 'POST',
        path: '/createPegawai',
        handler: createPegawai,
    },
    {
        method: 'GET',
        path: '/readPegawai',
        handler: readAllPegawai,
    },
    {
        method: 'PUT',
        path: '/updatePegawai/{id}',
        handler: updatePegawaiHandler,
    },
    {
        method: 'DELETE',
        path: '/deletePegawai/{id}',
        handler: deletePegawaiHandler,
    }
     
    ];
    module.exports = routes;