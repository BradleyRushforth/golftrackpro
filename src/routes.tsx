import Home from "./frontends/home/home"
import Plans from "./frontends/plans/plans"


const routes = [
  {path: '/', component: <Home />, exact: true},
  {path: '/plans', component: <Plans />},
]

export default routes
