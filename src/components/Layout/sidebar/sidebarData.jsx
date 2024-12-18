import {
  IoHome,
  IoCartSharp,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  AiFillDatabase,
  AiFillPicture,
  AiOutlineSpotify,
} from "react-icons/ai";
import { TbCategory2, TbTrack, TbWorld } from "react-icons/tb";
import {
  FaHeadset,
  FaKey,
  FaNetworkWired,
  FaStar,
  FaWallet,
  FaWarehouse,
} from "react-icons/fa";
import { IoIosNotifications, IoMdPerson } from "react-icons/io";
import {
  MdBarChart,
  MdGroups2,
  MdHealthAndSafety,
  MdOutlineBarChart,
  MdOutlineFolderZip,
} from "react-icons/md";
import { FaMessage, FaMicrophoneLines } from "react-icons/fa6";
import { CiInboxOut } from "react-icons/ci";
import {
  BsFillPersonFill,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { GrGallery } from "react-icons/gr";

import { CgNotes } from "react-icons/cg";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { ImStatsBars } from "react-icons/im";

export const sidebarItems = [
  {
    title: "Dashboard",
    key: "dashboard",

    // SubHeading: "dashboard",
    icon: <IoHome />,
    link: "/",
    isDropdown: false,
  },
  {
    key: "order-management",
    title: "Orders",
    SubHeading: "Order management",
    icon: <IoCartSharp />,
    isDropdown: true,
    subItems: [
      { title: "All Orders", link: "/allorders" },
      { title: "Pending Orders", link: "/pendingorder" },
      { title: "Confirmed Orders", link: "/confirmedorder" },
      { title: "Packaging Orders", link: "/packagingorder" },
      { title: "Out for Delivery", link: "/outfordelivery" },
      { title: "Delivered Orders", link: "/deliveredorder" },
      { title: "Returned Orders", link: "/returnedorder" },
      { title: "Failed to Deliver", link: "/failedorder" },
      { title: "Canceled", link: "/cancel" },
    ],
  },
  {
    title: "track order",
    key: "track-order",

    // SubHeading: "dashboard",
    icon: <TbTrack />,
    link: "/track-order",
    isDropdown: false,
  },
  {
    key: "refund-management",
    title: "Refund Requests",
    icon: <CgNotes />,
    isDropdown: true,
    subItems: [
      { title: "Pending Requests", link: "/pendingrefundrequests" },
      { title: "Approved Requests", link: "/approverefundrequests" },
      { title: "Refunded", link: "/refunded" },
      { title: "Rejected", link: "/rejected" },
    ],
  },

  {
    
    title: "Categories Setup",
    SubHeading: "Product management",
    key: "category",
    icon: <TbCategory2 />,
    isDropdown: true,
    subItems: [
      { title: "Categories", link: "/categories" },
      { title: "Subcategories", link: "/subcategories" },
      { title: "Sub Subcategories", link: "/subsubcategories" },
    ],
  },

  {
    title: "Brand",
    icon: <FaStar />,
    key:"brand",

    isDropdown: true,
    subItems: [
      { title: "Add New", link: "/addnewbrand" },
      { title: "List", link: "/brandlist" },
    ],
  },
  {
    title: "Product Attribute Setup",
    key:"product-attribute",

    icon: <FaNetworkWired />,
    link: "/productattributesetup",
    isDropdown: false,
  },
  {
    title: "In-house Products",
    key:"inhouse-product",

    icon: <FaWarehouse />,
    isDropdown: true,
    subItems: [
      { title: "Product List", link: "/inhouseproductlist" },
      { title: "Add New Product", link: "/inhouseaddproduct" },
      { title: "Bulk Import", link: "/bulkimport" },
    ],
  },

  {
    title: "Vendor",
    key: "vendor-management",
    SubHeading: "Vendors management",
    icon: <FaWallet />,
    isDropdown: true,
    subItems: [
      { title: "Vendor List", link: "/venderlist" },
      { title: "Add Vendor", link: "/addvenderform" },
      { title: "Vendor Withdraw", link: "/addvenderwallet" },
      // { title: "Vendor Wallet Method", link: "/addvenderwalletmethod" },
    ],
  },
  {
    title: "Vendor Products",
    key:"vendor-product",

    icon: <AiOutlineSpotify />,
    isDropdown: true,
    subItems: [
      // { title: "New Products Requests", link: "/vendernew" },
      { title: "New Product Requests", link: "/venderpendingproduct" },
      { title: "Approved Products", link: "/venderapprove" },
      { title: "Denied Products", link: "/venderdenied" },
    ],
  },

  // {
  //   title: "Product Gallery",
  //   icon: <GrGallery />,
  //   link: "/productgallery",
  //   isDropdown: false,
  // },

  {
    SubHeading: "Promotion management",
    key: "banner-setup",

    title: "Banner Setup",

    icon: <AiFillPicture />,
    link: "/bannersetup",
    isDropdown: false,
  },

  {
    title: "Offers & Deals",
    key:"offer-and-deals",

    icon: <BsFillPersonFill />,
    isDropdown: true,
    subItems: [
      { title: "Coupon", link: "/coupon" },
      { title: "Flash Deals", link: "/flashdeals" },
      { title: "Deal Of The Day", link: "/dealofday" },
      { title: "Featured Deal", link: "/featuredeal" },
    ],
  },

  {
    title: "Notifications",
    key:"notifications",

    icon: <IoIosNotifications />,
    isDropdown: true,
    subItems: [
      { title: "Send Notifications", link: "/sendnotification" },
      { title: "Push Notifications Setup", link: "/pushnotification" },
    ],
  },

  {
    title: "Announcement",
    key:"announcement",

    icon: <FaMicrophoneLines />,
    link: "/announcement",
    isDropdown: false,
  },

  {
    title: "Help and Support",
    
    isDropdown: true,
    icon: <MdHealthAndSafety />,
    subItems: [
      {
        title: "Inbox",
        key:"inbox",
        icon: <CiInboxOut />,
        link: "/indexmessage",
      },
      {
        title: "Messages",
        key:"message",
        icon: <FaMessage />,
        link: "/messagesupport",
      },
      // {
      //   title: "Support Ticket",
      //   icon: <FaHeadset />,
      //   link: "/ticketsupport",
      // },
    ],
  },

  {
    

    SubHeading: "Reports & Analysis",
    title: "Sales & Transaction",
    key:"sales-and-transaction",

    icon: <MdBarChart />,
    isDropdown: true,
    subItems: [
      { title: "Earning Report", link: "/earningreport" },
      { title: "Inhouse Sales", link: "/inhousesales" },
      { title: "Vendor Sales", link: "/vendersale" },
      { title: "Transaction Report", link: "/transactionrepo" },
    ],
  },

  {
    title: "Product Report",
     key:"product-report",
    icon: <MdOutlineBarChart />,
    link: "/productreport",
    isDropdown: false,
  },
  {
    title: "Order Report",
     key:"order-report",
    icon: <ImStatsBars />,
    link: "/orderreport",
    isDropdown: false,
  },

  {
    title: "Customers",
   key:"customer",
    SubHeading: "Customers",
    icon: <MdOutlineFolderZip />,
    isDropdown: true,
    subItems: [
      { title: "Customers List", link: "/customerlist" },
      { title: "Customers Review", link: "/customerreviews" },
      { title: "Wallet", link: "/walletmanagement" },
      // { title: "Wallet Bonus Setup", link: "/customerbonussetup" },
      { title: "Loyalty Points", link: "/customerloyaltyreport" },
    ],
  },
  {
    title: "Delivery Man",
    icon: <MdGroups2 />,
    key : "delivery-management",
    isDropdown: true,
    subItems: [
      { title: "Add New", link: "/addnewdelivery" },
      { title: "List", link: "/deliverymanlist" },
      { title: "Withdraws", link: "/withdrawrequest" },
      { title: "Emergency Contact", link: "/emergencycontact" },
    ],
  },
  {
    title: "Employees",
    key:"employee",
    // SubHeading: "Employee management",
    icon: <IoPersonOutline />,
    isDropdown: true,
    subItems: [
      { title: "Employee Role Setup", link: "/employeerolesetup" },
      { title: "Employees", link: "/employeelist" },
    ],
  },
  {
    title: "Subscribers",
    key:"subscribers",
    SubHeading: "Subscriber",
    icon: <IoMdPerson />,
    link: "/subscriberlist",
    isDropdown: false,
  },

  {
    title: "Business Setup",
    key:"business-setup",
    SubHeading: "System Setup",
    icon: <TbWorld />,
    isDropdown: true,
    subItems: [
      { title: "Business Setup", link: "/businesssetup" },
      // { title: "app  Setup", link: "/appsettings" },
      // { title: "Inhouse Shop", link: "/businessinhouse" },
    ],
  },
  // {
  //   title: "System settings",
  //   // SubHeading: "System Setup",
  //    key:"system-setup",
  //   icon: <IoSettingsOutline />,
  //   isDropdown: true,
  //   subItems: [
  //     { title: "System Settings", link: "/systemsetups" },
  //     { title: "Login Settings", link: "/loginsetups" },
  //     { title: "Themes & Addons", link: "/theemsetup" },
  //   ],
  // },
  // {
  //   title: "3rd Party",
  //   key:"thirdparty",

  //   icon: <FaKey />,
  //   isDropdown: true,
  //   subItems: [
  //     { title: "Payment Methods", link: "/thirdparty" },
  //     { title: "Other Configurations", link: "/otherconfiguration" },
  //   ],
  // },
  {
    title: "Pages & Media",
     key:"page-and-media",
    icon: <BsReverseLayoutSidebarInsetReverse />,
    isDropdown: true,
    subItems: [
      { title: "Pages And Media", link: "/pagemedia" },
      { title: "Social Media Links", link: "/pagesocialmedia" },
      // { title: "Gallery", link: "/pagegallery" },
    ],
  },
];
