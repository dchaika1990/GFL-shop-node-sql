const express = require('express');
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {PORT} = process.env || 3011;
const {TYPE} = process.env;
const app = express();
const routers = require('./routes/index')
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors())
app.use(urlencodedParser);
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/api', routers)

if (TYPE === 'production') {
	app.use('/', express.static(path.join(__dirname, 'dist', 'front')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'dist', 'front', 'index.html'))
	})
}

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
