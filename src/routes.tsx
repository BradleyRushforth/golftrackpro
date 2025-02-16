import { Handicap } from "./frontends/gtp-handicap/golfCourses/handicap"
import Home from "./frontends/gtp-home/home"
import { StockYardages } from "./frontends/gtp-stock-yardages/stockYardages"

const routes = [
  {path: '/', component: <Home />, exact: true},
  {path: '/stockyardages', component: <StockYardages />},
  {path: '/handicap', component: <Handicap />},
  {path: '/academy', component: <Handicap />},
]

export default routes
