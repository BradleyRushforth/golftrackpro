import React from "react"
import { Handicap } from "../frontends/gtp-handicap/golfCourses/handicap"
import Home from "../frontends/gtp-home/home"
import { StockYardages } from "../frontends/gtp-stock-yardages/stockYardages"
import Academy from "../frontends/gtp-academy/academy"
import Clubs from "../frontends/gtp-user-profile/components/clubs"

const routes = [
  {path: '/', component: <Home />, exact: true},
  {path: '/stockyardages', component: <StockYardages />},
  {path: '/handicap', component: <Handicap />},
  {path: '/academy', component: <Academy />},
  {path: '/clubs', component: <Clubs />}
]

export default routes
