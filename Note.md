# **Steps of the Project**

## **Packages**

```
bun i react-hook-form

bun i -D @hookform/devtools
```

## **1. Register Form & Fields**

```tsx
import { useForm } from "react-hook-form";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

<input id="name" {...register("name", { required: true })} />;
```

## **Do Form Submission**

```tsx

const { handleSubmit } = useForm<FormValuesType>();

const onSubmit = (data: FormValuesType) => {
    console.log(data);
}

<form onSubmit={handleSubmit(onSubmit)}>


```

## **2. Validation**

```tsx
  {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
```

## **2. Default Values**

```tsx
const form = useForm<SignupFormType>({
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
```

## **3. Array & Object & Dynamic fields**

add the types for array and object fields

```tsx
socialMedia: {
  twitter: string;
  facebook: string;
}
phoneNumbers: {
  number: string;
}
[];
```

naming the input:

```tsx
    <input
      name="socialMedia.facebook" //This line
      ...
    />

  <input
          name="phoneNumbers.0.number" //This line

      ...
    />


```

### **Creating a dynamic field**

```tsx
// Dynamic Field
const phoneNumberArray = useFieldArray({
  control: form.control,
  name: "phoneNumbers",
});
```

```tsx
 {phoneNumberArray.fields.map((field, index) => (
        <div key={field.id}>
         ...
      ))}
```

for adding or deleting fields:

```tsx
onClick={() => phoneNumberArray.remove(index)}

onClick={() => phoneNumberArray.append({ number: "" })}
```

## **4. Password watch and renderCount**

```tsx
const {
  watch,
  formState: { renderCount },
} = useForm();
const password = watch("password");
```

now you can use `password` variable to check the password value.
writing in password field will make the component to **rerender**.

## **5. Reset Form**

```tsx
const { reset } = useForm();
```

## **6. Disable Button Functionality**

```tsx
const {
  formState: { isSubmitting },
} = useForm();
```

## **7. Error Handling**

```tsx
const {
  formState: { errors },
} = useForm();
```

## **8. Touched and Dirty States**

```tsx
const {
  formState: { touchedFields, dirtyFields },
} = useForm();
```

## **9. Get and Set Values**

```tsx
const { setValue, getValues } = useForm();
```

## **10. Validation Mode**

```tsx
const form = useForm({
  ...
  /**
   * The validation mode determines when the validation is triggered.
   * There are 4 modes:
   * - "onChange": The validation is triggered on every single change of the form values.
   * - "onBlur": The validation is only triggered when the user leaves the input field (on blur).
   * - "onSubmit": The validation is only triggered when the user submits the form.
   * - "all": The validation is triggered on every change and on blur.
   */
  mode: "onChange",
});
```

## **10. Manually Trigger Validation**

```tsx
const { trigger } = useForm();

const onSubmit = async (data: FormValuesType) => {
  const errors = await trigger();
  console.log(errors);
};
```

