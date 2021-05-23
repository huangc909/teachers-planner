import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Months from './Months'
// import Day from './Day'

const SchoolYear = props => {
  // console.log(props)
  const schoolYearId = props.match.params.schoolYearId
  const [schoolYear, setSchoolYear] = useState(null)
  // const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  const today = new Date()
  const todaysMonthNumber = (today.getMonth() + 1)
  // console.log('todaysMonth ', todaysMonthNumber)
  // const todaysDay = today.getDate()
  // console.log('todaysDay ', todaysDay)

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
  // const months = (
  //   <Months
  //     sortedSchoolYear={sortedSchoolYear}
  //   />
  // )
  // const currentMonth = (
  //
  // )
  // console.log(sortedSchoolYear)
  const todaysMonth = sortedSchoolYear.find(month => month.month === todaysMonthName)
  // console.log(todaysMonth)
  const todaysMonthId = todaysMonth._id
  // console.log(todaysMonthId)

  if (schoolYear) {
    return (
      <Redirect to={{
        pathname: '/day',
        aboutProps: {
          sortedSchoolYear: { sortedSchoolYear, schoolYearId },
          todaysMonth: { todaysMonth, todaysMonthId }
        }
      }} />
    )
  }

  return (
    <div>
      {/* <h1>School Year</h1>
      <h4>{schoolYear.startYear} - {schoolYear.endYear}</h4>
      <div>{months}</div>
      <button onClick={destroy}>delete</button> */}
    </div>
  )
}

export default SchoolYear
