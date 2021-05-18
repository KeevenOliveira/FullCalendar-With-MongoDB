import React,{ useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import esLocale from '@fullcalendar/core/locales/pt-br';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api/api';
import moment from 'moment';


export default function Calendar(){

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            task: event.task,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
        })
    }

    async function handleEventAdd(data){
        const task = data.event._def.extendedProps.task;
        const start = data.event._instance.range.start;
        const end = data.event._instance.range.end;

        await api.post('/create-event', {
            task,
            start,
            end,
        });

    }

    async function handleDatesSet(){
        const response = await api.get('/get-events');
        setEvents(response.data.data)
        // console.log(response.data.data)
    }

    function renderEventContent(event) {
        return (
          <>
            <b>{event.timeText}</b>   
            <i>{event.event.extendedProps.task}</i>
          </>
        )
    }
    async function updateEvent(event){
        const id = event.event._def.extendedProps._id;
        const start = event.event._instance.range.start;
        const end = event.event._instance.range.end;

        await api.put(`/update-event/${id}`,{
            start: start,
            end: end,
        });
        console.log(event.event)
        console.log(event.event._def.extendedProps._id);
    }

    async function deleteEvent(event){
        const id = event.event._def.extendedProps._id;
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Você deseja apagar a tarefa com o título: ${event.event.extendedProps.task}?`)){
            api.delete(`/delete-event/${id}`, event.event)
        }
    }

    return(
        <section>
            <div className="container-btn">
                <button className="btn"  onClick={()=> setModalOpen(true)}>Adicionar Tarefa</button>
            </div>
            <div style={{position: 'relative', zIndex: 0}}>
                <FullCalendar
                    events={events}
                    ref={calendarRef}
                    locale={esLocale}
                    selectMirror={true}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    eventContent={renderEventContent}
                    eventAdd={handleEventAdd}
                    datesSet={handleDatesSet}
                    eventDrop={updateEvent}
                    eventClick={deleteEvent}
                    editable={true}
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    );

}