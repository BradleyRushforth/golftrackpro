import React from "react";
import Home from "../frontends/gtp-home/home";
import { StockYardages } from "../frontends/gtp-stock-yardages/stockYardages";
import Academy from "../frontends/gtp-academy/academy";
import Register from "../frontends/gtp-register/register";
import Login from "../frontends/gtp-login/login";
import ClubSettings from "../frontends/gtp-user-profile/pages/club-settings/club-settings";
import Profile from "../frontends/gtp-user-profile/profile";
import { Logout } from "../shared/Auth/components/logout";
import Courses from "../frontends/gtp-courses/courses";

const routes = [
  { path: "/", component: <Home />, exact: true },
  { path: "/stockyardages", component: <StockYardages /> },
  { path: "/courses", component: <Courses /> },
  { path: "/academy", component: <Academy /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/clubs", component: <ClubSettings /> },
  { path: "/profile", component: <Profile /> },
  { path: "/logout", component: <Logout /> },
];

export default routes;
