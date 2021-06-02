const express = require('express');

const {PORT} = process.env || 3010;

const app = express();

const routers = require('./routes/index')

app.use('/api', routers)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
