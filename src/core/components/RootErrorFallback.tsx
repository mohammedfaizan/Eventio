import { ErrorFallbackProps, ErrorComponent } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    ) as unknown as React.ReactElement
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    ) as unknown as React.ReactElement
  }
}
