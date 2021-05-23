import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const schoolYearId = props.location.aboutProps.currentSchoolYearInfo.schoolYearId
  const todaysYear = props.location.aboutProps.todaysYearInfo.todaysYear
  const todaysMonthObject = props.location.aboutProps.todaysMonthInfo.todaysMonthObject
  const todaysMonthName = props.location.aboutProps.todaysMonthInfo.todaysMonthName
  const todaysMonthId = props.location.aboutProps.todaysMonthInfo.todaysMonthId
  const todaysDate = props.location.aboutProps.todaysDateInfo.todaysDate
  const todaysDay = props.location.aboutProps.todaysDayInfo.todaysDay

  const sortedTodaysMonthDays = todaysMonthObject.days.sort((a, b) => a.day - b.day)

  console.log(sortedTodaysMonthDays)

  const sortedTodaysDayId = sortedTodaysMonthDays[todaysDate - 1]._id
  const [day, setDay] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${todaysMonthId}/days/${sortedTodaysDayId}`,
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
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      schoolYearId={schoolYearId}
      monthId={todaysMonthId}
      dayId={sortedTodaysDayId}
      taskId={task._id}
    />
  ))

  const destroy = (event) => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'School Year Deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete' + error.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={'/home-page'} />
    )
  }

  const next = () => {

  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{todaysDay}</h1>
      <h2>{todaysMonthName} {todaysDate}, {todaysYear}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <button>Previous Day</button>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: '/day',
            aboutProps: {
              schoolYearId: { schoolYearId },
              monthId: { todaysMonthId },
              dayId: { sortedTodaysDayId }
            }
          }}>
            <button onClick={next}>Next Day</button>
          </Link>
        </div>
      </div>
      <Link to={{
        pathname: '/task-create',
        aboutProps: {
          schoolYearId: { schoolYearId },
          monthId: { todaysMonthId },
          dayId: { sortedTodaysDayId }
        }
      }} >
        <button style={{ borderRadius: '25px' }}>+</button>
      </Link>
      <button onClick={destroy}>Delete School Year</button>
    </div>
  )
}

export default CurrentDay
