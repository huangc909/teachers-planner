import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CheckMark from './CheckMark'

const PreviousDay = props => {
  const { msgAlert } = props
  const currSchoolYear = props.location.aboutProps.schoolYearInfo.currSchoolYear
  const currSchoolYearId = props.location.aboutProps.schoolYearInfo.currSchoolYearId
  const currYear = props.location.aboutProps.yearInfo.currYear
  const currMonth = props.location.aboutProps.monthInfo.currMonth
  const currMonthName = props.location.aboutProps.monthInfo.currMonthName
  const currMonthId = props.location.aboutProps.monthInfo.currMonthId
  let currDate = props.location.aboutProps.dateInfo.currDate
  currDate -= 1
  let currDay = ''
  let currDayNumber = props.location.aboutProps.dayInfo.currDayNumber
  if (currDayNumber === 0) {
    currDayNumber = 6
  } else {
    currDayNumber -= 1
  }
  const currDateId = currMonth[currDate - 1]._id
  const nextDateId = currMonth[currDate]._id
  const prevDateId = currMonth[currDate - 2]._id

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  currDay = dayNumbers[currDayNumber]

  // const thirtyDayMonthNames = {
  //   0: 'April',
  //   1: 'June',
  //   2: 'September',
  //   3: 'November'
  // }
  //
  // const thirtyOneDayMonthNames = {
  //   0: 'January',
  //   1: 'March',
  //   2: 'May',
  //   3: 'July',
  //   4: 'August',
  //   5: 'October',
  //   6: 'December'
  // }

  const [previousDay, setPreviousDay] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}/months/${currMonthId}/days/${currDateId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setPreviousDay(res.data.day))
      .then(() => msgAlert({
        heading: 'Showing selected day to-do list',
        variant: 'primary'
      }))
      .catch(error => {
        // setDay({ day: '' })
        msgAlert({
          heading: 'Failed to show day' + error.message,
          variant: 'danger'
        })
      })
  }, [refresh])

  if (!previousDay) {
    return <p>Loading...</p>
  }

  const dailyTasks = previousDay.tasks.map(task => (
    <CheckMark
      {...props}
      key={task._id}
      task={task}
      currYear={currYear}
      currSchoolYear={currSchoolYear}
      currSchoolYearId={currSchoolYearId}
      currMonth={currMonth}
      currMonthName={currMonthName}
      currMonthId={currMonthId}
      currDate={currDate}
      currDay={currDay}
      currDateId={currDateId}
      currDayNumber={currDayNumber}
      taskId={task._id}
    />
  ))

  const destroy = (event) => {
    axios({
      url: `${apiUrl}/schoolYears/${currSchoolYearId}`,
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
        msgAlert({
          heading: 'Failed to delete' + error.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={'/home-page'} />
    )
  }

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h6>{currSchoolYear.startYear}-{currSchoolYear.endYear}</h6>
      <br />
      <h1>{currDay}</h1>
      <h2>{currMonthName} {currDate}, {currYear}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/previous-day/${prevDateId}`,
            aboutProps: {
              schoolYearInfo: { currSchoolYearId, currSchoolYear },
              yearInfo: { currYear },
              monthInfo: { currMonth, currMonthName, currMonthId },
              dateInfo: { currDate, currDateId },
              dayInfo: { currDay, currDayNumber }
            }
          }}>
            <button onClick={refreshPage} className="button-style">Previous Day</button>
          </Link>
        </div>
        <div style={{ margin: '10px' }}>
          {previousDay.length === 0 ? <div></div> : dailyTasks}
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={{
            pathname: `/next-day/${nextDateId}`,
            aboutProps: {
              schoolYearInfo: { currSchoolYearId, currSchoolYear },
              yearInfo: { currYear },
              monthInfo: { currMonth, currMonthName, currMonthId },
              dateInfo: { currDate, currDateId },
              dayInfo: { currDay, currDayNumber }
            }
          }}>
            <button className="button-style">Next Day</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={{
          pathname: '/task-create',
          aboutProps: {
            schoolYearInfo: { currSchoolYear, currSchoolYearId },
            yearInfo: { currYear },
            monthInfo: { currMonth, currMonthName, currMonthId },
            dateInfo: { currDate, currDateId },
            dayInfo: { currDay, currDayNumber }
          }
        }} >
          <button style={{ width: '30px', height: '30px', borderRadius: '25px' }}>+</button>
        </Link>
      </div>
      <br />
      <div>
        <button style={{ marginTop: '250px' }} className="button-style" onClick={destroy}>Delete School Year</button>
      </div>
    </div>
  )
}

export default PreviousDay
