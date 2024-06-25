const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
