import React, { useState } from "react";

import {
  Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse, Alert,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomPage(props) {
  const navigate = useNavigate();

  const {
    votesToSkip = 2,
    guestCanPause = true,
    update = false,
    roomCode = null,
    updateCallback = () => {},
  } = props;

  const [guestCanPauseState, setGuestCanPauseState] =
    useState(guestCanPause);

  const [votesToSkipState, setVotesToSkipState] =
    useState(votesToSkip);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleVotesChange(e) {
    setVotesToSkipState(e.target.value);
  }

  function handleGuestCanPauseChange(e) {
    setGuestCanPauseState(e.target.value === "true");
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
      }),
    };

    fetch("/api/create_room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate("/room/" + data.code);
      });
  }

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
        code: roomCode,
      }),
    };

    fetch("/api/update_room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room updated successfully!");
          setErrorMsg("");
        } else {
          setErrorMsg("Error updating room...");
          setSuccessMsg("");
        }

        updateCallback();
      });
  }

  function renderCreateButtons() {
    return (
      <Grid container spacing={2} direction="column">
        <Grid item align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>

        <Grid item align="center">
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderUpdateButtons() {
    return (
      <Grid item align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  const title = update ? "Update Room" : "Create A Room";

  return (
    <Grid
  container
  spacing={3}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{
    textAlign: "center",
  }}
>
      <Grid item xs={12}>
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert
              severity="success"
              onClose={() => setSuccessMsg("")}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => setErrorMsg("")}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText>
            Guest Control of Playback State
          </FormHelperText>

          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />

            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          <TextField
            required
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkipState}
            inputProps={{
              min: 1,
              style: {
                textAlign: "center",
              },
            }}
          />

          <FormHelperText>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>

      {update
        ? renderUpdateButtons()
        : renderCreateButtons()}
    </Grid>
  );
}