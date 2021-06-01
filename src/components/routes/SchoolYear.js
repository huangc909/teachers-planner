import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// SchoolYear Component will determine if selected school year is the current school year or not
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

  let leapYear = false
  leapYear = (todaysYear % 100 === 0) ? (todaysYear % 400 === 0) : (todaysYear % 4 === 0)

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
  // Determine today's month name
  // Example: 'June'
  const todaysMonthName = monthNumbers[todaysMonthNumber]

  // Determine school year month number
  // Example: 11
  let schoolYearMonthNumber = 0
  if (todaysMonthNumber === 8) {
    schoolYearMonthNumber = 1
  } else if (todaysMonthNumber === 9) {
    schoolYearMonthNumber = 2
  } else if (todaysMonthNumber === 10) {
    schoolYearMonthNumber = 3
  } else if (todaysMonthNumber === 11) {
    schoolYearMonthNumber = 4
  } else if (todaysMonthNumber === 12) {
    schoolYearMonthNumber = 5
  } else {
    schoolYearMonthNumber = todaysMonthNumber + 5
  }

  // Organize school year to be in chronological order
  const sortedCurrSchoolYear = currSchoolYear.months.sort((a, b) => a.number - b.number)

  let schoolYear = ''
  const startYear = parseInt(currSchoolYear.startYear)
  const endYear = parseInt(currSchoolYear.endYear)

  // If todaysYear matches either schoolYear.start or schoolYear.end
  // AND the schoolYearMonthNumber matches
  if ((todaysYear === startYear && todaysMonthName === 'August') || (todaysYear === startYear && todaysMonthName === 'September') || (todaysYear === startYear && todaysMonthName === 'October') || (todaysYear === startYear && todaysMonthName === 'November') || (todaysYear === startYear && todaysMonthName === 'December') || (todaysYear === endYear && todaysMonthName === 'January') || (todaysYear === endYear && todaysMonthName === 'February') || (todaysYear === endYear && todaysMonthName === 'March') || (todaysYear === endYear && todaysMonthName === 'April') || (todaysYear === endYear && todaysMonthName === 'May') || (todaysYear === endYear && todaysMonthName === 'June') || (todaysYear === endYear && todaysMonthName === 'July')) {
    schoolYear = 'Current School Year'
    return (
      <Redirect to={{
        pathname: '/current-school-year',
        aboutProps: {
          schoolYearInfo: { schoolYear, sortedCurrSchoolYear, startYear, endYear },
          yearInfo: { todaysYear },
          leapYear: { leapYear },
          monthInfo: { schoolYearMonthNumber, todaysMonthName, todaysMonthNumber },
          dateInfo: { todaysDate },
          dayInfo: { todaysDayNumber }
        }
      }} />
    )
  } else {
    schoolYear = 'Other School Year'
    return (
      <Redirect to={{
        pathname: '/other-school-year',
        aboutProps: {
          schoolYearInfo: { schoolYear, sortedCurrSchoolYear, startYear, endYear },
          yearInfo: { todaysYear },
          monthInfo: { schoolYearMonthNumber, todaysMonthName, todaysMonthNumber },
          dateInfo: { todaysDate },
          dayInfo: { todaysDayNumber }
        }
      }} />
    )
  }
}

export default SchoolYear
