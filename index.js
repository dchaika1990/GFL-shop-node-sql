const express = require('express');
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const {PORT} = process.env || 3010;
const app = express();

const routers = require('./routes/index')

app.use('/api', routers)

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
