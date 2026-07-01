import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-[#111827] mb-2">Oops, something went wrong!</h2>
            <p className="text-[#4b5563] text-sm mb-4">
              We couldn't load this page. Please check your internet connection or try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#171717] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#262626] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
