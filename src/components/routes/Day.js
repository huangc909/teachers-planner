import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const Day = (props) => {
  const { msgAlert } = props
  console.log(props)
  const schoolYearId = props.match.params.schoolYearId
  const monthId = props.match.params.monthId
  const dayId = props.match.params.dayId
  const date = props.location.aboutProps.date.date

  const [day, setDay] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${schoolYearId}/months/${monthId}/days/${dayId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing selected school year',
        variant: 'primary'
      }))
      .catch(error => {
        // setDay({ day: '' })
        msgAlert({
          heading: 'Failed to show day' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  if (!day) {
    return <p>Loading...</p>
  }
  console.log(day)
  const dailyTasks = day.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      schoolYearId={schoolYearId}
      monthId={monthId}
      dayId={dayId}
    />
  ))

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{date}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <button>Previous Day</button>
        </div>
        <div style={{ margin: '10px' }}>
          {dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <button>Next Day</button>
        </div>
      </div>
      <Link to={{
        pathname: '/task-create',
        aboutProps: {
          schoolYearId: { schoolYearId },
          monthId: { monthId },
          dayId: { dayId }
        }
      }} >
        <button style={{ borderRadius: '25px' }}>+</button>
      </Link>
    </div>
  )
}

export default Day
