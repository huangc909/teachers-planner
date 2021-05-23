import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const schoolYearId = props.location.aboutProps.currentSchoolYearInfo.schoolYearId
  const year = props.location.aboutProps.todaysYearInfo.todaysYear
  const monthObject = props.location.aboutProps.todaysMonthInfo.todaysMonthObject
  const monthName = props.location.aboutProps.todaysMonthInfo.todaysMonthName
  const monthId = props.location.aboutProps.todaysMonthInfo.todaysMonthId
  const date = props.location.aboutProps.todaysDateInfo.todaysDate
  const day = props.location.aboutProps.todaysDayInfo.todaysDay

  const sortedMonthObject = monthObject.days.sort((a, b) => a.day - b.day)

  const dayId = sortedMonthObject[date - 1]._id
  const [currentDay, setCurrentDay] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCurrentDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing today&apos;s list',
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

  if (!currentDay) {
    return <p>Loading...</p>
  }
  console.log(currentDay)
  const dailyTasks = currentDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      schoolYearId={schoolYearId}
      monthId={monthId}
      dayId={dayId}
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

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{day}</h1>
      <h2>{monthName} {date}, {year}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <button>Previous Day</button>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: '/next-day',
            aboutProps: {
              schoolYearInfo: { schoolYearId, year },
              monthInfo: { monthName, monthId, sortedMonthObject },
              dayInfo: { dayId, date, day }
            }
          }}>
            <button>Next Day</button>
          </Link>
        </div>
      </div>
      <Link to={{
        pathname: '/task-create',
        aboutProps: {
          schoolYearId: { schoolYearId },
          monthId: { monthId },
          dayId: { dayId }
        }
      }} >
        <button style={{ borderRadius: '25px' }}>+</button>
      </Link>
      <button onClick={destroy}>Delete School Year</button>
    </div>
  )
}

export default CurrentDay
