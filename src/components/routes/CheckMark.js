import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CheckMark = (props) => {
  const { year, schoolYearId, monthName, monthObject, monthId, date, day, dayId, dayNumber, task, user } = props
  const [checked, setChecked] = useState({
    name: props.task.name,
    note: props.task.note,
    dueDate: props.task.dueDate,
    priority: props.task.priority,
    checkmark: props.task.checkmark
  })

  const handleChange = (event) => setChecked({
    name: props.task.name,
    note: props.task.note,
    dueDate: props.task.dueDate,
    priority: props.task.priority,
    checkmark: !checked.checkmark
  })
  console.log(checked)
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}/tasks/${task._id}/checkmark`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: {
        task: {
          checkmark: !checked.checkmark,
          name: props.task.name,
          note: props.task.note,
          dueDate: props.task.dueDate,
          priority: props.task.priority
        }
      }
    })
      .catch(console.error)
  }

  return (
    <li key={task._id} style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', alignItems: 'center' }}>
      <input className="checkbox" type="button" value={ checked.checkmark ? '✔' : '' } style={{ fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={(event) => {
        handleChange(event)
        handleSubmit(event)
      }} />
      <div style={{ height: '20px', width: '5px', marginRight: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', alignItems: 'center', flexWrap: 'wrap' }}>
        <p style={{ fontColor: 'red', fontSize: '17px' }}>{task.priority ? '!' : ' '}</p>
      </div>
      <div style={{ height: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to={{
          pathname: `/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}/tasks/${task._id}`,
          aboutProps: {
            schoolYearInfo: { schoolYearId, year },
            monthInfo: { monthName, monthId, monthObject },
            dayInfo: { dayId, date, day, dayNumber }
          }
        }}>
          <p style={{ fontSize: '17px' }}>{task.name}</p>
        </Link>
      </div>
    </li>

  )
}

export default CheckMark
