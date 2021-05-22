// import React from 'react'
//
// const Tasks = (props) => {
//   const [checked, setChecked] = useState({
//     name: props.task.name,
//     note: props.task.note,
//     dueDate: props.task.dueDate,
//     priority: props.task.priority,
//     checkmark: props.task.checkmark
//   })
//
//   const handleChange = (event) => setChecked({
//     name: props.task.name,
//     note: props.task.note,
//     dueDate: props.task.dueDate,
//     priority: props.task.priority,
//     checkmark: !props.task.checkmark
//   })
//
//   const handleSubmit = (event) => {
//     event.preventDefault()
//
//     axios({
//       url: `${apiUrl}/schoolYears/${}/months/${}/days/${}/tasks/${}`,
//       method: 'PATCH',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       },
//       data: {
//         task: {
//           name: props.task.name,
//           note: props.task.note,
//           dueDate: props.task.dueDate,
//           priority: props.task.priority,
//           checkmark: !props.task.checkmark
//         }
//       }
//     })
//       .then(res => setSchoolYearId(res.data.schoolYear._id))
//       .then(() => msgAlert({
//         heading: 'Successfully created school year',
//         variant: 'success'
//       }))
//       .catch(error => {
//         setSchoolYear({ startYear: '', endYear: '' })
//         msgAlert({
//           heading: 'Failed to create school year. It may already have been created. Please check again. ' + error.message,
//           variant: 'danger'
//         })
//       })
//   }
//
//   return (
//     <div>
//       <li key={props.task._id}>
//         <div>
//           <input
//             type="button"
//             value={checked.checkmark ?  '✔' : '' }
//             onClick={(event) => {
//               handleChange(event)
//               handleSubmit(event)
//             }} />
//         </div>
//         <div>
//           <Link to={`schoolYear/${}/months/${}/days/${}/tasks/${}`}>{props.task.name}</div>
//         </div>
//       </li>
//     </div>
//   )
// }
//
// export default Tasks
