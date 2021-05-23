import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Months from './Months'
// import Day from './Day'

const SchoolYear = props => {
  const schoolYearId = props.match.params.schoolYearId
  const [schoolYear, setSchoolYear] = useState(null)
  // const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  const today = new Date()
  const todaysMonthNumber = (today.getMonth() + 1)

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
  console.log(todaysMonthName)

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

  const todaysMonth = sortedSchoolYear.find(month => month.month === todaysMonthName)

  const todaysMonthId = todaysMonth._id

  const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

  const todaysNum = today.getDate()

  const sortedTodaysMonthDays = todaysMonth.days.sort((a, b) => a.day - b.day)

  const sortedTodaysDayId = sortedTodaysMonthDays[todaysNum - 1]._id
  if (schoolYear) {
    return (
      <Redirect to={{
        pathname: `/schoolyears/${schoolYearId}/months/${todaysMonthId}/days/${sortedTodaysDayId}`,
        aboutProps: {
          date: { date }
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
