import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import SchoolYearForm from './../shared/SchoolYearForm'

const SchoolYearCreate = props => {
  const { user, msgAlert } = props
  console.log('User Token: ', user.token)
  const [schoolYear, setSchoolYear] = useState({
    startYear: '',
    endYear: ''
  })
  const [schoolYearId, setSchoolYearId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedSchoolYear = Object.assign({}, schoolYear, updatedField)
    setSchoolYear(editedSchoolYear)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(schoolYear)
    axios({
      url: `${apiUrl}/schoolYears`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { schoolYear }
    })
      .then(res => setSchoolYearId(res.data.schoolYear._id))
      .then(() => msgAlert({
        heading: 'Successfully created school year',
        variant: 'success'
      }))
      .catch(error => {
        setSchoolYear({ startYear: '', endYear: '' })
        msgAlert({
          heading: 'Failed to create school year. It may already have been created. Please check again. ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (schoolYearId) {
    return <Redirect to={{
      pathname: '/monthsofyear-create',
      aboutProps: {
        schoolYear: { schoolYear, schoolYearId }
      }
    }} />
  }

  return (
    <div>
      <SchoolYearForm
        schoolYear={schoolYear}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/home-page'
      />
    </div>
  )
}

export default SchoolYearCreate
