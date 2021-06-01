import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import TaskForm from './../shared/TaskForm'

const TaskCreate = props => {
  const { user, msgAlert } = props
  const currSchoolYear = props.location.aboutProps.schoolYearInfo.currSchoolYear
  const currSchoolYearId = props.location.aboutProps.schoolYearInfo.currSchoolYearId
  const currYear = props.location.aboutProps.yearInfo.currYear
  const currMonth = props.location.aboutProps.monthInfo.currMonth
  const currMonthName = props.location.aboutProps.monthInfo.currMonthName
  const currMonthId = props.location.aboutProps.monthInfo.currMonthId
  const currDate = props.location.aboutProps.dateInfo.currDate
  const currDay = props.location.aboutProps.dayInfo.currDay
  const currDayNumber = props.location.aboutProps.dayInfo.currDayNumber
  const currDateId = props.location.aboutProps.dateInfo.currDateId

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
      url: `${apiUrl}/schoolYears/${currSchoolYearId}/months/${currMonthId}/days/${currDateId}/tasks`,
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
          schoolYearInfo: { currSchoolYear, currSchoolYearId },
          yearInfo: { currYear },
          monthInfo: { currMonth, currMonthName, currMonthId },
          dateInfo: { currDate, currDateId },
          dayInfo: { currDay, currDayNumber }
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
        cancelPath={`/schoolyears/${currSchoolYearId}`}
      />
    </div>
  )
}

export default TaskCreate
