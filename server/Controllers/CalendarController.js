const Event = require('../Models/Event');

const createTask = async(request, response)=> {
    const event = request.body;
    if(!event){
        return response.status(400).json({
            success: false,
            error: 'You must a task'
        });
    }
        const task = request.body.task;
        const start = request.body.start;
        const end = request.body.end;
        try {
            const taskAdd = new Event({task: task, start: start, end: end })
            if(!taskAdd){
                return response.status(400).json({
                    success: false,
                    error: err
                });
            }
            await taskAdd.save().then(()=>{
                return response.status(201).json({
                    success: true,
                    id: task._id,
                    message: 'Task Created!',
                });
            })
        } catch (error) {
            return response.status(400).json({
                err,
                message: 'Task not created',
            }) 
        }

    response.sendStatus(201);
}

const getTasks = async (request, response) => {
    try {
        const events = await Event.find({}, (err, calendars)=>{
            if(err){
                return response.status(400).json({ 
                    success: false,
                    error: err,
                });
            }
            if(!calendars.length){
                return response.status(404).json({
                    success: false, 
                    error: 'Calendars not found'
                });
            };
        })

        response.status(200).json({
            success: true,
            data: events,
        })
    } catch (error) {
        response.send(error);
    }
}

const updateEvent = async (request, response) => {
    const body = request.body;
    try {
        if(!body){
            return response.status(400).json({
                err,
                message: 'Task not found',
            })
        }
        const start = request.body.start;
        const end = request.body.end;
        await Event.findOne({_id: request.params.id}, (err, taskUpdate) => {
            if(err){
                return response.status(404).json({
                    err,
                    messange: 'Task not found!',
                })
            }

            const id = request.params.id;
            console.log(taskUpdate);
            console.log(taskUpdate.start);
            taskUpdate.start = start;
            taskUpdate.end = end;
            taskUpdate.save().then(()=>{
                return response.status(200).json({
                    success: true,
                    id: id,
                    message: 'Task Updated'
                })
            })
        })
    } catch (error) {
        response.status(404).json({
            error, message: 'Update error',
        })
    }
}
const deleteEvent = async (request, response)=>{
    try {
        await Event.findOneAndDelete({ _id:request.params.id}, (err, task) => {
            if(err){
                return response.status(400).json({ 
                    success: false, 
                    error: err,
                })
            }
            if(!task){
                return response.status(404).json({
                    success: false,
                    error: 'Task not found!',
                });
            }
            return response.status(200).json({
                success: true,
                data: task,
            })
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports =  {getTasks, updateEvent, createTask, deleteEvent};
