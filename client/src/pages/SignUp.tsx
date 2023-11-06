import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const registrationSchema = Yup.object({
  username: Yup.string().min(2).max(20).required("Username field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email field is required"),
  password: Yup.string().min(6).required("password field is required"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:5050/api/v1/auth/signup",
            values
          );
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (error: any) {
          if (error.response) {
            toast.error(error.response.data.error.message); // Display specific error message from API
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
        action.resetForm();
      },
    });
  return (
    <>
      <section className=" mx-auto w-100 my-9">
        <div className="md:w-3/2 xl:w-1/3 lg:w-1/2 mx-auto px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#5775a5]">
            Fill out the given information to complete registration process
          </p>

          <form onSubmit={handleSubmit} className="gap-4">
            <div className="flex flex-col mb-6">
              <input
                className="p-3 mt-8 rounded-md outline-none border border-blue-800"
                type="text"
                name="username"
                placeholder="Enter Username Here"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <small className="text-red-500 mt-1 gap-4">
                  {errors.username}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col mb-6">
              <input
                className="p-3 rounded-md outline-none border border-blue-800"
                type="email"
                name="email"
                placeholder="Enter Email Here"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <small className="text-red-500 mt-1">{errors.email}</small>
              ) : null}
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  className="p-3 rounded-md border border-blue-800 w-full outline-none"
                  type="password"
                  name="password"
                  placeholder="Enter Password Here"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#002D74"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              {errors.password && touched.password ? (
                <small className="text-red-500 mt-1">{errors.password}</small>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-[#002D74] w-full rounded-md text-white py-3 hover:scale-105 duration-300"
            >
              {loading ? "Processing...." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border border-blue-800 py-3 w-full rounded-md mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-blue-800 py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link
              to="/sign-in"
              className="py-3 px-8 bg-white border border-blue-800 rounded-md hover:scale-110 duration-300"
            >
              Login
            </Link>
          </div>
        </div>
        <Toaster />
      </section>
    </>
  );
};

export default SignUp;
