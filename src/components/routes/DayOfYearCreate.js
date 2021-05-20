import React from 'react'
import { Redirect } from 'react-router-dom'
import { august } from '../../api/dayOfYear'

const DayOfYearCreate = props => {
  console.log('dayofyearcreate page')
  console.log(props)
  const { user, msgAlert } = props
  const schoolYearId = props.location.aboutProps.schoolYearId.schoolYearId
  const schoolYear = props.location.aboutProps.schoolYearId.schoolYear
  const num = 1
  august(schoolYear, schoolYearId, user, num)
    .then(() => msgAlert({
      heading: 'August Days Created'
    }))
    .catch(error => console.log(error))

  return (
    <Redirect to={'/daysofyear'} />
  )
}

export default DayOfYearCreate
