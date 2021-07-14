import React from 'react'
const NotAuthorized = () => {
  localStorage.clear()
  return (
    <div>
      <h1>you are Not Authorized</h1>
    </div>
  )
}

export default NotAuthorized
