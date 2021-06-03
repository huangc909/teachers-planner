import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Task = props => {
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  // console.log('schoolYearId: ', schoolYearId)
  const startYear = props.location.aboutProps.schoolYearInfo.startYear
  const endYear = props.location.aboutProps.schoolYearInfo.endYear
  const currYear = props.location.aboutProps.yearInfo.currYear
  const leapYear = props.location.aboutProps.yearInfo.leapYear

  const currMonthIndex = props.location.aboutProps.monthInfo.currMonthIndex
  const currMonthId = props.location.aboutProps.monthInfo.currMonthId
  const currMonth = props.location.aboutProps.monthInfo.currMonth
  const currMonthName = props.location.aboutProps.monthInfo.currMonthName
  const currMonthNumber = props.location.aboutProps.monthInfo.currMonthNumber
  const currDateIndex = props.location.aboutProps.dateInfo.currDateIndex
  const currDate = props.location.aboutProps.dateInfo.currDate
  const currDateId = props.location.aboutProps.dateInfo.currDateId
  const currDayName = props.location.aboutProps.dayInfo.currDayName
  const currDayNumber = props.location.aboutProps.dayInfo.currDayNumber

  const prevMonthIndex = props.location.aboutProps.monthInfo.prevMonthIndex
  const prevMonthId = props.location.aboutProps.monthInfo.prevMonthId
  const prevMonth = props.location.aboutProps.monthInfo.prevMonth
  const prevMonthName = props.location.aboutProps.monthInfo.prevMonthName
  const prevMonthNumber = props.location.aboutProps.monthInfo.prevMonthNumber
  const prevDateIndex = props.location.aboutProps.dateInfo.prevDateIndex
  const prevDate = props.location.aboutProps.dateInfo.prevDate
  const prevDateId = props.location.aboutProps.dateInfo.prevDateId
  const prevDayName = props.location.aboutProps.dayInfo.prevDayName
  const prevDayNumber = props.location.aboutProps.dayInfo.prevDayNumber

  const nextMonthIndex = props.location.aboutProps.monthInfo.nextMonthIndex
  const nextMonthId = props.location.aboutProps.monthInfo.nextMonthId
  const nextMonth = props.location.aboutProps.monthInfo.nextMonth
  // console.log('nextMonth: ', nextMonth)
  const nextMonthName = props.location.aboutProps.monthInfo.nextMonthName
  const nextMonthNumber = props.location.aboutProps.monthInfo.nextMonthNumber
  const nextDateIndex = props.location.aboutProps.dateInfo.nextDateIndex
  const nextDate = props.location.aboutProps.dateInfo.nextDate
  const nextDateId = props.location.aboutProps.dateInfo.nextDateId
  const nextDayName = props.location.aboutProps.dateInfo.nextDayName
  const nextDayNumber = props.location.aboutProps.dateInfo.nextDayNumber

  const monthId = props.match.params.monthId
  const dayId = props.match.params.dayId
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
          schoolYearInfo: { schoolYear, schoolYearId, startYear, endYear },
          yearInfo: { currYear, leapYear },
          monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
          dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
          dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
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
            schoolYearInfo: { schoolYear, schoolYearId, startYear, endYear },
            yearInfo: { currYear, leapYear },
            monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
            dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
            dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
          }
        }} >
          <button style={{ marginRight: '10px' }}>Go Back</button>
        </Link>
        <button onClick={destroy}>Delete Task</button>
      </div>
    </div>
  )
}

export default Task
