import React from 'react'

const DaysOfYear = props => {
  console.log(props)
  const schoolYear = props.location.aboutProps.schoolYear.schoolYear

  const days = []
  for (let i = 1; i < 32; i++) {
    days.push(`August ${i}, ${schoolYear.startYear} 00:00:0000`)
  }
  console.log(days)
  return (
    <div>
      DaysOfYear Page
    </div>
  )
}

export default DaysOfYear
