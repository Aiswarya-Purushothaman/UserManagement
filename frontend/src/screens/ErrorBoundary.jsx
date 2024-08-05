import React, { useState } from 'react';
import ErrorPage from  '../components/Errorpage';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleOnError = (error, errorInfo) => {
    
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    setHasError(true);
  };

  return hasError ? <ErrorPage /> : <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;
