import React from 'react'

const DailyList = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>[Today&apos;s Date]</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
        </ul>
      </div>
      <button style={{ borderRadius: '25px' }}>+</button>
    </div>
  )
}

export default DailyList
