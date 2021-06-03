import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const NextDay = props => {
  const { msgAlert } = props

  const schoolYear = props.location.aboutProps.schoolYearInfo.schoolYear
  const schoolYearId = props.location.aboutProps.schoolYearInfo.schoolYearId
  // console.log('schoolYearId: ', schoolYearId)
  const startYear = props.location.aboutProps.schoolYearInfo.startYear
  const endYear = props.location.aboutProps.schoolYearInfo.endYear
  const currYear = props.location.aboutProps.yearInfo.currYear
  const leapYear = props.location.aboutProps.yearInfo.leapYear

  let currMonthIndex = props.location.aboutProps.monthInfo.currMonthIndex
  let currMonthId = props.location.aboutProps.monthInfo.currMonthId
  let currMonth = props.location.aboutProps.monthInfo.currMonth
  let currMonthName = props.location.aboutProps.monthInfo.currMonthName
  let currMonthNumber = props.location.aboutProps.monthInfo.currMonthNumber
  let currDateIndex = props.location.aboutProps.dateInfo.currDateIndex
  let currDate = props.location.aboutProps.dateInfo.currDate
  let currDateId = props.location.aboutProps.dateInfo.currDateId
  let currDayName = props.location.aboutProps.dayInfo.currDayName
  let currDayNumber = props.location.aboutProps.dayInfo.currDayNumber

  let prevMonthIndex = props.location.aboutProps.monthInfo.prevMonthIndex
  let prevMonthId = props.location.aboutProps.monthInfo.prevMonthId
  let prevMonth = props.location.aboutProps.monthInfo.prevMonth
  let prevMonthName = props.location.aboutProps.monthInfo.prevMonthName
  let prevMonthNumber = props.location.aboutProps.monthInfo.prevMonthNumber
  let prevDateIndex = props.location.aboutProps.dateInfo.prevDateIndex
  let prevDate = props.location.aboutProps.dateInfo.prevDate
  let prevDateId = props.location.aboutProps.dateInfo.prevDateId
  let prevDayName = props.location.aboutProps.dayInfo.prevDayName
  let prevDayNumber = props.location.aboutProps.dayInfo.prevDayNumber

  let nextMonthIndex = props.location.aboutProps.monthInfo.nextMonthIndex
  let nextMonthId = props.location.aboutProps.monthInfo.nextMonthId
  let nextMonth = props.location.aboutProps.monthInfo.nextMonth
  let nextMonthName = props.location.aboutProps.monthInfo.nextMonthName
  let nextMonthNumber = props.location.aboutProps.monthInfo.nextMonthNumber
  let nextDateIndex = props.location.aboutProps.dateInfo.nextDateIndex
  let nextDate = props.location.aboutProps.dateInfo.nextDate
  let nextDateId = props.location.aboutProps.dateInfo.nextDateId
  let nextDayName = props.location.aboutProps.dateInfo.nextDayName
  let nextDayNumber = props.location.aboutProps.dateInfo.nextDayNumber

  // Set up next day as current day
  // Calculate next day, if it is the start of a new month
  if (currDate === currMonth.length) {
    if (currMonthIndex === 11) {
      currMonthIndex = 0
    } else {
      currMonthIndex++
    }
    currDate = 1
  } else {
    currDate++
  }
  // console.log('currMonthIndex: ', currMonthIndex)
  // console.log('currDate: ', currDate)

  currMonthId = schoolYear[currMonthIndex]._id
  // console.log('currMonthId: ', currMonthId)
  currMonth = schoolYear[currMonthIndex].days.sort((a, b) => a.day - b.day)
  // console.log('currMonth: ', currMonth)
  currMonthName = schoolYear[currMonthIndex].month
  // console.log('currMonthName: ', currMonthName)
  currMonthNumber = currMonthIndex + 1
  // console.log('currMonthNumber: ', currMonthNumber)
  currDateIndex = currDate - 1
  // console.log('currDateIndex: ', currDateIndex)

  currDateId = currMonth[currDateIndex]._id
  // console.log('currDateId: ', currDateId)

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  if (currDayNumber === 6) {
    currDayNumber = 0
  } else {
    currDayNumber++
  }
  // console.log('currDayNumber: ', currDayNumber)

  currDayName = dayNumbers[currDayNumber]
  // console.log('currDayName: ', currDayName)

  // Set up Previous Info
  prevMonthNumber = currMonthNumber - 1
  if (currMonthNumber === 1) prevMonthNumber = 12

  prevMonthIndex = currMonthIndex - 1
  if (currMonthIndex === 0) prevMonthIndex = 11

  // console.log('prevMonthNumber: ', prevMonthNumber)
  // console.log('prevMonthIndex: ', prevMonthIndex)
  prevMonth = schoolYear[prevMonthIndex].days.sort((a, b) => a.day - b.day)
  // console.log('prevMonth: ', prevMonth)
  prevMonthName = schoolYear[prevMonthIndex].month
  // console.log('prevMonthName: ', prevMonthName)
  prevMonthId = schoolYear[prevMonthIndex]._id
  // console.log('prevMonthId: ', prevMonthId)

  // prevDate = 0
  // prevDateIndex = 0
  if ((currDate === 1 && currMonthName === 'September') || (currDate === 1 && currMonthName === 'November') || (currDate === 1 && currMonthName === 'February') || (currDate === 1 && currMonthName === 'April') || (currDate === 1 && currMonthName === 'June')) {
    prevDate = 31
    prevDateIndex = 30
  } else if ((currDate === 1 && currMonthName === 'August') || (currDate === 1 && currMonthName === 'October') || (currDate === 1 && currMonthName === 'December') || (currDate === 1 && currMonthName === 'January') || (currDate === 1 && currMonthName === 'May') || (currDate === 1 && currMonthName === 'July')) {
    prevDate = 30
    prevDateIndex = 29
  } else if (leapYear && currDate === 1 && currMonthName === 'March') {
    prevDate = 29
    prevDateIndex = 28
  } else if (!leapYear && currDate === 1 && currMonthName === 'March') {
    prevDate = 28
    prevDateIndex = 27
  } else {
    prevDate = currDate - 1
    prevDateIndex = currDateIndex - 1
  }

  // console.log('prevDate: ', prevDate)
  // console.log('prevDateIndex: ', prevDateIndex)

  // let prevDateId = ''
  if (currDate === 1) {
    prevDateId = prevMonth[prevDateIndex]._id
  } else {
    prevDateId = currMonth[prevDateIndex]._id
  }
  // console.log('prevDateId: ', prevDateId)

  prevDayNumber = currDayNumber - 1
  if (currDayNumber === 0) prevDayNumber = 6
  // console.log('prevDayNumber: ', prevDayNumber)
  prevDayName = dayNumbers[prevDayNumber]
  // console.log('prevDayName: ', prevDayName)

  // Set up Next Info
  nextMonthIndex = currMonthIndex + 1
  if (currMonthIndex === 11) nextMonthIndex = 0
  // console.log('nextMonthIndex: ', nextMonthIndex)

  nextMonth = schoolYear[nextMonthIndex].days.sort((a, b) => a.day - b.day)
  // console.log('nextMonth: ', nextMonth)
  nextMonthName = schoolYear[nextMonthIndex].month
  // console.log('nextMonthName: ', nextMonthName)
  nextMonthId = schoolYear[nextMonthIndex]._id
  // console.log('nextMonthId: ', nextMonthId)

  nextMonthNumber = currMonthNumber + 1
  if (currMonthNumber === 12) nextMonthNumber = 1
  // console.log('nextMonthNumber: ', nextMonthNumber)

  // let nextDate = 0
  if (currDate === currMonth.length) {
    nextDate = 1
    nextDateIndex = 0
  } else {
    nextDate = currDate + 1
    nextDateIndex = currDateIndex + 1
  }
  // console.log('nextDate: ', nextDate)

  // console.log('nextDateIndex: ', nextDateIndex)

  // let nextDateId = ''
  if (currDate === currMonth.length) {
    nextDateId = nextMonth[nextDateIndex]._id
  } else {
    nextDateId = currMonth[nextDateIndex]._id
  }
  // console.log('nextDateId: ', nextDateId)

  nextDayNumber = currDayNumber + 1
  if (currDayNumber === 6) nextDayNumber = 0
  nextDayName = dayNumbers[nextDayNumber]
  // console.log('nextDayName: ', nextDayName)

  const [nextDay, setNextDay] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${currMonthId}/days/${currDateId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setNextDay(res.data.day))
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
  }, [refresh])

  if (!nextDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = nextDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      taskId={task._id}
      schoolYear={schoolYear}
      schoolYearId={schoolYearId}
      startYear={startYear}
      endYear={endYear}
      currYear={currYear}
      leapYear={leapYear}
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

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h6>{startYear}-{endYear}</h6>
      <br />
      <h1>{currDayName}</h1>
      <h2>{currMonthName} {currDate}, {currYear}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${prevDateId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId, startYear, endYear },
              yearInfo: { currYear, leapYear },
              monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
              dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
              dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
            }
          }}>
            <button onClick={refreshPage} className="button-style">Previous Day</button>
          </Link>
        </div>
        <div style={{ margin: '10px' }}>
          {nextDay.length === 0 ? <div></div> : dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/next-day/${nextDateId}`,
            aboutProps: {
              schoolYearInfo: { schoolYear, schoolYearId, startYear, endYear },
              yearInfo: { currYear, leapYear },
              monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
              dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
              dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
            }
          }}>
            <button onClick={refreshPage} className="button-style">Next Day</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={{
          pathname: '/task-create',
          aboutProps: {
            schoolYearInfo: { schoolYear, schoolYearId, startYear, endYear },
            yearInfo: { currYear, leapYear },
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

export default NextDay
