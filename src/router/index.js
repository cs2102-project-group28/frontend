//Share components
import About from "@/components/about.vue";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import Home from "@/components/home.vue";

//Customers
import CustomerMain from "@/components/customers/CustomerMain.vue";
import Account from "@/components/customers/ViewAccount.vue";
import ViewOrder from "@/components/customers/ViewOrder.vue";
import Menu from "@/components/customers/Menu.vue";
import CheckOut from "@/components/customers/Checkout.vue";

//Staffs
import StaffSummary from "@/components/staffs/view_summary.vue"

//Riders
import RiderSummary from "@/components/riders/view_summary.vue"

//Manager
import ManagerSummary from "@/components/managers/view_summary.vue"

var routes_shared = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

const customer_base_url = "/customers/:username";

const routes_customers = [
  {
    path: customer_base_url,
    name: "main_customer",
    component: CustomerMain
  },
  {
    path: customer_base_url + "/:restaurant/menu",
    name: "menu",
    component: Menu
  },
  {
    path: customer_base_url + "/:restaurant/checkout",
    name: "checkout",
    component: CheckOut
  },
  {
    path: customer_base_url + "/view_account",
    name: "view_account",
    component: Account
  },
  {
    path: customer_base_url + "/view_order",
    name: "view_order",
    component: ViewOrder
  },
];

const staff_base_url = "/staffs/:username";
const routes_staffs = [
  {
    path: staff_base_url,
    name: "staff_summary",
    component: StaffSummary
  },
];

const manager_base_url = "/managers/:username";
const routes_managers = [
  {
    path: manager_base_url,
    name: "manager_summary",
    component: ManagerSummary
  },
];

const rider_base_url = "/riders/:username";
const routes_riders = [
  {
    path: rider_base_url,
    name: "rider_summary",
    component: RiderSummary
  },
];

const routes = routes_shared.concat(routes_customers, routes_managers, routes_riders, routes_staffs);

export default routes;
