"use client";

//Hooks / Packages
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { PlusCircle, TrashIcon } from "lucide-react";

let renderCount = 0;

export default function SignupForm() {
  // Value Type
  type SignupFormType = {
    username: string;
    email: string;
    password: string;
    socialMedia: {
      twitter: string;
      facebook: string;
    };
    phoneNumbers: { number: string }[];
    age: number;
    date: Date;
  };

  // Form
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
        phoneNumbers: [{ number: "" }],
        age: 0,
        date: new Date(),
      };
    },
  });

  // Dynamic Field
  const phoneNumberArray = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue
  } = form;

  const watchPassword = watch("password");

  const onSubmit = (data: SignupFormType) => {
    console.log('Submit: ',data);
  };

  const handleGetValue = () => {
   console.log("Get Value: ",getValues('username')) 
  };
  const handleSetValue = () => {
   console.log("Get Value: ",setValue('username','ali')) 
  };

  renderCount++;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-0.5 border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Sign Up {renderCount / 2}{" "}
        </h2>
        <p className="text-muted-foreground">
          Please fill out the form below to sign up.
        </p>
        <p className="text-muted-foreground">Password : {watchPassword}</p>
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
      {phoneNumberArray.fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex items-center justify-between">
            <label
              htmlFor={`phoneNumbers-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              {index === 0 ? "Primary " : "Secondary "} Phone Number
            </label>
            {index === 0 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => phoneNumberArray.append({ number: "" })}
                className="mt-4"
              >
                <PlusCircle />
              </Button>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              id={`phoneNumbers-${index}`}
              {...register(`phoneNumbers.${index}.number`, {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/,
                  message: "Invalid phone number",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {index !== 0 ? (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => phoneNumberArray.remove(index)}
                className="text-rose-800 hover:bg-rose-800 hover:text-white ml-4"
              >
                <TrashIcon />
              </Button>
            ) : null}
          </div>
          <small className="text-rose-500">
            {errors.phoneNumbers?.[index]?.number?.message}
          </small>
        </div>
      ))}

      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: "Age is required",
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">{errors.age?.message}</small>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register("date", {
            valueAsDate: true,
            required: "Date is required",
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <small className="text-rose-500">{errors.date?.message}</small>
      </div>

      <Button type="submit">Sign Up</Button>
      <Button onClick={handleGetValue} type='button' className="ml-4">Get Value</Button>
      <Button onClick={handleSetValue} type='button' className="ml-4">Set Value</Button>
      <DevTool control={control} />
    </form>
  );
}
