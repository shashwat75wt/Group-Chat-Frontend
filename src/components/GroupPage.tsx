import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useCreateGroupMutation } from "../services/api";


// Define form schema using Yup
const groupSchema = yup.object().shape({
  name: yup.string().required("Group name is required").min(3, "Minimum 3 characters"),
  type: yup.string().oneOf(["public", "private"], "Invalid type").required("Please select a group type"),
});

// Define TypeScript types for form fields
interface GroupFormData {
  name: string;
  type: "public" | "private";
}

const GroupPage = () => {
  // Initialize React Hook Form with validation schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: yupResolver(groupSchema),
  });

  const [createGroup, { isLoading }] = useCreateGroupMutation();

  // Handle form submission
  const onSubmit = async (data: GroupFormData) => {
    try {
      const res = await createGroup(data).unwrap();
      console.log("Group created successfully:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 5,
        backgroundColor: "#fff", // Neutral background
        textAlign: "center",
        color: "#333", // Dark text for readability
      }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: "2rem", color: "#2D3E50" }}>
        Create Your Group
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Group Name Input */}
        <FormControl fullWidth margin="normal">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Group Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  backgroundColor: "#f7f7f7", // Light background for inputs
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover fieldset": {
                      borderColor: "#2D3E50", // Hover effect with primary color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3D5A80", // Focused color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#2D3E50", // Label color
                  },
                }}
              />
            )}
          />
        </FormControl>

        {/* Group Type Selection (Public/Private) */}
        <FormControl component="fieldset" error={!!errors.type} margin="normal">
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#3D5A80" }}>
            Group Type
          </Typography>
          <Controller
            name="type"
            control={control}
            defaultValue="public"
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="public"
                  control={<Radio sx={{ color: "#2D3E50" }} />}
                  label="Public"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio sx={{ color: "#3D5A80" }} />}
                  label="Private"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            padding: "12px 16px",
            borderRadius: 5,
            backgroundColor: "#2D3E50", // Primary color for button
            fontSize: "16px",
            textTransform: "none",
            boxShadow: 4,
            "&:hover": {
              backgroundColor: "#3D5A80", // Hover effect with secondary color
              boxShadow: 8,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <Typography sx={{ fontWeight: 600 }}>Create Group</Typography>
          )}
        </Button>

        {/* Icon for visual appeal */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#f7f7f7", // Light background for the icon
            borderRadius: "50%",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#2D3E50",
              transform: "scale(1.1)",
            },
          }}
        >
          {/* <AddCircle sx={{ fontSize: 40, color: "#2D3E50" }} /> */}
        </IconButton>
      </form>
    </Box>
  );
};

export default GroupPage;
