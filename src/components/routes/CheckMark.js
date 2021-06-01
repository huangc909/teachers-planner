import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CheckMark = (props) => {
  const { currSchoolYear, currSchoolYearId, currYear, currMonthName, currMonth, currMonthId, currDate, currDay, currDateId, currDayNumber, task, user } = props
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

  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}/months/${currMonthId}/days/${currDateId}/tasks/${task._id}/checkmark`,
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
          pathname: `/schoolYears/${currSchoolYearId}/months/${currMonthId}/days/${currDateId}/tasks/${task._id}`,
          aboutProps: {
            schoolYearInfo: { currSchoolYear, currSchoolYearId },
            yearInfo: { currYear },
            monthInfo: { currMonth, currMonthName, currMonthId },
            dateInfo: { currDate, currDateId },
            dayInfo: { currDay, currDayNumber }
          }
        }}>
          <p style={{ fontSize: '17px' }}>{task.name}</p>
        </Link>
      </div>
    </li>

  )
}

export default CheckMark
