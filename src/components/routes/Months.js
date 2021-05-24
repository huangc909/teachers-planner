import React from 'react'

const DaysOfYear = props => {
  const { sortedSchoolYear } = props

  const monthsJsx = sortedSchoolYear.map(month => (
    <li key={month._id}>
      <p>{month.month}</p>
    </li>
  ))

  return (
    <div>
      DaysOfYear Page
      {monthsJsx}
    </div>
  )
}

export default DaysOfYear
