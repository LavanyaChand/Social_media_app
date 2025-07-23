import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "/assets/images/logo4.svg";
import logout from "/assets/icons/logout.svg";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import type { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {

    const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
  <nav className="leftsidebar flex flex-col justify-between h-screen">
    <div className="flex flex-col gap-11">
      <Link to="/" className="flex gap-3 items-center">
        <img src={logo} alt="logo" width={165} height={36} />
      </Link>

      <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="profile"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <p className="body-bold">{user.name}</p>
          <p className="small-regular text-light-3">@{user.username}</p>
        </div>
      </Link>

      <ul className="flex flex-col gap-2">
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`leftsidebar-link group ${
                isActive && "bg-primary-500"
              } `}
            >
              <NavLink
                to={link.route}
                className="flex items-center gap-4 p-2 md:p-2 lg:px-4 lg:py-3"
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${
                    isActive ? "invert-white" : ""
                  }`}
                />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>

    <Button
      variant="ghost"
      className="shad-button_ghost"
      onClick={() => signOut()}
    >
      <img src={logout} alt="logout" />
      <p className="small-medium lg:base-medium">Logout</p>
    </Button>
  </nav>
);

};

export default LeftSidebar;
