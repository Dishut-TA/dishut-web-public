const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-600 text-lg font-medium">
        Loading...
      </p>

      <p className="mt-2 text-sm text-gray-400">
        Please wait a moment
      </p>
    </div>
  );
};

export default LoadingScreen;