import { Box, CircularProgress, CssBaseline, Theme, Typography, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";
import Navbar from "../components/Navbar/Navbar";
import { useAppSelector } from "../store/store";
import { useMeQuery } from "../services/api";
import UserCards from "../components/sideBar/sideBar";

const useStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "lightgrey",
    height: '100vh',
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'white',
    },
  },
});

const Basic = () => {
  const theme = useTheme();
  const styles = useStyle(theme);

  const { user: data } = useAppSelector((state) => state.auth);
  
    const {
      isLoading,
    } = useMeQuery(undefined, { skip: !!data });
    //. !!null → false (query runs) 
    //. !!User → true (query skips)
  
    if (isLoading) {
      return (
        <Box
          width="100vw"
          padding={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      );
    }
  
    // this prevent the outlet from rendering if the user is not logged in
    // if (!data) {
    //   return (
    //     <Box
    //       width="100vw"
    //       padding={5}
    //       display="flex"
    //       justifyContent="center"
    //       alignItems="center"
    //     >
    //       <Typography variant="h6" textAlign="center" color="error">
    //         {" "}
    //         Failed to load. Please try again later.
    //       </Typography>
    //     </Box>
    //   );
    // }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  <CssBaseline />
  <Navbar />
  <Box display="flex" flex="1" width="100%">
    <UserCards />
    <Outlet />
  </Box>
</Box>

  );
};

export default Basic;
