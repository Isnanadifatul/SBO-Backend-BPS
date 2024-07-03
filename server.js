const routes = require('./src/routes');
const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const Boom = require('@hapi/boom');
const Cookie = require('@hapi/cookie');
const path = require('path');
const connection = require('./db-config/connect');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 5000,
        routes: {
            cors: {
                origin: ['*'],
            }
        },
    });

    await server.register(Cookie);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'userSession',
        password: 'a_very_secure_password_that_should_be_kept_secret', // Ganti dengan kunci rahasia yang kuat
        isSecure: false, // Set to true in production
        isHttpOnly: true, // Menjaga cookie agar hanya dapat diakses oleh server
        isSameSite: 'Lax', // Meningkatkan keamanan cookie
        ttl: 24 * 60 * 60 * 1000 // 1 hari dalam milidetik
      },
      redirectTo: false
    });
  
    server.auth.default('session');
  

    await server.register([{
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