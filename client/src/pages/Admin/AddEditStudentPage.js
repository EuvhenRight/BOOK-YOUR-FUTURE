import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Container,
  Stack,
  Box,
} from "@mui/material";
import { CancelButton } from "../../components/Buttons/CancelButton";
import { Button } from "../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GroupDropdown from "../../components/Admin/AdminEvents/EventElements/GroupDropdown";

export default function AddEditStudentPage() {
  // const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = useMemo(() => pathname.includes("editStudent"), [pathname]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const { id } = useParams();
  const { performFetch: getUserDetails, error: errorDetails } = useFetch(
    `/user/${id}`,
    ({ userData }) => {
      // eslint-disable-next-line no-console

      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setGroupNumber(userData.group[0]?._id);
    }
  );

  useEffect(() => {
    isEdit && id && getUserDetails();
  }, [isEdit]);

  const { performFetch, error } = useFetch("/auth/register", () => {
    // eslint-disable-next-line no-console
    toast.success("Student added successfully");
    navigate("/students");
  });
  const { performFetch: updateUser, error: errorUpdateUser } = useFetch(
    `/user/edit/${id}`,
    () => {
      // eslint-disable-next-line no-console
      toast.success("Student updated successfully");
      navigate("/students");
    }
  );
  // eslint-disable-next-line no-console
  console.log(errorUpdateUser);
  // eslint-disable-next-line no-console
  console.log(error);
  // eslint-disable-next-line no-console
  console.log(errorDetails);
  // eslint-disable-next-line no-console
  console.log(groupNumber);

  const handleSave = (event) => {
    event.preventDefault();
    const usersData = {
      firstName: firstName,
      lastName: lastName,
      group: [groupNumber],
      email: email,
      ...(!isEdit && { password: "hsdkhdshdlash" }),
    };
    // eslint-disable-next-line no-console
    console.log(usersData);
    isEdit ? updateUser(usersData, "PATCH") : performFetch(usersData, "POST");
  };

  // if (!isAuth) {
  //   return navigate("/login");
  // }

  return (
    <form onSubmit={handleSave}>
      <Container maxWidth="md" sx={{ marginTop: "25px" }}>
        <Grid container spacing={3}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, mt: 6, textAlign: "center" }}
            >
              {isEdit ? "Edit Student" : "Add Student"}
            </Typography>
          </Box>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <GroupDropdown
                value={groupNumber}
                onChange={(event) => setGroupNumber(event.target.value)}
              />
            </Stack>
          </Grid>

          <Grid container justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              mt={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
              <CancelButton variant="outlined">Cancel</CancelButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
