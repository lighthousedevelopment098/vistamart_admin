import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Categories from "./pages/admin/Categories/Main_Categories/Category/list/Categories.jsx";
import Sub_Sub_Categories from "./pages/admin/Categories/subSubCategories/Sub_Sub_Categories.jsx";
import BulkImport from "./pages/admin/product/add/bulkImport/bulkImport.jsx";
import CustomerReviews from "./pages/user/costumerReview/customerReviews.jsx";
import CustomerList from "./pages/user/customerList/CustomerList.jsx";
import CustomerBonusSetUp from "./pages/user/customerBonusSetUp/CustomerBonusSetUp.jsx";
import CustomerLoyaltyReport from "./pages/user/customerLoyalityReport/CustomerLoyaltyReport.jsx";
import EmployeeRoleSetup from "./pages/admin/employees/add/EmployeeRoleSetup.jsx";
import EmployeeList from "./pages/admin/employees/list/Employees.jsx";
import SubscriberList from "./pages/admin/subscriber/SubscriberList.jsx";
import SystemSetup from "./pages/admin/settingSetup/SystemSetup.jsx";
import AppSettings from "./pages/admin/settingSetup/SystemSetups.jsx";
import SystemSettings from "./pages/admin/settingSetup/SystemSetups.jsx";
import SystemSetups from "./pages/admin/settingSetup/SystemSetups.jsx";
import LoginSetups from "./pages/admin/settingSetup/loginSetting/LoginSetting.jsx";
// import OtherConfiguration from "./pages/ThirdParty/Paymentmethod/OtherConfiguration/OtherConfiguration";
import SocialMedia from "./pages/admin/pagesAndMedia/socialMedia/socialMedia.jsx";
import PageAndMedia from "./pages/admin/pagesAndMedia/pageAndMedia.jsx";
import EarningReport from "./pages/admin/transactionReport/EarnReport/EarningReport.jsx";
import InhouseSale from "./pages/admin/transactionReport/InhouseProduct/InhouseProduct.jsx";
import Ticket_Support from "./pages/admin/healthSupport/Ticket_Support.jsx";
import Message from "./pages/admin/healthSupport/Message.jsx";
// import ProductGallery from "./pages/admin/healthSupport/Product_Gallery.jsx";
import BannerSetup from "./pages/admin/banner/list/bannerSetup.jsx";
// import POS from "./pages/admin/healthSupport/Pos.js";
import IndexMessage from "./pages/admin/healthSupport/Index.jsx";

import PuchNotify from "./pages/admin/notification/puchNotify.jsx";
import AnnouncementSetup from "./pages/admin/announcement/AnnouncementSetup.jsx";
import SendNotifaction from "./pages/admin/notification/sendNotifaction.jsx";
import AddNewDelivery from "./pages/delivery/add/AddNew.jsx";
import DeliveryManList from "./pages/delivery/list/deliveryManList.jsx";
import EmergencyContact from "./pages/delivery/list/emergencyContact.jsx";
import WithdrawRequest from "./pages/delivery/list/withdrawRequest.jsx";
import VendorList from "./pages/seller/vendor/list/vendorList/VenderList.jsx";
import VenderListDetail from "./pages/seller/vendor/list/VenderDetail.jsx";
import ShopStoreDetails from "./pages/seller/vendor/list/vendereListDetial/ShopStoreDetails.jsx";

import AddVendorForm from "./pages/seller/vendor/add/addVender/AddVender.jsx";
import RefundDetails from "./pages/transaction/refound/detail/refoundDetail.jsx";
// import GenerateBarcode from "./pages/In_House_Product/InHouseProductList/GeneratCode/GeneratCode";
import ProductDetails from "./pages/admin/product/list/productDetail/ProductDetail.jsx";
import BannerUpdateForm from "./pages/admin/banner/add/bannerUpdateForm.jsx";
import AddBannerForm from "./pages/admin/banner/add/AddBanner.jsx";
import LimitedStockProductsList from "./pages/admin/product/add/limitedProduct/limitedProduct.jsx";
import ProductGallery from "./pages/admin/healthSupport/Product_Gallery.jsx";
import PageGallery from "./pages/admin/healthSupport/Gallery.jsx";
import EaringReports from "./pages/admin/reportAndAnalysis/earningReport/EamingReports.jsx";
import ProductReports from "./pages/admin/reportAndAnalysis/productReports/ProductReports.jsx";
import OrderReports from "./pages/admin/reportAndAnalysis/orderReports/orderReports.jsx";
import InHouseSales from "./pages/admin/reportAndAnalysis/sales/InHouseSales.jsx";
import VendorSales from "./pages/admin/reportAndAnalysis/sales/VendorSales.jsx";
import TranscatioReports from "./pages/admin/reportAndAnalysis/salesAndTranscationReports/transactionalReport/TranscatioReports.jsx";
import AddInHouseNewProduct from "./pages/admin/product/add/addProduct/addProductForm.jsx";
import ProfileInformation from "./components/ProfileInformation/ProfileInformation.jsx";

import {
  PendingOrders,
  ConfirmedOrders,
  DeliveredOrders,
  PackagingOrders,
  OutForDeliveryOrders,
  FailedToDeliverOrders,
  ReturnedOrders,
  CanceledOrders,
} from "./pages/transaction/Order/list/OrderManagementPages.jsx";

import {
  ApprovedRefunds,
  PendingRefunds,
  RefundedRefunds,
  RejectedRefunds,
} from "./pages/transaction/refound/list/refundRequestPage.jsx";
import {
  InHouseProductPage,
  VendorPendingProductPage,
  VendorNewRequestProductPage,
  VendorApprovedProductPage,
  VendorDeniedProductPage,
} from "./pages/admin/product/list/productList/productManagmentComponent.jsx"; // Adjust the import path as needed
import InhouseProductUpdate from "./pages/admin/product/add/updateProduct/InhouseProductUpdate.jsx";
import CustomerDetails from "./pages/user/customerList/customerDetails.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddNewBrand from "./pages/admin/brands/AddNew.jsx";
import BrandList from "./pages/admin/brands/BrandList.jsx";
import BrandUpdate from "./pages/admin/brands/BrandUpdate.jsx";
import InHouseBusiness from "./pages/admin/Bussnesssetup/InHouseBusiness/InHouseBusiness.jsx";
import OrderList from "./pages/transaction/Order/list/OrderList.jsx";
import VenderWallet from "./pages/seller/vendor/list/VenderWallet/VenderWallet.jsx";
import VenderWalletMethod from "./pages/seller/vendor/list/VenderWalletMethod/VenderWalletMethod.jsx";
import ThirParty from "./pages/admin/thirdParty/thirParty.jsx";
import BusinessSetupShop from "./pages/admin/Bussnesssetup/BusinessSetup.jsx";
import AttributeSetup from "./pages/admin/productAttributeSetUp/productAttributeSetUp.jsx";
import CategoryUpdate from "./pages/admin/Categories/Main_Categories/Category/add/CategoryEdit/CategoryEdit.jsx";
import CouponManagement from "./pages/admin/offerAndDeals/coupon/coupon.jsx";
import CouponUpdate from "./pages/admin/offerAndDeals/coupon/couponUpdate.jsx";
import FlashDeals from "./pages/admin/offerAndDeals/flashDeal/flashDeals.jsx";
import DealOfTheDay from "./pages/admin/offerAndDeals/dealOfDay/dealOfDay.jsx";
import FeatureDeal from "./pages/admin/offerAndDeals/featureDeal/featureDeal.jsx";
import AddNewProduct from "./pages/admin/product/add/addProduct/addProductForm.jsx";
import AddFlashDealProdcut from "./pages/admin/offerAndDeals/flashDeal/addFlashDealProdcut.jsx";
import WalletManagement from "./pages/user/customersWallet/customersWallet.jsx";
import WithdrawalMethods from "./pages/seller/vendor/list/VenderWalletMethod/VenderWidrawmethod.jsx";
import OtherConfiguration from "./pages/admin/thirdParty/Paymentmethod/OtherConfiguration/OtherConfiguration.jsx";
import OrderDetails from "./pages/transaction/Order/detail/orderDetail.jsx";
import NotFoundPage from "./components/LoginPage/NotFoundPage.jsx";
import SubCategoriess from "./pages/admin/Categories/SubCategories/SubCategories.jsx";
import AddNewProductComponent from "./pages/admin/offerAndDeals/featureDeal/addFeatureProduct.jsx";
import AddEmployee from "./pages/admin/employees/add/addemploye.jsx";
import EmployeeDetails from "./pages/admin/employees/list/employeeDetails.jsx";
import UpdateEmployee from "./pages/admin/employees/add/updateEmploye.jsx";
import UpdateVendor from "./pages/seller/vendor/add/addVender/UpdateVendor.jsx";
import UpdateEmployeeRole from "./pages/admin/employees/add/updateEmployeRole.jsx";
import VendorWalletDetail from "./pages/seller/vendor/list/VenderWallet/VendorWalletDetail.jsx";
import AddPickupAddress from "./components/SonicShipping/AddPickupAddress.jsx";
import TrackingOrder from "./pages/transaction/Order/list/TrackingOrder.jsx";

function AllRoutes() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/businesssetup" element={<BusinessSetupShop />} />
        <Route path="/vendernew" element={<VendorNewRequestProductPage />} />
        <Route
          path="/venderpendingproduct"
          element={<VendorPendingProductPage />}
        />
        <Route path="/venderapprove" element={<VendorApprovedProductPage />} />
        {/* <Route path="/pos" element={<POS />} /> */}
        <Route path="/venderdenied" element={<VendorDeniedProductPage />} />

        <Route path="/" element={<Dashboard />} />
    
        <Route path="/addpickupaddress" element={<AddPickupAddress />} />
        <Route path="/track-order" element={<TrackingOrder />} />

        <Route path="/allorders" element={<OrderList />} />
        <Route path="/orderdetail/:id" element={<OrderDetails />} />
        <Route path="/pendingorders" element={<PendingOrders />} />
        <Route path="/pendingrefundrequests" element={<PendingRefunds />} />
        <Route path="/refunddetail/:id" element={<RefundDetails />} />
        <Route path="/approverefundrequests" element={<ApprovedRefunds />} />
        <Route path="/refunded" element={<RefundedRefunds />} />
        <Route path="/rejected" element={<RejectedRefunds />} />
        <Route path="/profileinformation" element={<ProfileInformation />} />
        <Route path="/refounddetail/:id" element={<RefundDetails />} />
        <Route path="/productattributesetup" element={<AttributeSetup />} />
        <Route path="/inhouseproductlist" element={<InHouseProductPage />} />
        {/* <Route path="/inhouseproductlistcode" element={<GenerateBarcode />} /> */}
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product/:id" element={<InhouseProductUpdate />} />
        <Route path="/inhouseaddproduct" element={<AddInHouseNewProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categoryedit/:id" element={<CategoryUpdate />} />
        <Route path="/subcategories" element={<SubCategoriess />} />
        <Route path="/subsubcategories" element={<Sub_Sub_Categories />} />
        <Route path="/addnewbrand" element={<AddNewBrand />} />
        <Route path="/brandlist" element={<BrandList />} />
        <Route path="/brandupdate/:id" element={<BrandUpdate />} />
        <Route path="/bulkimport" element={<BulkImport />} />
        <Route path="/coupon" element={<CouponManagement />} />
        <Route path="/couponupdate" element={<CouponUpdate />} />
        <Route path="/flashdeals" element={<FlashDeals />} />
        <Route path="/dealofday" element={<DealOfTheDay />} />
        <Route path="/featuredeal" element={<FeatureDeal />} />
        <Route
          path="featuredeal/add-product/:id"
          element={<AddNewProductComponent />}
        />
        <Route path="featuredeal/add-product" element={<AddNewProduct />} />
        <Route path="/add-flashproduct/:id" element={<AddFlashDealProdcut />} />
        <Route path="/customerreviews" element={<CustomerReviews />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/customerdetails" element={<CustomerDetails />} />
        <Route path="/walletmanagement" element={<WalletManagement />} />
        <Route path="/customerbonussetup" element={<CustomerBonusSetUp />} />
        <Route
          path="/customerloyaltyreport"
          element={<CustomerLoyaltyReport />}
        />
        <Route path="/employeerolesetup" element={<EmployeeRoleSetup />} />
        <Route path="/employeedit/:id" element={<UpdateEmployeeRole />} />
        <Route path="/addemploye" element={<AddEmployee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/employeesdit/:id" element={<UpdateEmployee />} />
        <Route path="/view/:id" element={<EmployeeDetails />} />
        <Route path="/subscriberlist" element={<SubscriberList />} />
        <Route path="/systemsetup" element={<SystemSetup />} />
        <Route path="/appsettings" element={<AppSettings />} />
        <Route path="/systemsettings" element={<SystemSettings />} />
        <Route path="/systemsetups" element={<SystemSetups />} />
        <Route path="/loginsetups" element={<LoginSetups />} />
        {/* <Route path="/theemsetup" element={<TheemSetUp />} /> */}
        <Route path="/thirdparty" element={<ThirParty />} />
        <Route path="/otherconfiguration" element={<OtherConfiguration />} />
        <Route path="/pagesocialmedia" element={<SocialMedia />} />
        <Route path="/pagemedia" element={<PageAndMedia />} />

        <Route path="/earningreport" element={<EaringReports />} />
        <Route path="/inhousesales" element={<InHouseSales />} />
        <Route path="/vendersale" element={<VendorSales />} />
        <Route path="/transactionrepo" element={<TranscatioReports />} />

        <Route path="/productreport" element={<ProductReports />} />
        <Route path="/orderreport" element={<OrderReports />} />

        <Route path="/pagegallery" element={<PageGallery />} />
        <Route path="/productgallery" element={<ProductGallery />} />
        <Route path="/earningreport" element={<EarningReport />} />
        <Route path="/inhouseproductearning" element={<InhouseSale />} />
        <Route
          path="/inhouselimitedproduct"
          element={<LimitedStockProductsList />}
        />
        <Route path="/businessinhouse" element={<InHouseBusiness />} />
        <Route path="/ticketsupport" element={<Ticket_Support />} />
        <Route path="/messagesupport" element={<Message />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/pendingorder" element={<PendingOrders />} />
        <Route path="/confirmedorder" element={<ConfirmedOrders />} />
        <Route path="/packagingorder" element={<PackagingOrders />} />
        <Route path="/deliveredorder" element={<DeliveredOrders />} />
        <Route path="/returnedorder" element={<ReturnedOrders />} />
        <Route path="/cancel" element={<CanceledOrders />} />
        <Route path="/failedorder" element={<FailedToDeliverOrders />} />
        <Route path="/outfordelivery" element={<OutForDeliveryOrders />} />
        <Route path="/pushnotification" element={<PuchNotify />} />
        <Route path="/announcement" element={<AnnouncementSetup />} />
        <Route path="/sendnotification" element={<SendNotifaction />} />
        <Route path="/addnewdelivery" element={<AddNewDelivery />} />
        <Route path="/deliverymanlist" element={<DeliveryManList />} />
        <Route path="/emergencycontact" element={<EmergencyContact />} />
        <Route path="/withdrawrequest" element={<WithdrawRequest />} />
        <Route path="/indexmessage" element={<IndexMessage />} />
        <Route path="/bannersetup" element={<BannerSetup />} />
        <Route path="/editbannerform/:id" element={<BannerUpdateForm />} />
        <Route path="/addbannerform" element={<AddBannerForm />} />

        <Route path="/venderlist" element={<VendorList />} />
        <Route path="/vendordetail/:id" element={<VenderListDetail />} />
        <Route path="/shopview" element={<ShopStoreDetails />} />
        <Route path="/new" element={<ShopStoreDetails />} />
        <Route path="/image" element={<ShopStoreDetails />} />
        <Route path="/orderdetail" element={<OrderDetails />} />
        <Route path="/addvenderform" element={<AddVendorForm />} />
        <Route path="/edit/:id" element={<UpdateVendor />} />
        <Route path="/addvenderwallet" element={<VenderWallet />} />
        <Route path="/venderwalletdetail/:id" element={<VendorWalletDetail />} />
        <Route path="/addvenderwalletmethod" element={<VenderWalletMethod />} />
        <Route
          path="/addvenderwidthrawtmethod"
          element={<WithdrawalMethods />}
        />
        
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default AllRoutes;
