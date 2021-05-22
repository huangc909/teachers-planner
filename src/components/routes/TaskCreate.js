// import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
//
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
//
// import TaskForm from './../shared/TaskForm'
//
// const TaskCreate = props => {
//   const { user, msgAlert } = props
//
//   const [task, setTask] = useState({
//     name: '',
//     note: '',
//     dueDate: '',
//     priority: false,
//     checkmark: false
//   })
//   const [taskId, setTaskId] = useState(null)
//
//   const handleChange = event => {
//     const updatedField = { [event.target.name]: event.target.value }
//     const editedTask = Object.assign({}, task, updatedField)
//     setTask(editedTask)
//   }
//
//   const handleSubmit = event => {
//     event.preventDefault()
//
//     axios({
//       url: `${apiUrl}/schoolYears/${id}/months/${monthId}/tasks`,
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       },
//       data: { task }
//     })
//       .then(res => setTaskId(res.data.schoolYear.month.tasks[res.data.schoolYear.month.tasks.length - 1]._id))
//       .then(() => msgAlert({
//         heading: 'Successfully created school year',
//         variant: 'success'
//       }))
//       .catch(error => {
//         setTask({
//           name: '',
//           note: '',
//           dueDate: '',
//           priority: false,
//           checkmark: false })
//         msgAlert({
//           heading: 'Failed to create school year. It may already have been created. Please check again. ' + error.message,
//           variant: 'danger'
//         })
//       })
//   }
//
//   if (taskId) {
//     return <Redirect to={'/home-page'} />
//   }
//
//   return (
//     <div>
//       <TaskForm
//         task={task}
//         onPriority={onPriority}
//         onCompletion={onCompletion}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         cancelPath='/home-page'
//       />
//     </div>
//   )
// }
//
// export default TaskCreate
