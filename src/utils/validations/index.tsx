import * as Yup from "yup";

export const LogInValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignUpValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const AddOrEditBookDetailsValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  author: Yup.string().trim().required("Author is required"),
  year: Yup.number()
    .integer("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear(), "Year must be the current year or earlier")
    .required("Year is required"),
  genres: Yup.array()
    .of(Yup.string().trim().required("Genre is required"))
    .test("uniqueGenres", "Genres must be unique", (genres) => {
      return genres!.length === new Set(genres).size;
    })
    .min(1, "At least one genre is required")
    .required("Genres are required"),
});
