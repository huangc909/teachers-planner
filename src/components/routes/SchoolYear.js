import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Months from './Months'
import Day from './Day'

const SchoolYear = props => {
  console.log(props)
  const [schoolYear, setSchoolYear] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${props.match.params.schoolYearId}`,
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

  const destroy = () => {
    axios({
      url: `${apiUrl}/schoolYears/${props.match.params.schoolYearId}`,
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
        setSchoolYear({ startYear: '' })
        msgAlert({
          heading: 'Failed to delete' + error.message,
          variant: 'danger'
        })
      })
  }
  if (!schoolYear) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect to={'/home-page'} />
    )
  }
  // const monthsJsx = schoolYear.months.sort((a, b) => a.number - b.number).map(month => (
  //   <li key={month._id}>
  //     <p>{month.month}</p>
  //   </li>
  // ))
  const months = (
    <Months
      schoolYear={schoolYear.months.sort((a, b) => a.number - b.number)}
    />
  )
  return (
    <div>
      <h1>School Year</h1>
      <h2>{schoolYear.startYear} - {schoolYear.endYear}</h2>
      <div>
        <Day/>
      </div>
      <div>{months}</div>
      <button onClick={destroy}>delete</button>
    </div>
  )
}

export default SchoolYear
