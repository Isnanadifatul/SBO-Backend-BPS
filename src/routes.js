
const { path } = require('@hapi/joi/lib/errors');
const { createHandler, readAllindikator_people, updateIndikatorHandler, deleteIndikatorHandler} = require('./handler_indikator_people');
/*
const { createIndikatorPerilakuHandler, readIndikatorPerilakuHandler, updateIndikatorPerilakuHandler, deleteIndikatorPerilakuHandler} = require('./handler_indikator_perilaku');
*/
const {createPegawai, readAllPegawai, updatePegawaiHandler, deletePegawaiHandler} = require('./handler-pegawai');
const {createAuthentication, loginHandler, logoutHandler, updateAuthenticationHandler} = require('./handler-auth');
const { options } = require('joi');

const routes = [
    //Indikator People
    {
        method: 'POST',
        path: '/indikator_people_post',
        handler: createHandler,
    },
    {
        method: 'GET',
        path: '/indikator_people_get',
        handler: readAllindikator_people
    },
    {
        method: 'PUT',
        path: '/indikator_people_update/{id}',
        handler: updateIndikatorHandler
    },
    {
        method: 'DELETE',
        path: '/indikator_people_delete/{id}',
        handler: deleteIndikatorHandler
    },
/*
    //Indikator Perilaku
    {
        method: 'POST',
        path: '/indikator_perilaku_post',
        handler: createIndikatorPerilakuHandler,
    },
    {
        method: 'GET',
        path: '/indikator_perilaku_get',
        handler: readIndikatorPerilakuHandler
    },
    {
        method: 'PUT',
        path: '/indikator_perilaku_update/{id}',
        handler: updateIndikatorPerilakuHandler
    },
    {
        method: 'DELETE',
        path: '/indikator_perilaku_delete/{id}',
        handler: deleteIndikatorPerilakuHandler
    },
    */
    //pegawai
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
    },
   //Authentication
    {
        method: 'POST',
        path: '/login',
        handler: loginHandler,
        options: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/createAuth',
        handler: createAuthentication,
    },
    {
        method: 'PUT',
        path: '/updateAuth/{id}',
        handler: updateAuthenticationHandler,
    },
    {
        method: 'POST',
        path: '/logout',
        handler: logoutHandler,
        options: {
            auth: 'session'
        }
    }
     
];

module.exports = routes;