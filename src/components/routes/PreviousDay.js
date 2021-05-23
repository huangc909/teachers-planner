import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const PreviousDay = props => {
  const { msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  console.log(schoolYearId)
  const year = props.location.aboutProps.schoolYearInfo.year
  const monthName = props.location.aboutProps.monthInfo.monthName
  console.log(monthName)
  const monthId = props.location.aboutProps.monthInfo.monthId
  console.log(monthId)
  const monthObject = props.location.aboutProps.monthInfo.sortedMonthObject
  console.log('todaysMonthObject ', monthObject)
  const nextDate = props.location.aboutProps.dayInfo.date
  console.log(nextDate)
  const date = nextDate - 1
  console.log(date)
  const dayId = monthObject[date - 1]._id
  const nextDayNumber = props.location.aboutProps.dayInfo.dayNumber
  console.log(nextDayNumber)
  const dayNumber = nextDayNumber - 1
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

  if (nextDayNumber === 0) {
    day = dayNumbers[6]
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

  const [previousDay, setPreviousDay] = useState(null)

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
        heading: 'Showing previous list',
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

  console.log(previousDay)
  if (!previousDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = previousDay.tasks.map(task => (
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
    <div>
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
              pathname: '/next-day',
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
      </div>
    </div>
  )
}

export default PreviousDay
