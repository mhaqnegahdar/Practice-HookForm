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
