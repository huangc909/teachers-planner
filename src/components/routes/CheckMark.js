import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CheckMark = (props) => {
  const { schoolYearId, monthId, dayId, task, user } = props
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
    checkmark: !props.task.checkmark
  })

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
          name: props.task.name,
          note: props.task.note,
          dueDate: props.task.dueDate,
          priority: props.task.priority,
          checkmark: !props.task.checkmark
        }
      }
    })
      .catch(console.error)
  }
  return (
    <li key={task._id} style={{ listStyle: 'none', display: 'flex', justifyContent: 'flexStart' }}>
      <input type="button" value={ checked.checkmark ? '✔' : '' } onClick={(event) => {
        handleChange(event)
        handleSubmit(event)
      }} />
      <p>{task.name}</p>
    </li>

  )
}

export default CheckMark
