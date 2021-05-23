import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const SchoolYear = props => {
  const schoolYearId = props.match.params.schoolYearId
  const [schoolYear, setSchoolYear] = useState(null)
  // const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  const today = new Date()
  const todaysYear = today.getFullYear()
  const todaysMonthNumber = (today.getMonth() + 1)
  const todaysDate = today.getDate()
  const todaysDayNumber = today.getDay()

  const monthNumber = {
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

  const todaysMonthName = monthNumber[todaysMonthNumber]

  const dayNumber = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const todaysDay = dayNumber[todaysDayNumber]

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

  // const destroy = () => {
  //   axios({
  //     url: `${apiUrl}/schoolYears/${props.match.params.schoolYearId}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${props.user.token}`
  //     }
  //   })
  //     .then(() => setDeleted(true))
  //     .then(() => msgAlert({
  //       heading: 'School Year Deleted',
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       setSchoolYear({ startYear: '' })
  //       msgAlert({
  //         heading: 'Failed to delete' + error.message,
  //         variant: 'danger'
  //       })
  //     })
  // }
  if (!schoolYear) {
    return <p>Loading...</p>
  }

  // if (deleted) {
  //   return (
  //     <Redirect to={'/home-page'} />
  //   )
  // }

  const sortedSchoolYear = schoolYear.months.sort((a, b) => a.number - b.number)

  const todaysMonthObject = sortedSchoolYear.find(month => month.month === todaysMonthName)

  const todaysMonthId = todaysMonthObject._id

  if (schoolYear) {
    return (
      <Redirect to={{
        pathname: '/current-day',
        aboutProps: {
          currentSchoolYearInfo: { sortedSchoolYear, schoolYearId },
          todaysYearInfo: { todaysYear },
          todaysMonthInfo: { todaysMonthObject, todaysMonthId, todaysMonthNumber, todaysMonthName },
          todaysDateInfo: { todaysDate },
          todaysDayInfo: { todaysDay }
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
