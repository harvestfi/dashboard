import React from 'react'

const Tabs = ({ children, className, ...otherProps }) => {
  return (
    <div
      className={`harvest-tabs-container ${className || ''}`}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Tabs
