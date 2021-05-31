import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  // School Year and year Info
  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  const year = props.location.aboutProps.yearInfo.year

  // Current Month Info
  const currentMonthName = props.location.aboutProps.monthInfo.currentMonthName
  let currentMonthIndex = props.location.aboutProps.monthInfo.currentMonthIndex
  let currentMonthId = props.location.aboutProps.monthInfo.currentMonthId

  // Current Date Info
  let date = props.location.aboutProps.dateInfo.date

  // Current Day Info
  const days = props.location.aboutProps.dayInfo.days
  const day = props.location.aboutProps.dayInfo.day
  const dayNumber = props.location.aboutProps.dayInfo.dayNumber
  const dayId = props.location.aboutProps.dayInfo.dayId
  const dayIndex = date - 1

  // Next Month Info
  let nextMonthIndex = currentMonthIndex + 1
  if (currentMonthIndex === 11) {
    nextMonthIndex = 0
  }

  // Prev Month Info
  let prevMonthIndex = currentMonthIndex - 1
  if (currentMonthIndex === 0) {
    prevMonthIndex = 11
  }

  // Previous Day Info
  const previousDayId = days[dayIndex - 1]._id

  // Next Day Info
  let nextDayId = ''

  if (date === days.length) {
    nextDayId = schoolYear.months[nextMonthIndex].days[0]._id
  } else {
    nextDayId = days[dayIndex + 1]._id
  }

  const [currentDay, setCurrentDay] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${currentMonthId}/days/${dayId}`,
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
  }, [refresh])

  if (!currentDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = currentDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      taskId={task._id}
      year={year}
      schoolYear={schoolYear}
      schoolYearId={schoolYearId}
      currentMonthName={currentMonthName}
      currentMonthIndex={currentMonthIndex}
      currentMonthId={currentMonthId}
      prevMonthIndex={prevMonthIndex}
      nextMonthIndex={nextMonthIndex}
      date={date}
      days={days}
      day={day}
      dayId={dayId}
      dayNumber={dayNumber}
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

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  const goToNextDay = () => {
    if (date === days.length) {
      date = 1
      if (currentMonthIndex === 11) {
        currentMonthIndex = 0
        currentMonthId = schoolYear.months[currentMonthId]._id
      } else {
        currentMonthIndex++
        currentMonthId = schoolYear.months[currentMonthId]._id
      }
    } else {
      date++
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h6>{schoolYear.startYear}-{schoolYear.endYear}</h6>
      <br />
      <h1>{day}</h1>
      <h2>{currentMonthName} {date}, {year}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/current-day/${previousDayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { currentMonthId, currentMonthIndex, currentMonthName, nextMonthIndex, prevMonthIndex },
              dateInfo: { date },
              dayInfo: { days, day, dayNumber, dayId }
            }
          }}>
            <button onClick={refreshPage} className="button-style">Previous Day</button>
          </Link>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/current-day/${nextDayId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { year },
              monthInfo: { currentMonthId, currentMonthIndex, currentMonthName, nextMonthIndex, prevMonthIndex },
              dateInfo: { date },
              dayInfo: { days, day, dayNumber, dayId }
            }
          }}>
            <button
              onClick={(event) => {
                refreshPage(event)
                goToNextDay(event)
              }}
              className="button-style">Next Day</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={{
          pathname: '/task-create',
          aboutProps: {
            schoolYearInfo: { schoolYear, schoolYearId },
            yearInfo: { year },
            monthInfo: { currentMonthName, currentMonthId, currentMonthIndex, nextMonthIndex, prevMonthIndex },
            dateInfo: { date },
            dayInfo: { days, day, dayNumber, dayId }
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
