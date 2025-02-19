import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../../services/api";
import PasswordInput from "../passwordAlgo/passwordAlgo";
import { motion } from "framer-motion";

// Validation Schema using Yup
const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  name: yup.string().required("Name is required"),
});

// Custom styling with Material-UI's useStyles
const useStyle = (theme: any) =>
  createStyles({
    root: {
      maxWidth: 450,
      margin: "0 auto",
      padding: theme.spacing(3),
      boxShadow: theme.shadows[5],
      borderRadius: theme.shape.borderRadius,
    },
    input: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(3),
      transition: "transform 0.2s ease-in-out", // Hover effect on button
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    title: {
      textAlign: "center",
      fontWeight: 700,
      marginBottom: theme.spacing(2),
    },
  });

type FormData = typeof validation.__outputType;

export default function SignupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    const id = toast.loading("Registering...");
    try {
      await registerUser(data).unwrap();
      toast.dismiss(id);
      toast.success("User registered successfully!");
      navigate("/auth"); // Redirect to the login page after successful signup
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.dismiss(id);
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <Box
      sx={{
        background: "#f4f6f8", // Light background color for the page
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ width: "100%" }}
      >
        <Card variant="outlined" sx={style.root}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h4" sx={style.title}>
                <b>Create Account</b>
              </Typography>

              {isLoading && <LinearProgress sx={{ marginBottom: "20px" }} />}

              {/* Name Field with staggered effect */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  sx={style.input}
                  fullWidth
                  label="Full Name"
                  {...register("name")}
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                  variant="outlined"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <TextField
                  sx={style.input}
                  fullWidth
                  label="Email Address"
                  {...register("email")}
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  variant="outlined"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <PasswordInput
                  sx={style.input}
                  fullWidth
                  label="Password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <PasswordInput
                  sx={style.input}
                  fullWidth
                  label="Confirm Password"
                  error={Boolean(errors.confirmPassword?.message)}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </motion.div>

              {/* Submit Button with hover effect */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  sx={style.button}
                  variant="contained"
                  fullWidth
                  disabled={!isValid || isLoading}
                >
                  {isLoading ? "Creating Account..." : "Signup"}
                </Button>
              </motion.div>

              <Typography
                variant="body2"
                sx={{ marginTop: "20px", textAlign: "center" }}
              >
                Already have an account?{" "}
                <NavLink style={style.link as CSSProperties} to="/auth">
                  Sign in
                </NavLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <ToastContainer />
    </Box>
  );
}
