import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-md mx-auto p-4 ">
      <div className="text-center">
        <h1 className="text-2xl text-center font-bold">Welcome to the User Management App</h1>
        <Link to="/register" className="mt-4 inline-block text-blue-500 hover:underline">
          Register
        </Link>
        <Link to="/user" className="mt-4 ml-4 inline-block text-blue-500 hover:underline ">
          Go to User Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
