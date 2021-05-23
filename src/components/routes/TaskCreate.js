import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import TaskForm from './../shared/TaskForm'

const TaskCreate = props => {
  const { user, msgAlert } = props
  console.log(props)
  const schoolYearId = props.location.aboutProps.schoolYearId.sortedSchoolYearId
  const monthId = props.location.aboutProps.monthId.todaysMonthId
  const dayId = props.location.aboutProps.dayId.sortedTodaysDayId

  const [task, setTask] = useState({
    name: '',
    note: '',
    dueDate: '',
    priority: false,
    checkmark: false
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

  const onCompletion = () => {
    if (task.onCompletion === false) {
      task.onCompletion = true
    } else {
      task.onCompletion = false
    }
    return task.onCompletion
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
      .then(res => {
        console.log(res)
        return res
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
    return <Redirect to={'/home-page'} />
  }

  return (
    <div>
      <TaskForm
        task={task}
        onPriority={onPriority}
        onCompletion={onCompletion}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/schoolyears/${schoolYearId}`}
      />
    </div>
  )
}

export default TaskCreate
