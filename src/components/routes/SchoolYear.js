import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const SchoolYear = props => {
  const currSchoolYearId = props.match.params.schoolYearId
  const [currSchoolYear, setCurrSchoolYear] = useState(null)
  const { msgAlert } = props

  const today = new Date()
  const currYear = today.getFullYear()
  const currMonthNumber = (today.getMonth() + 1)
  const currDate = today.getDate()
  const currDayNumber = today.getDay()

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

  const currMonthName = monthNumbers[currMonthNumber]

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const currDay = dayNumbers[currDayNumber]

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

  const yearObject = currSchoolYear.months.sort((a, b) => a.number - b.number)

  const unsortedMonthObject = yearObject.find(month => month.month === currMonthName)

  const monthObject = unsortedMonthObject.days.sort((a, b) => a.day - b.day)

  const monthId = unsortedMonthObject._id

  const currDateId = monthObject[currDate - 1]._id

  if (currSchoolYear) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          schoolYearInfo: { currSchoolYear, currSchoolYearId },
          yearInfo: { currYear },
          monthInfo: { monthObject, currMonthName, monthId },
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
