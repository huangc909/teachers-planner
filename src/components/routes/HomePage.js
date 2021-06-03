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

  const addYear = (
    <Link to={'/schoolyear-create'}>
      <button className="button-style">Add Year</button>
    </Link>
  )

  // Sort school years by startYear
  schoolYears.sort((a, b) => a.startYear - b.startYear)

  const years = schoolYears.map(schoolYear => (
    <div key={schoolYear._id} style={{ margin: '5px' }}>
      <Link to={`/schoolyears/${schoolYear._id}`}>
        <button style={{ height: '30px', width: '108px' }}>{schoolYear.startYear} - {schoolYear.endYear}</button>
      </Link>
    </div>
  ))

  const info = (
    <div>
      { years }
      <br />
      { addYear }
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>School Year</h1>
      { schoolYears.length === 0 ? <div>Loading...</div> : info }
    </div>
  )
}

export default HomePage
