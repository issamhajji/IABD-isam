const express = require("express")
const dbConnection = require('./config/conn.js')
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
//router version
const v1ItemRouter = require("./v1/routes/itemRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1TestRouter = require("./v1/routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/api/v1/items", v1ItemRouter)
app.use("/api/v1/users", v1UserRouter)
app.use("/api/v1/test", v1TestRouter)

dbConnection;

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});
