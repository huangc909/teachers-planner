import React from 'react'
import { Redirect } from 'react-router-dom'
import { august, september } from '../../api/monthOfYear'

const DayOfYearCreate = props => {
  console.log('dayofyearcreate page')
  console.log(props)
  const { user, msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYear.schoolYearId
  const schoolYear = props.location.aboutProps.schoolYear.schoolYear
  // const num = 1

  august(schoolYear, schoolYearId, user)
    .then(() => msgAlert({
      heading: 'August Created'
    }))
    .catch(error => console.log(error))

  september(schoolYear, schoolYearId, user)
    .then(() => msgAlert({
      heading: 'September Created'
    }))
    .catch(error => console.log(error))

  return (
    <Redirect to={'/monthsofyear'} />
  )
}

export default DayOfYearCreate
