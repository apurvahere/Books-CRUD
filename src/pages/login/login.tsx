import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProps } from "../../context/PropsContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LogInValidationSchema } from "../../utils/validations";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useProps();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: typeof initialValues) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user: { email: string; password: string }) => user.email === values.email
    );

    if (user && user.password === values.password) {
      toast.success("Login successful!");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LogInValidationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border rounded border-gray-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full p-3 border rounded border-gray-300"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-3.5 mx-auto w-full flex gap-1 justify-center items-center">
          <span className="text-gray-700">Don't have an account?</span>
          <Link to="/register" className="hover:underline hover:text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
