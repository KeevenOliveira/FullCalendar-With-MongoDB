const express = require('express');
const router = express.Router();

const {updateEvent, getTasks, createTask, deleteEvent} = require('../Controllers/CalendarController');

router.get('/get-events', getTasks);

router.post('/create-event', express.urlencoded({extended: true}), createTask);

router.put('/update-event/:id', express.urlencoded({extended: true}), updateEvent);

router.delete('/delete-event/:id', deleteEvent);

module.exports = router;