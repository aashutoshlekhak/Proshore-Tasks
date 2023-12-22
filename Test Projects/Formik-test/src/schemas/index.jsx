import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(5).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(7).required("pass han yar"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  //confirmPassword should match password so, it takes parameter oneOf: think of it as one of a kind.
  //then it takes a [] and reference ('password') which it value it should match with. Passowrd must match is the warning passed here
});
