
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static(__dirname));

app.set('port', 3000);

app.use('/public', express.static(__dirname + '/public'));
app.use(require('./app/routes/index_route'));

app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});