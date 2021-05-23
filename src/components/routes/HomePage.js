import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'

const HomePage = (props) => {
  const { msgAlert, user } = props
  const [schoolYears, setSchoolYears] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => {
        setSchoolYears(res.data.schoolYears)
      })
      .then(() => msgAlert({
        heading: 'Showing all school years',
        variant: 'success'
      }))
      .catch(error => {
        setSchoolYears([])
        msgAlert({
          heading: 'Failed to show all school years' + error.message,
          variant: 'danger'
        })
      })
  }, [])
  console.log(schoolYears)
  const addYear = (
    <Link to={'/schoolyear-create'}>
      <button style={{ borderRadius: '25px' }}>Add Year</button>
    </Link>
  )

  const years = schoolYears.map(schoolYear => (
    <div key={schoolYear._id}>
      <Link to={`/schoolyears/${schoolYear._id}`}>
        <button>{schoolYear.startYear} - {schoolYear.endYear}</button>
      </Link>
    </div>
  ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>School Year</h1>
      { years }
      { addYear }
    </div>
  )
}

export default HomePage
