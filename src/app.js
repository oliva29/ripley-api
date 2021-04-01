const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const pdf = require('express-pdf')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const {isAuth} = require('./middlewares/isAuth')
 
require('./database');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pdf)
app.use(expressLayout)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))

/* Routes */
// app.use('/auth', require('./routes/auth'));
// app.use('/sponsors', isAuth, require('./routes/sponsors'));
// app.use('/type_sponsors', isAuth, require('./routes/typeSponsors'));
// app.use('/upload', isAuth, require('./routes/upload'));
app.use('/client' , require('./routes/client'));
// app.use('/cotizaciones',   require('./routes/cotizaciones'))
// app.use('/servicios_cotizacion',isAuth, require('./routes/serviciosCotizacion'))
// app.use('/meeting',isAuth, require('./routes/meeting'))

module.exports = app;
