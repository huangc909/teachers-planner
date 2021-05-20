import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h2>Teacher&apos;s Planner</h2>
      <div style={{ width: '275px' }}>
        <p>Create to-do lists for all of your planning, classes, and school events<br /> to stay organized throughout the school year.</p>
      </div>
      <br />
      <Link to={'/sign-up'}>
        <button style={{ borderRadius: '10px', width: '300px', margin: '5px' }}>Create Account</button>
      </Link>
      <Link to={'/sign-in'}>
        <button style={{ borderRadius: '10px', width: '300px' }}>Sign In</button>
      </Link>
    </div>
  )
}

export default LandingPage
