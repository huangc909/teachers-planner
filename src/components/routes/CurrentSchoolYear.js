import React from 'react'
import { Redirect } from 'react-router-dom'

const CurrentSchoolYear = (props) => {
  const schoolYear = props.location.aboutProps.schoolYearInfo.sortedCurrSchoolYear
  console.log('schoolYear: ', schoolYear)
  const schoolYearId = props.location.aboutProps.schoolYearInfo.currSchoolYearId
  console.log('schoolYearId: ', schoolYearId)
  const startYear = props.location.aboutProps.schoolYearInfo.startYear
  console.log('startYear: ', startYear)
  const endYear = props.location.aboutProps.schoolYearInfo.endYear
  console.log('endYear: ', endYear)
  const todaysYear = props.location.aboutProps.yearInfo.todaysYear
  console.log('todaysYear: ', todaysYear)
  const leapYear = props.location.aboutProps.leapYear.leapYear
  console.log('leapYear: ', leapYear)
  const schoolYearMonthNumber = props.location.aboutProps.monthInfo.schoolYearMonthNumber
  console.log('schoolYearMonthNumber: ', schoolYearMonthNumber)
  const todaysMonthName = props.location.aboutProps.monthInfo.todaysMonthName
  console.log('todaysMonthName: ', todaysMonthName)
  const todaysMonthNumber = props.location.aboutProps.monthInfo.todaysMonthNumber
  console.log('todaysMonthNumber: ', todaysMonthNumber)
  const todaysDate = props.location.aboutProps.dateInfo.todaysDate
  console.log('todaysDate: ', todaysDate)
  const todaysDayNumber = props.location.aboutProps.dayInfo.todaysDayNumber
  console.log('todayDayNumber: ', todaysDayNumber)
  // // Set up Current info
  const currYear = todaysYear
  console.log('currYear: ', currYear)
  // Use school year month number from now on
  const currMonthNumber = schoolYearMonthNumber
  console.log('currMonthNumber: ', currMonthNumber)
  const currMonthName = todaysMonthName
  console.log('currMonthName: ', currMonthName)
  const currMonthIndex = schoolYearMonthNumber - 1
  console.log('currMonthIndex: ', currMonthIndex)
  // Sort month object
  const currMonth = schoolYear[currMonthIndex].days.sort((a, b) => a.day - b.day)
  console.log('currMonth: ', currMonth)
  const currMonthId = schoolYear[currMonthIndex]._id
  console.log('currMonthId: ', currMonthId)
  const currDate = todaysDate
  console.log('currDate: ', currDate)
  const currDateIndex = todaysDate - 1
  console.log('currDateIndex: ', currDateIndex)
  const currDateId = schoolYear[currMonthIndex].days[currDateIndex]._id
  console.log('currDateId: ', currDateId)
  const currDayNumber = todaysDayNumber
  console.log('currDayNumber: ', currDayNumber)

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const currDayName = dayNumbers[currDayNumber]
  console.log('currDayName: ', currDayName)

  // Set up Previous Info
  let prevMonthNumber = currMonthNumber - 1
  if (currMonthNumber === 1) prevMonthNumber = 12

  let prevMonthIndex = currMonthIndex - 1
  if (currMonthIndex === 0) prevMonthIndex = 11

  console.log('prevMonthNumber: ', prevMonthNumber)
  console.log('prevMonthIndex: ', prevMonthIndex)
  const prevMonth = schoolYear[prevMonthIndex].days.sort((a, b) => a.day - b.day)
  console.log('prevMonth: ', prevMonth)
  const prevMonthName = schoolYear[prevMonthIndex].month
  console.log('prevMonthName: ', prevMonthName)
  const prevMonthId = schoolYear[prevMonthIndex]._id
  console.log('prevMonthId: ', prevMonthId)

  let prevDate = 0
  let prevDateIndex = 0
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

  console.log('prevDate: ', prevDate)
  console.log('prevDateIndex: ', prevDateIndex)

  let prevDateId = ''
  if (currDate === 1) {
    prevDateId = prevMonth[prevDateIndex]._id
  } else {
    prevDateId = currMonth[prevDateIndex]._id
  }
  console.log('prevDateId: ', prevDateId)

  let prevDayNumber = currDayNumber - 1
  if (currDayNumber === 0) prevDayNumber = 6
  console.log('prevDayNumber: ', prevDayNumber)
  const prevDayName = dayNumbers[prevDayNumber]
  console.log('prevDayName: ', prevDayName)

  // Set up Next Info
  let nextMonthIndex = currMonthIndex + 1
  if (currMonthIndex === 11) nextMonthIndex = 0
  console.log('nextMonthIndex: ', nextMonthIndex)

  const nextMonth = schoolYear[nextMonthIndex].days.sort((a, b) => a.day - b.day)
  console.log('nextMonth: ', nextMonth)
  const nextMonthName = schoolYear[nextMonthIndex].month
  console.log('nextMonthName: ', nextMonthName)
  const nextMonthId = schoolYear[nextMonthIndex]._id
  console.log('nextMonthId: ', nextMonthId)

  let nextMonthNumber = currMonthNumber + 1
  if (currMonthNumber === 12) nextMonthNumber = 1
  console.log('nextMonthNumber: ', nextMonthNumber)

  let nextDate = 0
  if (currDate === currMonth.length) {
    nextDate = 1
  } else {
    nextDate = currDate + 1
  }
  console.log('nextDate: ', nextDate)

  const nextDateIndex = currDateIndex + 1
  console.log('nextDateIndex: ', nextDateIndex)

  let nextDateId = ''
  if (currDate === currMonth.length) {
    nextDateId = nextMonth.days[nextDateIndex]._id
  } else {
    nextDateId = currMonth[nextDateIndex]._id
  }
  console.log('nextDateId: ', nextDateId)

  let nextDayNumber = currDayNumber + 1
  if (currDayNumber === 6) nextDayNumber = 0
  const nextDayName = dayNumbers[nextDayNumber]
  console.log('nextDayName: ', nextDayName)

  return (
    <Redirect to={{
      pathname: '/current-day',
      aboutProps: {
        schoolYearInfo: { schoolYear, schoolYearId },
        yearInfo: { currYear },
        monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
        dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
        dayInfo: { currDayName, currDayNumber, prevDayName, prevDayNumber, nextDayName, nextDayNumber }
      }
    }} />
  )
}

export default CurrentSchoolYear
