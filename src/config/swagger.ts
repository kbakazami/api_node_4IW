// Desc: Swagger configuration file

const options = {
    openapi: '3.1.0',
    info: {
        title: 'Express API',
        version: '1.0.0'
    },
    apis: ['./routes/*.ts'],
}

export default options;
