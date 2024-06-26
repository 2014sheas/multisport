"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const GameView = ({ teams, game }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const homeTeam = teams.find((team) => team.teamId === game.homeTeam);
  const awayTeam = teams.find((team) => team.teamId === game.awayTeam);
  const hasHomeTeam = homeTeam ? true : false;
  const hasAwayTeam = awayTeam ? true : false;
  const hasTeams = hasHomeTeam && hasAwayTeam;

  const onEdit = () => {
    router.push(`/games/editGame/${game.gameId}`);
  };

  const homeScoreSwitch = (status) => {
    switch (status) {
      case "In Progress":
        return <label>{game.homeScore}</label>;
      case "Completed":
        return <label>{game.homeScore}</label>;
      default:
        return <label>0</label>;
    }
  };

  const awayScoreSwitch = (status) => {
    switch (status) {
      case "In Progress":
        return <label>{game.awayScore}</label>;
      case "Completed":
        return <label>{game.awayScore}</label>;
      default:
        return <label>0</label>;
    }
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-lg bg-slate-900 w-3/5">
      <h2> {game.status}</h2>
      <div className="flex flex-row  justify-between w-1/2">
        <div className="flex flex-col items-center w-1/2">
          <label>{hasHomeTeam ? homeTeam.name : `${game.homeTeam})`}</label>
          {homeScoreSwitch(game.status)}
        </div>
        <div className="flex flex-col items-center w-1/2">
          <label>{hasAwayTeam ? awayTeam.name : `(${game.awayTeam})`}</label>
          {awayScoreSwitch(game.status)}
        </div>
      </div>
      {isAdmin && <button onClick={onEdit}>Edit Game</button>}
    </div>
  );
};

export default GameView;
