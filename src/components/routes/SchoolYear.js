import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const SchoolYear = props => {
  const currSchoolYearId = props.match.params.schoolYearId
  const [currSchoolYear, setCurrSchoolYear] = useState(null)
  const { msgAlert } = props

  // Calculate today's date
  const today = new Date()
  const todaysYear = today.getFullYear()
  const todaysDate = today.getDate()
  const todaysMonthNumber = (today.getMonth() + 1)
  const todaysDayNumber = today.getDay()

  // Set up Current info
  let currYear = 0
  let currMonthNumber = 0
  let currMonthName = ''
  let currMonthIndex = 0
  let currDate = 0
  let currDateIndex = 0
  let currDateId = ''
  let currDayNumber = 0
  let currDay = ''

  const monthNumbers = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }

  const todaysMonthName = monthNumbers[todaysMonthNumber]

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCurrSchoolYear(res.data.schoolYear))
      .then(() => msgAlert({
        heading: 'Showing selected school year',
        variant: 'primary'
      }))
      .catch(error => {
        setCurrSchoolYear({ startYear: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!currSchoolYear) {
    return <p>Loading...</p>
  }

  // Determine if today's year and month are within the selected school year
  if ((todaysYear === currSchoolYear.startYear && todaysMonthName === 'August') || (todaysYear === currSchoolYear.startYear && todaysMonthName === 'September') || (todaysYear === currSchoolYear.startYear && todaysMonthName === 'October') || (todaysYear === currSchoolYear.startYear && todaysMonthName === 'November') || (todaysYear === currSchoolYear.startYear && todaysMonthName === 'December') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'January') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'February') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'March') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'April') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'May') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'June') || (todaysYear === currSchoolYear.endYear && todaysMonthName === 'July')) {
    // If yes, date is today's date
    currYear = todaysYear
    currMonthNumber = todaysMonthName
    currMonthName = dayNumbers[todaysDayNumber]
    currMonthIndex = currMonthNumber - 1
    if (currMonthNumber === 0) currMonthIndex = 11
    currDate = todaysDate
    currDayNumber = todaysDayNumber
    currDay = dayNumbers[currDayNumber]
  } else {
    // Else, set new date to August 1, schoolyear startYear
    const newDay = new Date(`August 1, ${currSchoolYear.startYear} 00:00:00`)
    const newYear = newDay.getFullYear()
    const newDate = newDay.getDate()
    const newMonthNumber = (newDay.getMonth() + 1)
    const newDayNumber = newDay.getDay()
    currYear = newYear
    currMonthNumber = newMonthNumber
    currMonthName = monthNumbers[newMonthNumber]
    currMonthIndex = currMonthNumber - 1
    if (currMonthNumber === 0) currMonthIndex = 11
    currDate = newDate
    currDayNumber = newDayNumber
    currDay = dayNumbers[currDayNumber]
  }

  // Calculate for leap year
  const leapYear = (currYear % 100 === 0) ? (currYear % 400 === 0) : (currYear % 4 === 0)

  // Organize school year, month, and day objects to be in order
  const yearObject = currSchoolYear.months.sort((a, b) => a.number - b.number)
  const unsortedMonthObject = yearObject.find(month => month.month === currMonthName)
  const currMonth = unsortedMonthObject.days.sort((a, b) => a.day - b.day)
  const currMonthId = unsortedMonthObject._id
  currDateIndex = currDate - 1
  currDateId = currMonth[currDateIndex]._id

  // Set up Previous Info
  let prevMonthNumber = currMonthNumber - 1
  if (currMonthNumber === 0) prevMonthNumber = 11

  let prevMonthIndex = prevMonthNumber - 1
  if (prevMonthNumber === 0) prevMonthIndex = 11

  let prevMonth = currSchoolYear[prevMonthIndex]
  let prevMonthName = prevMonth.month
  let prevMonthId = prevMonth._id

  let prevDate = 0
  if ((currDate === 1 && currMonthName === 'September') || (currDate === 1 && currMonthName === 'November') || (currDate === 1 && currMonthName === 'February') || (currDate === 1 && currMonthName === 'April') || (currDate === 1 && currMonthName === 'June')) {
    prevDate = 31
  } else if ((currDate === 1 && currMonthName === 'August') || (currDate === 1 && currMonthName === 'October') || (currDate === 1 && currMonthName === 'December') || (currDate === 1 && currMonthName === 'January') || (currDate === 1 && currMonthName === 'May') || (currDate === 1 && currMonthName === 'July')) {
    prevDate = 30
  } else if (leapYear && currDate === 0 && currMonthName === 'March') {
    prevDate = 29
  } else if (!leapYear && currDate === 0 && currMonthName === 'March') {
    prevDate = 28
  } else {
    prevDate = currDate - 1
  }

  let prevDateId
  let prevDateIndex = prevDate - 1
  let prevDay
  let prevDayNumber

  // Set up Next Info
  let nextMonth
  let nextMonthName
  let nextMonthId
  let nextMonthNumber
  let nextDate
  let nextDateId
  let nextDay
  let nextDayNumber

  if (currSchoolYear) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          schoolYearInfo: { currSchoolYear, currSchoolYearId },
          yearInfo: { currYear },
          monthInfo: { currMonth, currMonthName, currMonthId, currMonthNumber, currMonthIndex },
          dateInfo: { currDate, currDateId },
          dayInfo: { currDay, currDayNumber }
        }
      }} />
    )
  }

  return (
    <div>
    </div>
  )
}

export default SchoolYear
