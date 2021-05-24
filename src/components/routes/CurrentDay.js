import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const schoolYearId = props.location.aboutProps.currentSchoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year
  const unsortedMonthObject = props.location.aboutProps.monthInfo.monthObject
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthId = props.location.aboutProps.monthInfo.monthId
  const date = props.location.aboutProps.dateInfo.date
  const day = props.location.aboutProps.dayInfo.day
  const dayNumber = props.location.aboutProps.dayInfo.dayNumber
  const monthObject = unsortedMonthObject.days.sort((a, b) => a.day - b.day)
  const dayId = monthObject[date + 1]._id

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
  // console.log('currentDay ', currentDay)
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
          <Link to={{
            pathname: '/previous-day',
            aboutProps: {
              schoolYearInfo: { schoolYearId, year },
              monthInfo: { monthName, monthId, monthObject },
              dayInfo: { dayId, date, day, dayNumber }
            }
          }}>
            <button>Previous Day</button>
          </Link>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/next-day/${dayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYearId, year },
              monthInfo: { monthName, monthId, monthObject },
              dayInfo: { dayId, date, day, dayNumber }
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
