const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Backend APIs',
        version: '1.0.0',
        description: 'APIs per a gestionar usuaris, items i la comunicacio entre el client i el model'
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)

 
