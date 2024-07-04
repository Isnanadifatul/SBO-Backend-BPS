const routes = require('./src/routes');
const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const Boom = require('@hapi/boom');
const path = require('path');
const connection = require('./db-config/connect');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const { validate } = require('./src/validate');
require('dotenv').config();


const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 5000,
        routes: {
            cors: {
                origin: ['http://127.0.0.1:5500/'],
                credentials: true
            }
        },
    });

    await server.register([
        HapiAuthJwt2,
        {
        plugin: require("hapi-geo-locate"),
        options: {
            enabledByDefault: true
        }
    },
    {
        plugin: inert
    },
    {
        plugin: require('@hapi/vision')
    },
]);

server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET, // Secret key for signing JWT
    validate, // validate function defined above
    verifyOptions: { algorithms: ['HS256'] } // opsi verifikasi
});

server.auth.default('jwt');


// Konfigurasi rendering view dengan handlebars (contoh)
server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'views', // Pastikan ini sesuai dengan struktur folder proyek Anda
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Tambahkan ini
        allowProtoMethodsByDefault: true     // Tambahkan ini
    }
  });

    server.route(routes);

    await server.start();
    console.log(`S
    erver started on: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();