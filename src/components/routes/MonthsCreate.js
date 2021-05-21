import React from 'react'
import { Redirect } from 'react-router-dom'
import { month } from '../../api/month'
import { day } from '../../api/day'

const MonthsCreate = props => {
  console.log(props)
  const { user, msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYear.schoolYearId
  const schoolYear = props.location.aboutProps.schoolYear.schoolYear

  const months = ['August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July']

  for (let i = 0; i < months.length; i++) {
    const monthName = months[i]
    if (monthName === 'February') {
      const year = parseInt(schoolYear.endYear)
      const leapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
      if (leapYear) {
        month(schoolYear, schoolYearId, monthName, user)
          .then(res => {
            const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
            let num = 0
            for (let i = 1; i < 30; i++) {
              num = i
              day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
            }
          })
          .then(() => msgAlert({
            heading: 'Calendar Created',
            variant: 'success'
          }))
          .catch(error => console.log(error))
      } else {
        month(schoolYear, schoolYearId, monthName, user)
          .then(res => {
            const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
            let num = 0
            for (let i = 1; i < 29; i++) {
              num = i
              day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
            }
          })
          .then(() => msgAlert({
            heading: 'Calendar Created',
            variant: 'success'
          }))
          .catch(error => console.log(error))
      }
    } else if (monthName === 'August' || monthName === 'October' || monthName === 'December' || monthName === 'January' || monthName === 'March' || monthName === 'May' || monthName === 'July') {
      month(schoolYear, schoolYearId, monthName, user)
        .then(res => {
          const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
          let num = 0
          for (let i = 1; i < 32; i++) {
            num = i
            day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
          }
        })
        .then(() => msgAlert({
          heading: 'Calendar Created',
          variant: 'success'
        }))
        .catch(error => console.log(error))
    } else {
      month(schoolYear, schoolYearId, monthName, user)
        .then(res => {
          const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
          let num = 0
          for (let i = 1; i < 31; i++) {
            num = i
            day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
          }
        })
        .then(() => msgAlert({
          heading: 'Calendar Created',
          variant: 'success'
        }))
        .catch(error => console.log(error))
    }
  }

  return (
    <Redirect to={`/schoolyears/${schoolYearId}`} />
  )
}

export default MonthsCreate
