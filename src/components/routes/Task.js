import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Task = props => {
  const schoolYearId = props.match.params.schoolYearId
  const monthId = props.match.params.monthId
  const dayId = props.match.params.dayId
  const taskId = props.match.params.taskId

  const year = props.location.aboutProps.schoolYearInfo.year
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const date = props.location.aboutProps.dayInfo.date
  const day = props.location.aboutProps.dayInfo.day
  const dayNumber = props.location.aboutProps.dayInfo.dayNumber

  const { msgAlert } = props

  const [task, setTask] = useState(null)
  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}/tasks/${taskId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setTask(res.data.task))
      .then(() => msgAlert({
        heading: 'Showing selected task details',
        variant: 'primary'
      }))
      .catch(error => {
        setTask({ startYear: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!task) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div>
        <h1>{task.name}</h1>
        <p>Notes: {task.note}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Priority Item: {task.priority ? '✔' : ''}</p>
        <p>Completed: {task.checkmark ? '✔' : ''}</p>
      </div>
      <div>
        <Link to={{
          pathname: '/current-day',
          aboutProps: {
            currentSchoolYearInfo: { schoolYearId },
            yearInfo: { year },
            monthInfo: { monthObject, monthId, monthName },
            dateInfo: { date },
            dayInfo: { day, dayNumber }
          }
        }} >
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  )
}

export default Task
