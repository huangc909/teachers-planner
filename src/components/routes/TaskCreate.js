import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import TaskForm from './../shared/TaskForm'

const TaskCreate = props => {
  const { user, msgAlert } = props
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
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}/tasks`,
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
          yearInfo: { year },
          monthInfo: { monthObject, monthId, monthName },
          dateInfo: { date },
          dayInfo: { day, dayNumber, dayId }
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
