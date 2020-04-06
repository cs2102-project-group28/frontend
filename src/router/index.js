//Share components
import About from "@/components/about.vue";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import Home from "@/components/home.vue";

//Customers
import CustomerMain from "@/components/customers/CustomerMain.vue";
import Account from "@/components/customers/ViewAccount.vue";
import ViewOrder from "@/components/customers/ViewOrder.vue";
import ViewPromotion from "@/components/customers/ViewPromotion.vue";
import Menu from "@/components/customers/Menu.vue";
import PlaceOrder from "@/components/customers/PlaceOrder.vue";
import CheckOut from "@/components/customers/Checkout.vue";

//Staffs
// import StaffMain from "../components/staffs/main.vue"
// import StaffMenu from "../components/staffs/view_menu.vue"
// import StaffEditMenu from "../components/staffs/edit_menu.vue"
// import StaffOrders from "../components/staffs/view_orders.vue"
// import StaffPromotion from "../components/staffs/view_promotions.vue"
// import StaffEditPromotion from "../components/staffs/edit_promotions.vue"

// //Riders
// import RiderMain from "../components/riders/main.vue"

// //Manager
// import ManagerMain from "../components/managers/main.vue"

var routes_shared = [
  {
    path: "/",
    redirect: {
      name: "home",
      component: Home
    }
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
    path: customer_base_url + "/:restaurant/order",
    name: "place_order",
    component: PlaceOrder
  },
  {
    path: customer_base_url + ":restaurant/checkout",
    name: "checkout",
    component: CheckOut
  },
  {
    path: customer_base_url + "/account",
    name: "view_account",
    component: Account
  },
  {
    path: customer_base_url + "/order",
    name: "view_order",
    component: ViewOrder
  },
  {
    path: customer_base_url + "/promotion",
    name: "view_promotion",
    component: ViewPromotion
  }
];

// staff_base_url = "/staffs/:uid";
// const routes_staffs = [
//   {
//     path: staff_base_url,
//     name: "main_staff",
//     component: StaffMain
//   },
//   {
//     path: staff_base_url + "/:rid/orders",
//     name: "orders_staff",
//     component: StaffOrders
//   },
//   {
//     path: staff_base_url + "/:rid/menu",
//     name: "menu_staff",
//     component: StaffMenu
//   },
//   {
//     path: staff_base_url + "/:rid/menu/edit",
//     name: "edit_menu",
//     component: StaffEditMenu
//   },
//   {
//     path: staff_base_url + "/:rid/promotion",
//     name: "promotions_staff",
//     component: StaffPromotion
//   },
//   {
//     path: staff_base_url + "/:rid/promotion",
//     name: "edit_promotions",
//     component: StaffEditPromotion
//   },
// ];

// manager_base_url = "/managers/:uid";
// const routes_staffs = [
//   {
//     path: manager_base_url,
//     name: "main_manager",
//     component: ManagerMain
//   },
// ];

// rider_base_url = "/riders/:uid";
// const routes_riders = [
//   {
//     path: rider_base_url,
//     name: "main_rider",
//     component: RiderMain
//   },
// ];

const routes = routes_shared.concat(routes_customers); //, routes_staffs, routes_managers, routes_riders);

export default routes;
