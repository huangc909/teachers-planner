import React from 'react'
import { Link } from 'react-router-dom'

const TaskForm = ({ task, onPriority, onCompletion, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>Add Task</h1>
    <label>Name</label>
    <div>
      <input
        placeholder="Grade math homework"
        value={task.name}
        name="name"
        type="text"
        onChange={handleChange}
        autoFocus
      />
    </div>
    <label>Notes</label>
    <div>
      <input
        placeholder="Week 1"
        value={task.note}
        name="note"
        onChange={handleChange}
        type="text"
        rows="3"
        cols="50"
      />
    </div>
    <br />
    <label>Due Date</label>
    <div>
      <input
        value={task.dueDate}
        name="dueDate"
        onChange={handleChange}
        type="datetime-local"
      />
    </div>
    <br />
    <label>Priority Item</label>
    <div>
      <input
        value={task.priority}
        name="priority"
        onChange={onPriority}
        type="checkbox"
      />
    </div>
    <br />
    <label>Completed</label>
    <div>
      <input
        value={task.checkmark}
        name="checkmark"
        onChange={onCompletion}
        type="checkbox"
      />
    </div>
    <br />
    <button className="button-style" type="submit">Add</button>
    <Link to={cancelPath}>
      <button className="button-style">Cancel</button>
    </Link>
  </form>
)

export default TaskForm
