import React from 'react'

const DaysOfYear = props => {
  const { schoolYear } = props
  console.log(props)

  const monthsJsx = schoolYear.map(month => (
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
