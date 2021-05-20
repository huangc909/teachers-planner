import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
  return (
    <div>
      <h1>School Year</h1>
      <button onClick={destroy}>delete</button>
    </div>
  )
}

export default SchoolYear
