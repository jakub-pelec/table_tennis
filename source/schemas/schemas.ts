import * as yup from 'yup';


export const registerSchema = yup.object().shape({
    username: yup.string().max(32, "Username exceeds 32 characters").required("Username is required"),
    email: yup.string().email().required("E-mail is required"),
    password: yup.string().min(6, "Password must contain at least 6 characters").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match").required("Confirm password")
});

export const loginSchema = yup.object().shape({
    email: yup.string().email().required("E-mail is required"),
    password: yup.string().min(6, "Password must contain at least 6 characters").required("Password is required"),
    keepLoggedIn: yup.bool()
})