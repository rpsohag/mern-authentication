import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}

const registrationSchema = Yup.object({
  username: Yup.string().min(2).max(20).required("Username field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email field is required"),
  password: Yup.string().min(6).required("password field is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResponse = (response: any) => {
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/sign-in");
    } else {
      toast.error(response.data.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const response = await axios.post<ResponseData>(
            "http://localhost:5050/api/v1/auth/signup",
            values
          );
          handleResponse(response);
        } catch (error: any) {
          if (error.response) {
            toast.error(error.response.data.error.message);
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
          <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
          <p className="text-xs mt-4 text-[#5775a5]">
            Fill out the given information to complete sign up process
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
