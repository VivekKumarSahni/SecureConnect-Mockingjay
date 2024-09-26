import React from "react";
import { useForm } from "react-hook-form";
import { registerAgencyAsync } from "./authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";


export default function RegisterUser() {

const {register,handleSubmit,formState:{errors}} =useForm();
const dispatch= useDispatch();

    
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <form
          noValidate
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(registerAgencyAsync(data));
              
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-1/4">
                  {" "}
                  <label
                    htmlFor="Full_Name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name:
                  </label>
                </div>
                <div className="w-3/4">
                  <input
                   type="text"
                   {...register("Full_Name",{
                    required : "Full Name is required"
                   })}
                   id="Full_Name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="w-1/4">
                  {" "}
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email:
                  </label>
                </div>
                <div className="w-3/4">
                  <input
                   type="email"
                   {...register("email",{
                    required : "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                      }
                   })}
                   id="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="w-1/4">
                  {" "}
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                </div>
                <div className="w-3/4">
                  <input
                   type="password"
                   {...register("password",{
                    required : "password is required",
                    pattern: {
                        value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                    },
                   })}
                   id="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

         



            <div>
              <div className="flex items-center justify-between">
                <div className="w-1/4">
                  {" "}
                  <label
                    htmlFor="mobileNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile No:
                  </label>
                </div>
                <div className="w-3/4">
                  <input
                   type="number"
                   {...register("mobileNo", {
                     required: "mobileNo is required",
                   })}
                   id="mobileNo"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{" "}
            <Link
              to={"/loginUser"}
              className="font-semibold leading-6 text-gray-900 hover:text-gray-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
