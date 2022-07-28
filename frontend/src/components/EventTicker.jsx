import React from 'react'

function EventTicker({event}) {
  return (
    <div className="goal">
        <h2>{event.name}</h2>
    </div>
  )
}

export default EventTicker