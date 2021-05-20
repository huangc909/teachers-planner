import React from 'react'
import { Link } from 'react-router-dom'

const SchoolYearForm = ({ schoolYear, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>Add School Year</h1>
    <label>Start Year</label>
    <div>
      <input
        placeholder="2021"
        value={schoolYear.startYear}
        name="startYear"
        onChange={handleChange}
        autoFocus
      />
    </div>
    <label>End Year</label>
    <div>
      <input
        placeholder="2022"
        value={schoolYear.endYear}
        name="endYear"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit">Continue</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default SchoolYearForm
