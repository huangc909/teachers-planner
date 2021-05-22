import React from 'react'
import { Link } from 'react-router-dom'

const DailyList = () => {
  const today = new Date()
  const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
  console.log(date)
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{date}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
        </ul>
      </div>
      <Link to={'/task-create'} >
        <button style={{ borderRadius: '25px' }}>+</button>
      </Link>
    </div>
  )
}

export default DailyList
