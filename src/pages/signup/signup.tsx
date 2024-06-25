import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useProps } from "../../context/PropsContext";
import { SignUpValidationSchema } from "../../utils/validations";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useProps();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<SignupFormValues>
  ) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (user: { email: string }) => user.email === values.email
    );

    if (userExists) {
      toast.error("User is already registered");
    } else {
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User registered successfully");
      resetForm();
      navigate("/login");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpValidationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border rounded border-gray-300"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full p-3 border rounded border-gray-300"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-3.5 mx-auto w-full flex gap-1 justify-center items-center">
          <span className="text-gray-700">Already have an account?</span>
          <Link to="/login" className="hover:underline hover:text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
