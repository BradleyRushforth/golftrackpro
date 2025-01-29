import Home from "./frontends/gtp-home/home"
import Plans from "./frontends/gtp-stock-yardages/plans"



const routes = [
  {path: '/', component: <Home />, exact: true},
  {path: '/plans', component: <Plans />},
]

export default routes
