import React, { useEffect, useState } from "react";

import {
  Grid,
  Button,
  Typography,
} from "@mui/material";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import CreateRoomPage from "./CreateRoomPage";

export default function Room() {
  const { roomCode } = useParams();

  const navigate = useNavigate();

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getRoomDetails();
  }, []);

  function getRoomDetails() {
    fetch("/api/get_room?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          navigate("/");
        }

        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/api/leave_room", requestOptions)
      .then(() => {
        navigate("/");
      });
  }

  function renderSettings() {
    return (
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderSettingsButton() {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={3}
      style={{
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Grid item>
        <Typography variant="h3" component="h3">
          Code: {roomCode}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h5" component="h5">
          Votes: {votesToSkip}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h5" component="h5">
          Guest Can Pause: {guestCanPause ? "Yes" : "No"}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h5" component="h5">
          Host: {isHost ? "Yes" : "No"}
        </Typography>
      </Grid>

      {isHost && renderSettingsButton()}

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}