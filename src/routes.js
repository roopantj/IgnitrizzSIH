import Dashboard from "layouts/dashboard";

import { AiFillSignal } from "react-icons/ai";

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
];

export default routes;
