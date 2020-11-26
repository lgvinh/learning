import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
// import Maps from "views/Maps.jsx";
import Brand from "views/Brand/Brand.jsx";
import Size from "views/Size/Size.jsx";
import AddSize from "views/Size/AddSize.jsx";
import SizeDetail from "views/Size/SizeDetail.jsx";
import AddProducer from "views/Producer/AddProducer.jsx";
import AddBrand from "views/Brand/AddBrand.jsx";
import BrandDetail from "views/Brand/BrandDetail.jsx";
import Order from "views/Order/Order.jsx";
import OrderDetail from "views/Order/OrderDetail.jsx";
import User from "views/User/User.jsx";
import UserDetail from "views/User/UserDetail.jsx";
import Transaction from "views/Transaction/Transaction.jsx";
import AddTransaction from "views/Transaction/AddTransaction.jsx";
import TransactionDetail from "views/Transaction/TransactionDetail.jsx";
import Perfume from "views/Perfume/Perfume.jsx";
import AddPerfume from "views/Perfume/AddPerfume.jsx";
import AddPerfumeSize from "views/Perfume/AddPerfumeSize.jsx";
import PerfumeDetail from "views/Perfume/PerfumeDetail.jsx";
import PerfumeSizeDetail from "views/Perfume/PerfumeSizeDetail.jsx";
import Discount from "views/Discount/Discount.jsx";
import Producer from "views/Producer/Producer.jsx";
import ProducerDetail from "views/Producer/ProducerDetail.jsx";
import Notifications from "views/Notifications.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/add-brand",
    name: "Add brand",
    component: AddBrand,
    layout: "/admin"
  },
  {
    path: "/brand",
    name: "Brands",
    icon: "pe-7s-note2",
    component: Brand,
    layout: "/admin"
  },
  {
    path: "/brand/:id",
    name: "Brands",
    component: BrandDetail,
    layout: "/admin"
  },
  {
    path: "/size",
    name: "Sizes",
    icon: "pe-7s-note2",
    component: Size,
    layout: "/admin"
  },
  {
    path: "/size/:id",
    name: "Size Detail",
    component: SizeDetail,
    layout: "/admin"
  },
  {
    path: "/add-size",
    name: "Add Size",
    component: AddSize,
    layout: "/admin"
  },
  {
    path: "/add-producer",
    name: "Add Producer",
    component: AddProducer,
    layout: "/admin"
  },
  {
    path: "/producer/:id",
    name: "Producer Detail",
    component: ProducerDetail,
    layout: "/admin"
  },
  {
    path: "/perfume",
    name: "Perfumes",
    icon: "pe-7s-cash",
    component: Perfume,
    layout: "/admin"
  },
  {
    path: "/add-perfume",
    name: "Perfumes",
    component: AddPerfume,
    layout: "/admin"
  },
  {
    path: "/perfume/:id",
    name: "Perfume's Detail",
    component: PerfumeDetail,
    layout: "/admin"
  },
  {
    path: "/perfume/:id/add-size",
    name: "Perfume size Detail",
    component: AddPerfumeSize,
    layout: "/admin"
  },
  {
    path: "/perfume/:id/:size",
    name: "Perfume size Detail",
    component: PerfumeSizeDetail,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Users",
    icon: "pe-7s-note2",
    component: User,
    layout: "/admin"
  },
  {
    path: "/user/:id",
    name: "User's Detail",
    component: UserDetail,
    layout: "/admin"
  },
  {
    path: "/order",
    name: "Orders",
    icon: "pe-7s-note2",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/order/:id",
    name: "Order's detail",
    component: OrderDetail,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "Transactions",
    icon: "pe-7s-note2",
    component: Transaction,
    layout: "/admin"
  },
  {
    path: "/add-transaction",
    name: "Add Transaction",
    component: AddTransaction,
    layout: "/admin"
  },
  {
    path: "/transaction/:id",
    name: "Transaction's detail",
    component: TransactionDetail,
    layout: "/admin"
  },
  {
    path: "/discount",
    name: "Discounts",
    icon: "pe-7s-note2",
    component: Discount,
    layout: "/admin"
  },
  {
    path: "/producer",
    name: "Producers",
    icon: "pe-7s-note2",
    component: Producer,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
