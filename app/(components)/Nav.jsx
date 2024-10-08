"use client";
import {
  faHome,
  faTicket,
  faListOl,
  faCalendar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavMobile = ({ players }) => {
  const { user } = useUser();

  const userRoles = user?.["https://multisport.games/roles"];
  // check to see if the user is an admin or commish
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const userSwitch = () => {
    if (user) {
      const player = players.find((player) => player.email === user.email);

      return (
        <div className="flex flex-row text-white">
          <div>
            <span className="pr-5 text-sm">
              <a
                href={`/players/${player.first_name}`}
              >{`${player.playerId}`}</a>
            </span>
          </div>
          <a
            href="/api/auth/logout"
            className="boarder-l-2 rounded-md bg-slate-700 p-1 text-sm"
          >
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div className="text-white">
          <a
            href="/api/auth/login"
            className="boarder-l-2 rounded-md bg-slate-700 p-1 text-sm"
          >
            Login
          </a>
        </div>
      );
    }
  };
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/standings/">
          <FontAwesomeIcon icon={faListOl} className="icon" />
        </Link>
        <Link href="/teams/">
          <FontAwesomeIcon icon={faUsers} className="icon" />
        </Link>
        <Link href="/admin/">
          {isAdmin && <FontAwesomeIcon icon={faTicket} className="icon" />}
        </Link>
        <Link href="/schedule/">
          <FontAwesomeIcon icon={faCalendar} className="icon" />
        </Link>
      </div>
      <div>{userSwitch()}</div>
    </nav>
  );
};

export default NavMobile;
