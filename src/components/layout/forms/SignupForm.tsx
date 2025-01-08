"use client";

//Hooks / Packages
import React, { useEffect } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  // Zod Schema
  const schema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required")
      .refine(
        async (value) => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?email=${value}`
          );

          const data = await response.json();
          return data.length === 0;
        },
        {
          message: "Email is already taken",
        }
      ),
    password: z.string().min(1, "Password is required"),
    socialMedia: z.object({
      twitter: z.string(),
      facebook: z.string(),
    }),
    phoneNumbers: z
      .array(
        z.object({ number: z.string().min(1, "Phone number is required") })
      )
      .min(1, "At least one phone number is required"),
    age: z.number().int("Age must be an integer").min(1, "Age is required"),
    date: z.date().min(new Date(1600, 1, 1), "Date is required"),
  });

  // Form
  const form = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        username: "testusername",
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
    formState: {
      errors,
      // isValid,
      isSubmitting,
      isLoading,
      isDirty,
      isSubmitSuccessful,
    },
    watch,
    getValues,
    setValue,

    reset,
  } = form;

  const watchPassword = watch("password");

  const onSubmit = async (data: SignupFormType) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Submit: ", data);
  };
  const onError = (error: FieldErrors<SignupFormType>) => {
    console.log("Erros: ", error);
  };

  const handleGetValue = () => {
    console.log("Get Value: ", getValues("username"));
  };
  const handleSetValue = () => {
    console.log(
      "Get Value: ",
      setValue("username", "ali", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    );
  };

  renderCount++;

  // On Successful Submit Reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  console.log(errors.email?.message);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="space-y-0.5 border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Sign Up{" "}
          {process.env.NODE_ENV === "development" ? renderCount / 2 : ""}{" "}
        </h2>
        <p className="text-muted-foreground">
          Please fill out the form below to sign up.
        </p>
        <p className="text-muted-foreground">
          Password is watched: {watchPassword}
        </p>
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-primary "
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username")}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.username ? "border-rose-500" : "border-gray-300"
          }`}
        />
        <small className="text-rose-500">{errors.username?.message}</small>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-primary"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.email ? "border-rose-500" : "border-gray-300"
          }`}
        />

        {errors.email?.message && (
          <small className="text-rose-500">{errors.email.message}</small>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-primary"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.password ? "border-rose-500" : "border-gray-300"
          }`}
        />
        <small className="text-rose-500">{errors.password?.message}</small>
      </div>
      <div>
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-primary"
        >
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          {...register("socialMedia.twitter")}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.socialMedia?.twitter ? "border-rose-500" : "border-gray-300"
          }`}
        />
      </div>
      <div>
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-primary"
        >
          Facebook
        </label>
        <input
          type="text"
          id="facebook"
          {...register("socialMedia.facebook")}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.socialMedia?.facebook ? "border-rose-500" : "border-gray-300"
          }`}
        />
      </div>
      {phoneNumberArray.fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex items-center justify-between">
            <label
              htmlFor={`phoneNumbers-${index}`}
              className="block text-sm font-medium text-primary"
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
              {...register(`phoneNumbers.${index}.number`)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                errors.phoneNumbers?.[index]?.number
                  ? "border-rose-500"
                  : "border-gray-300"
              }`}
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
        <label htmlFor="age" className="block text-sm font-medium text-primary">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register("age", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.age ? "border-rose-500" : "border-gray-300"
          }`}
        />
        <small className="text-rose-500">{errors.age?.message}</small>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-primary"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register("date", { valueAsDate: true })}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
            errors.date ? "border-rose-500" : "border-gray-300"
          }`}
        />

        <small className="text-rose-500">{errors.date?.message}</small>
      </div>

      <div className="space-x-4 w-full flex ">
        <Button type="submit" disabled={!isDirty || isLoading || isSubmitting}>
          Sign Up
        </Button>
        <Button type="reset" title="Type Reset">
          Empty All
        </Button>
        <Button
          type="button"
          onClick={() => {
            reset();
          }}
          title="Reset Function"
        >
          Reset
        </Button>
        <Button onClick={handleGetValue} type="button">
          Get Value
        </Button>
        <Button onClick={handleSetValue} type="button">
          Set Value
        </Button>
      </div>
      <DevTool control={control} />
    </form>
  );
}
