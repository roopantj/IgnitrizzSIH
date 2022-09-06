import Dashboard from "layouts/dashboard";
import Approach from "layouts/approach";
import { AiFillSignal } from "react-icons/ai";
import { HiLightBulb } from "react-icons/hi";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <AiFillSignal size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Approach",
    key: "approach",
    route: "/approach",
    icon: <HiLightBulb size="15px" color="inherit" />,
    component: Approach,
    noCollapse: true,
  },
];

export default routes;
