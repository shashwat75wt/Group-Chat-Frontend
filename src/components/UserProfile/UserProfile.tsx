import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordInput from "../passwordAlgo/passwordAlgo";
import { useLazyMeQuery, useUpdateUserMutation } from "../../services/api";
import { toast } from "react-toastify";

// Validation Schema
const validation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

// Correct type extraction from Yup schema
type FormData = yup.InferType<typeof validation>;

interface UserProfileProps {
  data: {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    role: string;
    imageUrl: string | null;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  const [fetchUser] = useLazyMeQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [avatarClicked, setAvatarClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      email: data.email,
      password: "",
      name: data.name,
    },
    resolver: yupResolver(validation),
  });

  // Handle profile update
  const handleUpdateProfile = async (updationData: FormData) => {
    const id = toast.loading("Updating profile...");
    const payload = { _id: data._id, ...updationData };

    try {
      await updateUser(payload).unwrap();
      await fetchUser().unwrap();
      toast.dismiss(id);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.dismiss(id);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="40vh"
      sx={{
        background: "linear-gradient(135deg, #5f6e8e, #2c3e50)",
        p: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          padding: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={3} justifyContent="center">
            {/* Profile Image */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <motion.div
                whileTap={{ scale: 1.2 }}
                animate={{ y: avatarClicked ? [0, -10, 0] : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={() => setAvatarClicked((prev) => !prev)}
                style={{ display: "inline-block" }}
              >
                <Avatar
                  src={
                    data.imageUrl ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${data?.name}`
                  }
                  alt="Profile"
                  sx={{
                    width: 60,
                    height: 60,
                    border: "5px solid rgba(255, 255, 255, 0.6)",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)",
                    cursor: "pointer",
                  }}
                />
              </motion.div>

              <Typography
                variant="h5"
                fontWeight={600}
                mt={2}
                sx={{
                  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {data.name}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                {data.email}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
                Role: {data.role}
              </Typography>
            </Grid>

            {/* Profile Update Form */}
            <Grid item xs={12}>
              <Box
                component="form"
                onSubmit={handleSubmit(handleUpdateProfile)}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
                      "&:hover fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiFormLabel-root": {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
                      "&:hover fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiFormLabel-root": {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
                      "&:hover fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiFormLabel-root": {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isDirty || !isValid || isLoading}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    background: "linear-gradient(to right, #A6FFCB)",
                    color: "black",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    textTransform: "none",
                    transition: "0.3s",
                    "&:hover": {
                      background: "linear-gradient(to right, rgb(1, 37, 17))",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
