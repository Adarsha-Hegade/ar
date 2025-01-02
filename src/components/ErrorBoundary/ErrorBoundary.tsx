import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Something went wrong</h1>
          <p className="mb-8 text-gray-300">We're sorry, but something went wrong. Please try again.</p>
          <Link
            to="/"
            className="rounded-lg bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Go back home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}