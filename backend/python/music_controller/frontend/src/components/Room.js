import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomCode } = useParams();

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    getRoomDetails();
  }, []);

  function getRoomDetails() {
    fetch("/api/get_room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Room not found.");
        }

        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h3>{roomCode}</h3>

      <p>Votes to Skip: {votesToSkip}</p>

      <p>
        Guests can pause: {guestCanPause ? "Yes" : "No"}
      </p>

      <p>
        Is Host: {isHost ? "Yes" : "No"}
      </p>
    </div>
  );
}