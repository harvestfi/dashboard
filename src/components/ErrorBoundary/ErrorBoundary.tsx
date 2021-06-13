import React, { ErrorInfo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { PATHS } from '@/routes'

type ErrorBoundaryProps = RouteComponentProps & {}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log('- - - ', { _error, _errorInfo })
    this.props.history.push(PATHS.main)
  }

  render() {
    return this.props.children
  }
}

export const ErrorBoundaryEnhanced = withRouter(ErrorBoundary)
