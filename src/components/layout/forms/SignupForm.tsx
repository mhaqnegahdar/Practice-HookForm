"use client";

//Hooks / Packages
import React from "react";
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";

export default function SignupForm() {
  type SignupFormType = {
    username: string;
    email: string;
    password: string;
    socialMedia: {
      twitter: string;
      facebook: string;
    };
    phoneNumbers: string[];
  };

  const form = useForm<SignupFormType>({
    defaultValues: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        username: "mhaqnegahdar",
        email: "",
        password: "",
        socialMedia: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
      };
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: SignupFormType) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-0.5 border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Sign Up </h2>
        <p className="text-muted-foreground">
          Please fill out the form below to sign up.
        </p>
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">{errors.username?.message}</small>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">{errors.email?.message}</small>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">{errors.password?.message}</small>
      </div>
      <div>
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          {...register("socialMedia.twitter")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-700"
        >
          Facebook
        </label>
        <input
          type="text"
          id="facebook"
          {...register("socialMedia.facebook")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Primary Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register("phoneNumbers.0", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/,
              message: "Invalid phone number",
            },
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">
          {errors.phoneNumbers?.[0]?.message}
        </small>
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Secondary Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register("phoneNumbers.1")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <Button type="submit">Sign Up</Button>
      <DevTool control={control} />
    </form>
  );
}
