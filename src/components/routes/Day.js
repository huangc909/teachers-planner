import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Day = (props) => {
  const { msgAlert } = props
  // const sortedSchoolYear = props.location.aboutProps.sortedSchoolYear.sortedSchoolYear
  // console.log(sortedSchoolYear)
  const sortedSchoolYearId = props.location.aboutProps.sortedSchoolYear.schoolYearId
  const todaysMonthInfo = props.location.aboutProps.todaysMonth.todaysMonth
  // console.log(todaysMonthInfo)
  const todaysMonthId = props.location.aboutProps.todaysMonth.todaysMonthId
  const today = new Date()
  const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
  // console.log(date)
  const todaysNum = today.getDate()
  // console.log(todaysNum)
  const sortedTodaysMonthDays = todaysMonthInfo.days.sort((a, b) => a.day - b.day)

  // console.log(sortedTodaysMonthDays)
  // const sortedTodaysDayInfo = sortedTodaysMonthDays[todaysNum - 1]
  // console.log(sortedTodaysDayInfo)
  const sortedTodaysDayId = sortedTodaysMonthDays[todaysNum - 1]._id
  const [day, setDay] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${sortedSchoolYearId}/months/${todaysMonthId}/days/${sortedTodaysDayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing selected school year',
        variant: 'primary'
      }))
      .catch(error => {
        // setDay({ day: '' })
        msgAlert({
          heading: 'Failed to show day' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!day) {
    return <p>Loading...</p>
  }
  console.log(day)
  const dailyTasks = day.tasks.map(task => (
    <li key={task._id}>
      <p>{task.name}</p>
    </li>
  ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{date}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {dailyTasks}
      </div>
      <Link to={'/task-create'} >
        <button style={{ borderRadius: '25px' }}>+</button>
      </Link>
    </div>
  )
}

export default Day
