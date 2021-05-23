import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const NextDay = props => {
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
  const previousDate = props.location.aboutProps.dayInfo.date
  console.log(previousDate)
  const date = previousDate + 1
  console.log(date)
  const dayId = monthObject[date + 1]._id
  const previousDay = props.location.aboutProps.dayInfo.day
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

  if (previousDay === 6) {
    day = dayNumbers[0]
  } else {
    day = dayNumbers[day + 1]
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

  const [futureDay, setFutureDay] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setFutureDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing future list',
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

  console.log(futureDay)
  if (!futureDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = futureDay.tasks.map(task => (
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
                todaysMonthInfo: { monthName, monthId, monthObject },
                todaysDayInfo: { dayId, date }
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

export default NextDay
