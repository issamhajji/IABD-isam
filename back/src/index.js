const express = require("express")
const cors = require('cors')
const dbConnection = require('./config/conn.js')
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
//router version
const v1ItemRouter = require("./v1/routes/itemRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1AzureRouter = require("./v1/routes/azureRoutes");
const v1OpenaiRouter = require("./v1/routes/openAiRoutes");
const v1TestRouter = require("./v1/routes/testRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
// CORS
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/api/v1/items", v1ItemRouter)
app.use("/api/v1/users", v1UserRouter)
app.use("/api/v1/openai", v1OpenaiRouter)
app.use("/api/v1/azure", v1AzureRouter)
app.use("/api/v1/test", v1TestRouter)

dbConnection;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});
