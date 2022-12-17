const express = require('express');
const mongoose = require('mongoose');
const adminTourHandler = require('./routeHandler/adminTourHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb://127.0.0.1:27017/tour')
    .then(console.log('connection Successfully'))
    .catch((err) => {
        console.log(err);
    });
app.use('/admin/tour', adminTourHandler);
app.use('/user/tour', userHandler);
app.listen(3000, () => {
    console.log('listening port is 3000');
});
