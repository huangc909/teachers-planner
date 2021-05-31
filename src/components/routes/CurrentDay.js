import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const currSchoolYear = props.location.aboutProps.schoolYearInfo.currSchoolYear
  const currSchoolYearId = props.location.aboutProps.schoolYearInfo.currSchoolYearId
  const currYear = props.location.aboutProps.yearInfo.year
  const monthObject = props.location.aboutProps.monthInfo.monthObject
  const monthName = props.location.aboutProps.monthInfo.monthName
  const monthId = props.location.aboutProps.monthInfo.monthId
  const currDate = props.location.aboutProps.dateInfo.currDate
  const currDay = props.location.aboutProps.dayInfo.currDay
  const currDayNumber = props.location.aboutProps.dayInfo.currDayNumber
  const currDateId = props.location.aboutProps.dateInfo.currDateId
  const nextDayId = monthObject[currDate]._id
  const prevDayId = monthObject[currDate - 2]._id

  const [currentDay, setCurrentDay] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}/months/${monthId}/days/${currDateId}`,
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
        msgAlert({
          heading: 'Failed to show day' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!currentDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = currentDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      currYear={currYear}
      currSchoolYear={currSchoolYear}
      currSchoolYearId={currSchoolYearId}
      monthName={monthName}
      monthObject={monthObject}
      monthId={monthId}
      currDate={currDate}
      currDay={currDay}
      currDateId={currDateId}
      currDayNumber={currDayNumber}
      taskId={task._id}
    />
  ))

  const destroy = (event) => {
    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}`,
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
      <h6>{currSchoolYear.startYear}-{currSchoolYear.endYear}</h6>
      <br />
      <h1>{currDay}</h1>
      <h2>{monthName} {currDate}, {currYear}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${prevDayId}`,
            aboutProps: {
              schoolYearInfo: { currSchoolYear, currSchoolYearId },
              yearInfo: { currYear },
              monthInfo: { monthObject, monthId, monthName },
              dateInfo: { currDate, currDateId },
              dayInfo: { currDay, currDayNumber }
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
              schoolYearInfo: { currSchoolYear, currSchoolYearId },
              yearInfo: { currYear },
              monthInfo: { monthObject, monthId, monthName },
              dateInfo: { currDate, currDateId },
              dayInfo: { currDay, currDayNumber }
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
            schoolYearInfo: { currSchoolYear, currSchoolYearId },
            yearInfo: { currYear },
            monthInfo: { monthObject, monthId, monthName },
            dateInfo: { currDate, currDateId },
            dayInfo: { currDay, currDayNumber }
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
