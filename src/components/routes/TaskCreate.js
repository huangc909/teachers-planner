import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import TaskForm from './../shared/TaskForm'

const TaskCreate = props => {
  const { user, msgAlert } = props
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const currYear = props.location.aboutProps.yearInfo.currYear
  const leapYear = props.location.aboutProps.yearInfo.leapYear

  const currMonthIndex = props.location.aboutProps.monthInfo.currMonthcurrMonthIndex
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
  const nextMonthName = props.location.aboutProps.monthInfo.nextMonthName
  const nextMonthNumber = props.location.aboutProps.monthInfo.nextMonthNumber
  const nextDateIndex = props.location.aboutProps.dateInfo.nextDateIndex
  const nextDate = props.location.aboutProps.dateInfo.nextDate
  const nextDateId = props.location.aboutProps.dateInfo.nextDateId
  const nextDayName = props.location.aboutProps.dateInfo.nextDayName
  const nextDayNumber = props.location.aboutProps.dateInfo.nextDayNumber

  const [task, setTask] = useState({
    name: '',
    note: '',
    dueDate: '',
    priority: false
  })
  const [taskId, setTaskId] = useState(null)

  const onPriority = () => {
    if (task.priority === false) {
      task.priority = true
    } else {
      task.priority = false
    }
    return task.priority
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedTask = Object.assign({}, task, updatedField)
    setTask(editedTask)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${currMonthId}/days/${currDateId}/tasks`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { task }
    })
      .then(res => setTaskId(res.data.day.tasks[res.data.day.tasks.length - 1]._id))
      .then(() => msgAlert({
        heading: 'Successfully created task',
        variant: 'success'
      }))
      .catch(error => {
        setTask({
          name: '',
          note: '',
          dueDate: '',
          priority: false,
          checkmark: false })
        msgAlert({
          heading: 'Failed to create task. ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (taskId) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          schoolYearInfo: { schoolYear, schoolYearId },
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
      <TaskForm
        task={task}
        onPriority={onPriority}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/schoolyears/${schoolYearId}`}
      />
    </div>
  )
}

export default TaskCreate
