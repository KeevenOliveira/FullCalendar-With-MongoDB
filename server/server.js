require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/calendarRoute');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, ()=>{
    console.log('Connected to MongoDB');
});

app.use('/api/calendar', routes);

app.listen(5000, () => {
    console.log('Server Started on port 5000🚀')
})