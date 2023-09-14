import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import background from "../../assets/loginbackground.jpg";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { selectorIsAuth } from "../../components/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { changePasswordUser } from "../../components/redux/userSlice";
import { createTheme, ThemeProvider } from "@mui/material";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);
  const success = useSelector((state) => state.user.status === "isSuccess");
  const error = useSelector((state) => state.user.status === "isError");
  const errorMessage = useSelector((state) => state.user.data);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#139A43",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#0B5D1E",
      },
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(changePasswordUser(values));
    reset({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleBackButton = () => {
    if (isAuth) {
      const route = userData?.admin === true ? "/admin" : "/student";
      navigate(route);
    }
  };

  React.useEffect(() => {}, [success, error]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mb: 10 }}>
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Change password page
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="oldPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      size="small"
                      id="old-password"
                      label="Enter your password"
                      type="password"
                      autoComplete="current-password"
                      autoFocus
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="newPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "New password is required",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      size="small"
                      required
                      label="New password"
                      type="password"
                      autoComplete="current-password"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Confirm password is required",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      size="small"
                      required
                      label="Confirm new password"
                      type="password"
                      autoComplete="current-password"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    />
                  )}
                />
                {success ? (
                  <>
                    <Typography variant="body2">
                      Password successfully changed!
                    </Typography>
                    <Button variant="contained" onClick={handleBackButton}>
                      Back
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid}
                      sx={{
                        m: 1,
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                        },
                        size: "medium",
                      }}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ m: 2 }}
                      onClick={handleBackButton}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {error && (
                  <Typography color="error" variant="body2">
                    {errorMessage?.error}
                  </Typography>
                )}
                <Grid container align="center">
                  <Grid item xs></Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ChangePasswordPage;
