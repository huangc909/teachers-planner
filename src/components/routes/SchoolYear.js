import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const SchoolYear = props => {
  const schoolYearId = props.match.params.schoolYearId
  const [schoolYear, setSchoolYear] = useState(null)
  const { msgAlert } = props

  const today = new Date()
  const year = today.getFullYear()
  const monthNumber = (today.getMonth() + 1)
  const date = today.getDate()
  const dayNumber = today.getDay()

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

  const monthName = monthNumbers[monthNumber]

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const day = dayNumbers[dayNumber]

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setSchoolYear(res.data.schoolYear))
      .then(() => msgAlert({
        heading: 'Showing selected school year',
        variant: 'primary'
      }))
      .catch(error => {
        setSchoolYear({ startYear: '' })
        msgAlert({
          heading: 'Failed to show blog' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!schoolYear) {
    return <p>Loading...</p>
  }

  const yearObject = schoolYear.months.sort((a, b) => a.number - b.number)

  const unsortedMonthObject = yearObject.find(month => month.month === monthName)

  const monthObject = unsortedMonthObject.days.sort((a, b) => a.day - b.day)

  console.log('monthObject ', monthObject)

  const monthId = unsortedMonthObject._id

  console.log(monthId)

  const dayId = monthObject[date - 1]._id

  if (schoolYear) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          schoolYearInfo: { schoolYear, schoolYearId },
          yearInfo: { year },
          monthInfo: { monthObject, monthName, monthId },
          dateInfo: { date },
          dayInfo: { day, dayNumber, dayId }
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
