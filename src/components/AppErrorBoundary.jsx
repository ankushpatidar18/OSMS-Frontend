import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl text-red-700 font-bold mb-2">Something went wrong.</h2>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
