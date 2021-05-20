import React from 'react'

const SchoolYear = props => {
  const schoolYearStart = props.location.aboutProps.schoolYear.schoolYear.startYear

  const schoolYearEnd = props.location.aboutProps.schoolYear.schoolYear.endYear
  return (
    <div>
      <h1>{schoolYearStart} - {schoolYearEnd}</h1>
    </div>
  )
}

export default SchoolYear
