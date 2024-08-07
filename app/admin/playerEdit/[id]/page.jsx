import React from "react";
import CreateUser from "@/app/(components)/userManagement/CreateUser";
import PlayerEdit from "@/app/(components)/players/PlayerEdit";

const BASE_URL = process.env.BASE_URL;

const getPlayerById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get player", error);
  }
};

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const PlayerEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";

  let playerData = {};
  let updatePlayerData = {};

  const events = await getEvents();

  if (EDITMODE) {
    playerData = await getPlayerById(params.id);
    updatePlayerData = playerData.foundPlayer;
    return <PlayerEdit player={updatePlayerData} events={events} />;
  } else {
    updatePlayerData = {
      _id: "new",
    };
    return <CreateUser events={events} />;
  }
};

export default PlayerEditPage;
