// src/components/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 text-green-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
