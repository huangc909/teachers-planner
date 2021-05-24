import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const PreviousDay = props => {
  const { msgAlert } = props
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthId = props.location.aboutProps.monthInfo.monthId
  let date = props.location.aboutProps.dateInfo.date
  date -= 1
  let day = ''
  let dayNumber = props.location.aboutProps.dayInfo.dayNumber
  if (dayNumber === 0) {
    dayNumber = 6
  } else {
    dayNumber -= 1
  }
  const dayId = monthObject[date - 1]._id
  const nextDayId = monthObject[date]._id
  const previousDayId = monthObject[date - 2]._id

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  day = dayNumbers[dayNumber]

  // const thirtyDayMonthNames = {
  //   0: 'April',
  //   1: 'June',
  //   2: 'September',
  //   3: 'November'
  // }
  //
  // const thirtyOneDayMonthNames = {
  //   0: 'January',
  //   1: 'March',
  //   2: 'May',
  //   3: 'July',
  //   4: 'August',
  //   5: 'October',
  //   6: 'December'
  // }

  const [previousDay, setPreviousDay] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setPreviousDay(res.data.day))
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

  if (!previousDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = previousDay.tasks.map(task => (
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
              schoolYearInfo: { schoolYearId, schoolYear },
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
          {previousDay.length === 0 ? <div></div> : dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/next-day/${nextDayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYearId, schoolYear },
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

export default PreviousDay
