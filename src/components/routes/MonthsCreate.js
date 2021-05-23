import React from 'react'
import { Redirect } from 'react-router-dom'
import { august, september, october, november, december, january, february, march, april, may, june, july } from '../../api/month'
// import { month } from '../../api/month'
import { day } from '../../api/day'

const MonthsCreate = props => {
  console.log(props)
  const { user, msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYear.schoolYearId
  const schoolYear = props.location.aboutProps.schoolYear.schoolYear

  august(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  september(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 31; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  october(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  november(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 31; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  december(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  january(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  const year = parseInt(schoolYear.endYear)
  const leapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  if (leapYear) {
    february(schoolYear, schoolYearId, user)
      .then(res => {
        const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
        let num = 0
        for (let i = 1; i < 30; i++) {
          num = i
          day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
        }
      })
      // .then(() => msgAlert({
      //   heading: 'Calendar Created',
      //   variant: 'success'
      // }))
      .catch(error => console.log(error))
  } else {
    february(schoolYear, schoolYearId, user)
      .then(res => {
        const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
        let num = 0
        for (let i = 1; i < 29; i++) {
          num = i
          day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
        }
      })
      // .then(() => msgAlert({
      //   heading: 'Calendar Created',
      //   variant: 'success'
      // }))
      .catch(error => console.log(error))
  }

  march(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  april(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 31; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  may(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 32; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  june(schoolYear, schoolYearId, user)
    .then(res => {
      const monthId = res.data.schoolYear.months[res.data.schoolYear.months.length - 1]._id
      let num = 0
      for (let i = 1; i < 31; i++) {
        num = i
        day(schoolYear, schoolYearId, monthId, num, user, msgAlert)
      }
    })
    // .then(() => msgAlert({
    //   heading: 'Calendar Created',
    //   variant: 'success'
    // }))
    .catch(error => console.log(error))

  july(schoolYear, schoolYearId, user)
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

  return (
    <Redirect to={`/schoolyears/${schoolYearId}`} />
  )
}

export default MonthsCreate
