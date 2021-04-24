import React from 'react'

export default function Button({ children, size = 'medium', ...otherProps }) {
  const className = `button button-${size}`
  return (
    <button className={className} type="button" {...otherProps}>
      {children}
    </button>
  )
}
