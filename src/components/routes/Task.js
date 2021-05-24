import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Task = props => {
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthId = props.location.aboutProps.monthInfo.monthId
  const date = props.location.aboutProps.dateInfo.date
  const day = props.location.aboutProps.dayInfo.day
  const dayNumber = props.location.aboutProps.dayInfo.dayNumber
  const dayId = props.location.aboutProps.dayInfo.dayId
  const taskId = props.match.params.taskId

  const { msgAlert } = props

  const [task, setTask] = useState(null)
  const [deleted, setDeleted] = useState(false)

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

  const destroy = (event) => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}/tasks/${taskId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Task Deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete' + error.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          schoolYearInfo: { schoolYear, schoolYearId },
          yearInfo: { year },
          monthInfo: { monthObject, monthName, monthId },
          dateInfo: { date },
          dayInfo: { day, dayNumber, dayId }
        }
      }} />
    )
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
            schoolYearInfo: { schoolYear, schoolYearId },
            yearInfo: { year },
            monthInfo: { monthObject, monthName, monthId },
            dateInfo: { date },
            dayInfo: { day, dayNumber, dayId }
          }
        }} >
          <button>Go Back</button>
        </Link>
        <button onClick={destroy}>Delete Task</button>
      </div>
    </div>
  )
}

export default Task
