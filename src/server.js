
const Hapi   = require('@hapi/hapi');
const routes = require('./routes'); 

const init = async () => {
    const server = Hapi.server({
        port: 1453,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server running on port ${server.info.uri}`);
};

init();
