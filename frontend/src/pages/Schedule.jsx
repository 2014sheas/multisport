import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import ScheduleRow from '../components/ScheduleRow'

function Schedule() {
    const { events } = useSelector((state) => state.events);

    let fri = [], sat =[], sun=[];


    events.forEach((event) => {
        switch(event.day) {
            case 'Fri 7/29':
                fri.push(event)
                break;
            case 'Sat 7/30':
                sat.push(event)
                break;
            case 'Sun 7/31':
                sun.push(event)
                break;
            default:
                console.log('error, no day found')
        }
    })

    function createDaySchedule(dayArr) {

        return dayArr.map((event) => {
            return <ScheduleRow key={event.eventID} event={event} />
        })
    }

  return (
    <div>
        <h1>Schedule</h1>
        <h3>Friday</h3>
        <div className="schedTable">
            <div className='multiRows'>
                {createDaySchedule(fri)}
            </div>
        </div>
        <br></br>
        <h3>Saturday</h3>
        <div className="schedTable">
            <div className='multiRows'>
                {createDaySchedule(sat)}
            </div>
        </div>
        <br></br>
        <h3>Sunday</h3>
        <div className="schedTable">
            <div className='multiRows'>
                {createDaySchedule(sun)}
            </div>
        </div>
    </div>
  )
}

export default Schedule