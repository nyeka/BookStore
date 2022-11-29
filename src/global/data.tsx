import { AiOutlineHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Data = [
  {
    title: "Dashboard",
    to: "/",
    icon: <AiOutlineHome />,
  },
  {
    title: "Discover",
    to: "/discover",
    icon: <BsFillPersonFill />,
  },
  {
    title: "Categories",
    to: "/category",
    icon: <BiCategoryAlt />,
  },
];

export const Bookslist = [
  {
    title: "Purchased",
    to: "/",
    icon: <BiPurchaseTagAlt />,
  },
  {
    title: "Cart",
    to: "/",
    icon: <AiOutlineShoppingCart />,
  },
];
