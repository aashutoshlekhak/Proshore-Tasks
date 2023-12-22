import "./registration.css";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
//here in schemas we did not write /schemes/index.jsx because index denotes by default.

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Registration() {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: function (values) {
        console.log(values);
      },
    });

  return (
    <>
      <div className="registration-form-container">
        <h1>This is formik registration folder</h1>
        <form className="registration-form-form">
          <input
            name="name"
            placeholder="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <p>{errors.name}</p>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}

          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <p>{errors.password}</p>

          <input
            name="confirmPassword"
            type="password"
            placeholder="confirm-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          <p>{errors.confirmPassword}</p>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
