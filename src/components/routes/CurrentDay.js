import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthId = props.location.aboutProps.monthInfo.monthId
  const date = props.location.aboutProps.dateInfo.date
  const day = props.location.aboutProps.dayInfo.day
  const dayNumber = props.location.aboutProps.dayInfo.dayNumber
  const dayId = props.location.aboutProps.dayInfo.dayId
  const nextDayId = monthObject[date]._id
  const previousDayId = monthObject[date - 2]._id

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
        heading: 'Showing selected day to-do list',
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
  console.log('currentDay ', currentDay)
  const dailyTasks = currentDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      year={year}
      schoolYear={schoolYear}
      schoolYearId={schoolYearId}
      monthName={monthName}
      monthObject={monthObject}
      monthId={monthId}
      date={date}
      day={day}
      dayId={dayId}
      dayNumber={dayNumber}
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
      <h6>{schoolYear.startYear}-{schoolYear.endYear}</h6>
      <br />
      <h1>{day}</h1>
      <h2>{monthName} {date}, {year}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${previousDayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { monthObject, monthId, monthName },
              dateInfo: { date },
              dayInfo: { day, dayNumber, dayId }
            }
          }}>
            <button className="button-style">Previous Day</button>
          </Link>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/next-day/${nextDayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { monthObject, monthId, monthName },
              dateInfo: { date },
              dayInfo: { day, dayNumber, dayId }
            }
          }}>
            <button className="button-style">Next Day</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={{
          pathname: '/task-create',
          aboutProps: {
            schoolYearInfo: { schoolYear, schoolYearId },
            yearInfo: { year },
            monthInfo: { monthObject, monthId, monthName },
            dateInfo: { date },
            dayInfo: { day, dayNumber, dayId }
          }
        }} >
          <button style={{ width: '30px', height: '30px', borderRadius: '25px' }}>+</button>
        </Link>
      </div>
      <br />
      <div>
        <button style={{ marginTop: '250px' }} className="button-style" onClick={destroy}>Delete School Year</button>
      </div>
    </div>
  )
}

export default CurrentDay
