import React,{useState} from 'react';
import Modal from 'react-modal';
import DateTime from 'react-datetime';

export default function AddEventModal({isOpen, onClose, onEventAdded }){

    const [task, setTask] = useState(' ');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event)=>{
        event.preventDefault();

        onEventAdded({
            task,
            start,
            end,
        })
        onClose();
    }
    console.log(task)
    console.log(end);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form className="form" onSubmit={onSubmit}>
                <label className="label">Título da tarefa</label>   
                <input placeholder="Task" value={task} onChange={e => setTask(e.target.value)}/>

                <div>
                    <label className="label">Data de início</label>
                   <DateTime  value={start} onChange={date => setStart(date)}/>
                </div>

                <div>
                    <label className="label" >Data de término</label>
                   <DateTime value={end} onChange={date => setEnd(date)}/>
                </div>
                
                <button className="btn-form">Adicionar Tarefa</button>
            </form>
        </Modal>
    );
}