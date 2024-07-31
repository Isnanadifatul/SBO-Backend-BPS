const { path } = require('@hapi/joi/lib/errors');
const { options } = require('joi');
const { createHandler, readAllindikator_people, updateIndikatorHandler, deleteIndikatorHandler, getUserById} = require('./handler_indikator_people');
const { getUserByIdPerilaku ,createIndikatorPerilakuHandler, readAllIndikatorPerilaku, updateIndikatorPerilakuHandler, deleteIndikatorPerilakuHandler} = require('./handler_indikator_perilaku');
const { createIndikatorLeadHandler, readAllIndikatorLead, updateIndikatorLeadHandler, deleteIndikatorLeadHandler, getUserByIdLead} = require('./handler_indikator_lead');
const { getUserByIdSystem, createIndikatorSystemHandler, readAllIndikatorSystem, updateIndikatorSystemHandler, deleteIndikatorSystemHandler} = require('./handler_indikator_system');
const { getUserByIdKonsepDh, createDhHandler, readAllDh, updateDhHandler, deleteDhHandler} = require('./handler_dasar_hukum');
const { getUserByIdMi, createMiHandler, readAllMiHandler, updateMiHandler, deleteMiHandler} = require('./handler_model_implementasi');
const { getUserByIdNi, createNiHandler, readAllNiHandler, updateNiHandler, deleteNiHandler} = require('./handler_nilai_inti');
const { getUserByIdPertanyaanLead, createPertanyaanLeadHandler, readAllPertanyaanLead, updatePertanyaanLeadHandler, deletePertanyaanLeadHandler} = require('./handler_pertanyaan_lead');
const { getUserByIdPertanyaanSys, createPertanyaanSysHandler, readAllPertanyaanSys, updatePertanyaanSysHandler, deletePertanyaanSysHandler} = require('./handler_pertanyaan_system');
const { getUserByIdPertanyaanPeople, createPertanyaanPeopleHandler, readAllPertanyaanPeople, updatePertanyaanPeopleHandler, deletePertanyaanPeopleHandler} = require('./handler_pertanyaan_people');
const { getUserByIdPertanyaanPerilaku, createPertanyaanPerilakuHandler, readAllPertanyaanPerilaku, updatePertanyaanPerilakuHandler, deletePertanyaanPerilakuHandler} = require('./handler_pertanyaan_perilaku');
// const { path } = require('@hapi/joi/lib/errors');
//CRUD Pegawai
const {createPegawai, readAllPegawai, getPegawaiByIdhandler, updatePegawaiHandler, deletePegawaiHandler} = require('./handler-pegawai');
//Login
const {createAuthentication, loginHandler, logoutHandler, updateAuthenticationHandler} = require('./handler-auth');
//isi survey SBO
const {isiSurveyHandler, getAverageScoresHandler, getSurveyDataByLabelYearAndQuarter} = require('./handler_survey_sbo');
//isi survey pegawai teladan
const { insertSurveyHandler, totalSurveyHandler, getSurveyKandidat1, getSurveyKandidat2, getSurveyKandidat3,
        AVGConvert30} = require('./handler_karyawan_teladan');
const { getNilaiById, insertNilaiTambah, readNilai, updateNilai, deleteNilai} = require('./nilai_tambah_handler');
const {getCombinedScores} = require('./handler_result');
const kandidat_handler= require('./kandidat_handler');
//gap analisis sbo
const {getHasilSurveyPriker, getHasilSurveyLeadbo, getHasilSurveyPebo, getHasilSurveySysbo} = require('./handler_gap_analisis')
const routes = [
    //Memilih kandidat
    {
        method: 'POST',
        path: '/kandidat',
        options: {
            payload: {
                maxBytes: 1048576,
                output: 'data',
                parse: true,
                allow: 'multipart/form-data'
            }
        },
        handler: kandidat_handler.createKandidat
    },
    {
        method: 'GET',
        path: '/kandidat/{id}',
        handler: kandidat_handler.getKandidat
    },
    {
        method: 'PUT',
        path: '/kandidat/{id}',
        options: {
            payload: {
                maxBytes: 1048576,
                output: 'data',
                parse: true,
                allow: 'multipart/form-data'
            }
        },
        handler: kandidat_handler.updateKandidatHandler
    },
    {
        method: 'DELETE',
        path: '/kandidat/{id}',
        handler: kandidat_handler.deleteKandidatHandler
    },
     //result
    {
        method: 'GET',
        path: '/result',
        handler: getCombinedScores,
        options: {
            auth: false
        }
    },
     //Nilai tambah
    {
        method: 'POST',
        path: '/nilai_tambah_insert',
        handler: insertNilaiTambah,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/nilai_tambah_get',
        handler: readNilai,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/nilai_tambah_getby/{id}',
        handler: getNilaiById,
         options: {
            auth: false
        }
     },
    {
        method: 'PUT',
        path: '/nilai_tambah_update/{id}',
        handler: updateNilai,
        options: {
            auth: false
        }
    },
    {
        method: 'DELETE',
        path: '/nilai_tambah_delete/{id}',
        handler: deleteNilai,
        options: {
            auth: false
        }
    },
    //Survey Karyawan Teladan
    {
        method: 'POST',
        path: '/survey_karyawan_teladan',
        handler:  insertSurveyHandler ,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/AVG30',
        handler:  AVGConvert30 ,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/total_survey_kandidat',
        handler: totalSurveyHandler,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/survey_kandidat1',
        handler: getSurveyKandidat1,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/survey_kandidat2',
        handler: getSurveyKandidat2,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/survey_kandidat3',
        handler: getSurveyKandidat3,
        options: {
            auth: false
        }
    },
    //Pertanyaan People
    {
        method: 'POST',
        path: '/pertanyaan_people_post',
        handler: createPertanyaanPeopleHandler,
    },
    {
        method: 'GET',
        path: '/pertanyaan_people_search/{id}',
        handler: getUserByIdPertanyaanPeople
    },
    {
        method: 'GET',
        path: '/pertanyaan_people_get',
        handler: readAllPertanyaanPeople,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/pertanyaan_people_update/{id}',
        handler: updatePertanyaanPeopleHandler
    },
    {
        method: 'DELETE',
        path: '/pertanyaan_people_delete/{id}',
        handler: deletePertanyaanPeopleHandler
    },
    //Pertanyaan Perilaku
    {
        method: 'POST',
        path: '/pertanyaan_perilaku_post',
        handler: createPertanyaanPerilakuHandler,
    },
    {
        method: 'GET',
        path: '/pertanyaan_perilaku_search/{id}',
        handler: getUserByIdPertanyaanPerilaku
    },
    {
        method: 'GET',
        path: '/pertanyaan_perilaku_get',
        handler: readAllPertanyaanPerilaku,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/pertanyaan_perilaku_update/{id}',
        handler: updatePertanyaanPerilakuHandler
    },
    {
        method: 'DELETE',
        path: '/pertanyaan_perilaku_delete/{id}',
        handler: deletePertanyaanPerilakuHandler
    },
    //Pertanyaan System
    {
        method: 'POST',
        path: '/pertanyaan_system_post',
        handler: createPertanyaanSysHandler,
    },
    {
        method: 'GET',
        path: '/pertanyaan_system_search/{id}',
        handler: getUserByIdPertanyaanSys
    },
    {
        method: 'GET',
        path: '/pertanyaan_system_get',
        handler: readAllPertanyaanSys,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/pertanyaan_system_update/{id}',
        handler: updatePertanyaanSysHandler
    },
    {
        method: 'DELETE',
        path: '/pertanyaan_system_delete/{id}',
        handler: deletePertanyaanSysHandler
    },
    //Pertanyaan Leadership
    {
        method: 'POST',
        path: '/pertanyaan_leadership_post',
        handler: createPertanyaanLeadHandler,
    },
    {
        method: 'GET',
        path: '/pertanyaan_leadership_search/{id}',
        handler: getUserByIdPertanyaanLead
    },
    {
        method: 'GET',
        path: '/pertanyaan_leadership_get',
        handler: readAllPertanyaanLead,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/pertanyaan_leadership_update/{id}',
        handler: updatePertanyaanLeadHandler
    },
    {
        method: 'DELETE',
        path: '/pertanyaan_leadership_delete/{id}',
        handler: deletePertanyaanLeadHandler
    },
    //Nilai Inti BPS
    {
        method: 'POST',
        path: '/nilai_inti_bps_post',
        handler: createNiHandler,
    },
    {
        method: 'GET',
        path: '/nilai_inti_bps_search/{id}',
        handler: getUserByIdNi
    },
    {
        method: 'GET',
        path: '/nilai_inti_bps_get',
        handler: readAllNiHandler,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/nilai_inti_bps_update/{id}',
        handler: updateNiHandler
    },
    {
        method: 'DELETE',
        path: '/nilai_inti_bps_delete/{id}',
        handler: deleteNiHandler
    },
    //Konsep Dasar Hukum
    {
        method: 'POST',
        path: '/model_implementasi_post',
        handler: createMiHandler,
    },
    {
        method: 'GET',
        path: '/model_implementasi_search/{id}',
        handler: getUserByIdMi
    },
    {
        method: 'GET',
        path: '/model_implementasi_get',
        handler: readAllMiHandler,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/model_implementasi_update/{id}',
        handler: updateMiHandler
    },
    {
        method: 'DELETE',
        path: '/model_implementasi_delete/{id}',
        handler: deleteMiHandler
    },

    //Indikator People
    {
        method: 'POST',
        path: '/indikator_people_post',
        handler: createHandler
    },
    {
        method: 'GET',
        path: '/indikator_people_search/{id}',
        handler: getUserById
    },
    {
        method: 'GET',
        path: '/indikator_people_get',
        handler: readAllindikator_people,
        options: {
            auth: false
        }
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
        path: '/indikator_perilaku_search/{id}',
        handler: getUserByIdPerilaku
    },
    {
        method: 'GET',
        path: '/indikator_perilaku_get',
        handler: readAllIndikatorPerilaku,
        options: {
            auth: false
        }
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

    //Indikator Leadership
    {
        method: 'POST',
        path: '/indikator_leadership_post',
        handler: createIndikatorLeadHandler,
    },
    {
        method: 'GET',
        path: '/indikator_leadership_search/{id}',
        handler: getUserByIdLead
    },
    {
        method: 'GET',
        path: '/indikator_leadership_get',
        handler: readAllIndikatorLead,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/indikator_leadership_update/{id}',
        handler: updateIndikatorLeadHandler
    },
    {
        method: 'DELETE',
        path: '/indikator_leadership_delete/{id}',
        handler: deleteIndikatorLeadHandler
    },

    //Indikator System
    {
        method: 'POST',
        path: '/indikator_system_post',
        handler: createIndikatorSystemHandler,
    },
    {
        method: 'GET',
        path: '/indikator_system_search/{id}',
        handler: getUserByIdSystem
    },
    {
        method: 'GET',
        path: '/indikator_system_get',
        handler: readAllIndikatorSystem,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/indikator_system_update/{id}',
        handler: updateIndikatorSystemHandler
    },
    {
        method: 'DELETE',
        path: '/indikator_system_delete/{id}',
        handler: deleteIndikatorSystemHandler
    },

    //Konsep Dasar Hukum
    {
        method: 'POST',
        path: '/dasar_hukum_post',
        handler: createDhHandler,
    },
    {
        method: 'GET',
        path: '/dasar_hukum_search/{id}',
        handler: getUserByIdKonsepDh
    },
    {
        method: 'GET',
        path: '/dasar_hukum_get',
        handler: readAllDh,
        options: {
            auth: false
        }
    },
    {
        method: 'PUT',
        path: '/dasar_hukum_update/{id}',
        handler: updateDhHandler
    },
    {
        method: 'DELETE',
        path: '/dasar_hukum_delete/{id}',
        handler: deleteDhHandler
    },
     //pegawai
     {
        method: 'POST',
        path: '/createPegawai',
        handler: createPegawai,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/readPegawai',
        handler: readAllPegawai,
        options: {
            auth: false
        }
    },
    {
        method:'GET',
        path: '/readPegawaiByID/{id}',
        handler: getPegawaiByIdhandler,
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
        options: {
            auth: false
        }
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
    },
    {
        method: 'GET',
        path: '/protected',
        options: {
          auth: 'jwt', // Require JWT authentication
          handler: (request, h) => {
            return h.response({ message: 'You have accessed a protected route' });
          }
        }
    },
    //Isi survey SBO
    {
        method: 'POST',
        path: '/isiSurvey',
        handler: isiSurveyHandler,
        options: {
            auth: false
        }
    },
    //menghitung rata-rata
    {
        method: 'GET',
        path: '/average-scores/{label}/{triwulan}/{tahun}',
        handler: getAverageScoresHandler,
        options: {
            auth: false
        }
    },
    //menampilkan pada kartesius
    {
        method: 'GET',
        path: '/kartesius/{label}/{tahun}/{triwulan}',
        handler: getSurveyDataByLabelYearAndQuarter,
        options: {
            auth: false
        }
    },
    //menampilkan gap analisis pada tabel
    {
        method: 'GET',
        path: '/gap-survey-priker/{tahun}/{triwulan}',
        handler: getHasilSurveyPriker,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/gap-survey-leadbo/{tahun}/{triwulan}',
        handler: getHasilSurveyLeadbo,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/gap-survey-pebo/{tahun}/{triwulan}',
        handler: getHasilSurveyPebo,
        options: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/gap-survey-sysbo/{tahun}/{triwulan}',
        handler: getHasilSurveySysbo,
        options: {
            auth: false
        }
    }
];


module.exports = routes;
