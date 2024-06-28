const { path } = require('@hapi/joi/lib/errors');
const { createHandler, readAllindikator_people, updateIndikatorHandler, deleteIndikatorHandler} = require('./handler_indikator_people');
const { createIndikatorPerilakuHandler, readIndikatorPerilakuHandler, updateIndikatorPerilakuHandler, deleteIndikatorPerilakuHandler} = require('./handler_indikator_perilaku');

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
    }
];

module.exports = routes;