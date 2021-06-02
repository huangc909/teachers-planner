import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const CurrentDay = (props) => {
  const { msgAlert } = props

  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  console.log('schoolYearId: ', schoolYearId)
  const currYear = props.location.aboutProps.yearInfo.currYear

  const currMonthIndex = props.location.aboutProps.monthInfo.currMonthId
  const currMonthId = props.location.aboutProps.monthInfo.currMonthId
  const currMonth = props.location.aboutProps.monthInfo.currMonth
  const currMonthName = props.location.aboutProps.monthInfo.currMonthName
  const currMonthNumber = props.location.aboutProps.monthInfo.currMonthNumber
  const currDateIndex = props.location.aboutProps.dateInfo.currDateIndex
  const currDate = props.location.aboutProps.dateInfo.currDate
  const currDateId = props.location.aboutProps.dateInfo.currDateId
  const currDayName = props.location.aboutProps.dayInfo.currDayName
  const currDayNumber = props.location.aboutProps.dayInfo.currDayNumber

  const prevMonthIndex = props.location.aboutProps.monthInfo.prevMonthIndex
  const prevMonthId = props.location.aboutProps.monthInfo.prevMonthId
  const prevMonth = props.location.aboutProps.monthInfo.prevMonth
  const prevMonthName = props.location.aboutProps.monthInfo.prevMonthName
  const prevMonthNumber = props.location.aboutProps.monthInfo.prevMonthNumber
  const prevDateIndex = props.location.aboutProps.dateInfo.prevDateIndex
  const prevDate = props.location.aboutProps.dateInfo.prevDate
  const prevDateId = props.location.aboutProps.dateInfo.prevDateId
  const prevDayName = props.location.aboutProps.dayInfo.prevDayName
  const prevDayNumber = props.location.aboutProps.dayInfo.prevDayNumber

  const nextMonthIndex = props.location.aboutProps.monthInfo.nextMonthIndex
  const nextMonthId = props.location.aboutProps.monthInfo.nextMonthId
  const nextMonth = props.location.aboutProps.monthInfo.nextMonth
  const nextMonthName = props.location.aboutProps.monthInfo.nextMonthName
  const nextMonthNumber = props.location.aboutProps.monthInfo.nextMonthNumber
  const nextDateIndex = props.location.aboutProps.dateInfo.nextDateIndex
  const nextDate = props.location.aboutProps.dateInfo.nextDate
  const nextDateId = props.location.aboutProps.dateInfo.nextDateId
  const nextDayName = props.location.aboutProps.dateInfo.nextDayName
  const nextDayNumber = props.location.aboutProps.dateInfo.nextDayNumber

  const [currentDay, setCurrentDay] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${currMonthId}/days/${currDateId}`,
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
      taskId={task._id}
      schoolYear={schoolYear}
      schoolYearId={schoolYearId}
      currYear={currYear}
      currMonthIndex={currMonthIndex}
      currMonthId={currMonthId}
      currMonth={currMonth}
      currMonthName={currMonthName}
      currMonthNumber={currMonthNumber}
      currDateIndex={currDateIndex}
      currDate={currDate}
      currDateId={currDateId}
      currDayName={currDayName}
      currDayNumber={currDayNumber}
      prevMonthIndex={prevMonthIndex}
      prevMonthId={prevMonthId}
      prevMonth={prevMonth}
      prevMonthName={prevMonthName}
      prevMonthNumber={prevMonthNumber}
      prevDateIndex={prevDateIndex}
      prevDate={prevDate}
      prevDateId={prevDateId}
      prevDayName={prevDayName}
      prevDayNumber={prevDayNumber}
      nextMonthIndex={nextMonthIndex}
      nextMonthId={nextMonthId}
      nextMonth={nextMonth}
      nextMonthName={nextMonthName}
      nextMonthNumber={nextMonthNumber}
      nextDateIndex={nextDateIndex}
      nextDate={nextDate}
      nextDateId={nextDateId}
      nextDayName={nextDayName}
      nextDayNumber={nextDayNumber}
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
      <h1>{currDayName}</h1>
      <h2>{currMonthName} {currDate}, {currYear}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${prevDateId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { currYear },
              monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
              dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
              dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
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
            pathname: `/next-day/${nextDateId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId },
              yearInfo: { currYear },
              monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
              dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
              dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
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
            yearInfo: { currYear },
            monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
            dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
            dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
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
