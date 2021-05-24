import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const NextDay = props => {
  const { msgAlert } = props
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const monthId = props.location.aboutProps.monthInfo.monthId
  const monthName = props.location.aboutProps.monthInfo.monthName
  const previousDate = props.location.aboutProps.dateInfo.date
  const date = previousDate + 1
  const dayId = monthObject[date + 1]._id
  let dayNumber = props.location.aboutProps.dayInfo.dayNumber
  dayNumber += 1
  let day = ''

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  if (dayNumber === 6) {
    day = dayNumbers[0]
    dayNumber = 0
  } else {
    day = dayNumbers[dayNumber]
  }

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

  const [nextDay, setNextDay] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setNextDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing next list',
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

  if (!nextDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = nextDay.tasks.map(task => (
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

  return (
    <div style={{ textAlign: 'center' }}>
      <h6>{schoolYear.startYear}-{schoolYear.endYear}</h6>
      <button className="button-style">Delete School Year</button>
      <h1>{day}</h1>
      <h2>{monthName} {date}, {year}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${dayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { monthName, monthId, monthObject },
              dateInfo: { date },
              dayInfo: { dayId, date, day, dayNumber }
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
            pathname: `/next-day/${dayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { monthName, monthId, monthObject },
              dateInfo: { date },
              dayInfo: { dayId, day, dayNumber }
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
            schoolYearId: { schoolYearId },
            monthId: { monthId },
            dayId: { dayId }
          }
        }} >
          <button style={{ width: '30px', height: '30px', borderRadius: '25px' }}>+</button>
        </Link>
      </div>
    </div>
  )
}

export default NextDay
