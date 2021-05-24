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
      <div style={{ height: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', alignItems: 'center' }}>
        <p style={{ marginBottom: '0px', fontSize: '20px' }}>{task.name}</p>
      </div>
    </li>

  )
}

export default CheckMark
