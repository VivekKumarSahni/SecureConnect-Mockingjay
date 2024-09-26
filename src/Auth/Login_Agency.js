import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { checkAgencyAsync, selectError, selectloggedInAgency } from './authSlice';

export default function Login_Agency() {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const agency = useSelector(selectloggedInAgency)
  // console.log(agency);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>
      {agency && <Navigate to='/myAgency' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log-In as Agency
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(
                checkAgencyAsync({ govtId: data.govtId, password: data.password })
              );
            })}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="govtId"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Gov ID
              </label>
              <div className="mt-2 ">
                <input
                  id="govtId"
                  {...register('govtId', {
                    required: 'govtId is required',
                    pattern: {
                      value:  /^\d+$/,
                      message: 'govtId not valid',
                    },
                  })}
                  type="string"
                  className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.govtId && (
                  <p className="text-red-500">{errors.govtId.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={'/forgot-password'}
                    className="font-semibold text-gray-600 hover:text-gray-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'password is required',
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                  <p className="text-red-500">{error.message}</p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/registerAgency"
              className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}