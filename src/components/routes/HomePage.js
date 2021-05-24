import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from './../../apiConfig'

const HomePage = (props) => {
  const { msgAlert, user } = props
  const [schoolYears, setSchoolYears] = useState([])
  const [loading, setLoading] = useState(true)

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
      .then(setLoading(false))
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
      { loading ? <div>Loading...</div> : info }
    </div>
  )
}

export default HomePage
