import React from 'react'
import { Redirect } from 'react-router-dom'
import { august, september } from '../../api/dayOfYear'

const DayOfYearCreate = props => {
  console.log('dayofyearcreate page')
  console.log(props)
  const { user, msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYear.schoolYearId
  const schoolYear = props.location.aboutProps.schoolYear.schoolYear
  // const num = 1

  for (let i = 1; i < 32; i++) {
    august(schoolYear, schoolYearId, user, i)
      .then(() => msgAlert({
        heading: 'August Days Created'
      }))
      .catch(error => console.log(error))
  }

  for (let i = 1; i < 31; i++) {
    september(schoolYear, schoolYearId, user, i)
      .then(() => msgAlert({
        heading: 'September Days Created'
      }))
      .catch(error => console.log(error))
  }

  return (
    <Redirect to={'/daysofyear'} />
  )
}

export default DayOfYearCreate
