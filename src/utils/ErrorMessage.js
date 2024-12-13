export const ErrorMessage = (error) => {
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }
  
    const { data } = error.response;
  
    // Check for status and detailed error messages
    if (data && data.error) {
      const { error: errorDetails, message, stack } = data;
  
      // Check for specific validation error message
      if (message) {
        return `Error: ${message}`;
      }
  
      // Check for error object with statusCode, status, and isOperational
      if (errorDetails && errorDetails.statusCode && errorDetails.status && errorDetails.isOperational) {
        return `Error: ${message || 'An operational error occurred.'} (Status: ${errorDetails.statusCode}, Status: ${errorDetails.status})`;
      }
  
      // Check for MongoDB duplicate key error (E11000)
      if (errorDetails.errorResponse) {
        const { code, keyValue } = errorDetails.errorResponse;
  
        if (code === 11000) {
          const fieldName = Object.keys(keyValue)[0];
          const fieldValue = keyValue[fieldName];
          return `Error: The ${fieldName} '${fieldValue}' already exists.`;
        }
      }
    }
  
    // Generic error message
    if (data && typeof data.message === 'string') {
      return `Error: ${data.message}`;
    }
  
    // Fallback message
    return 'An unexpected error occurred. Please try again.';
  };
  