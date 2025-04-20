import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./User_Pannel/homepage";
import LoginPage from "./User_Pannel/User_login";
import SignUpPage from "./User_Pannel/User_signup";
import UserDashboardPage from "./User_Pannel/User_dashboard";
import UserProfile from "./User_Pannel/User_profile";
import UserChangePassword from "./User_Pannel/User_change_password";
import UserContactPage from "./User_Pannel/User_contact_page";
import ForgotPassword from "./User_Pannel/User_forgot_password";
import AboutUs from "./User_Pannel/User_about_us";
import Exclusive from "./User_Pannel/User_exclusive";
import Cart from "./User_Pannel/User_cart";
import WishlistPage from "./User_Pannel/User_wishlist";
import ClothCollection from "./User_Pannel/User_Cloths_section/Cloth";
import ToysCollection from "./User_Pannel/User_Toys_section/Toy";
import FestiveCollection from "./User_Pannel/Festive_items_Collection/Festive-item";
import StationeryCollection from "./User_Pannel/User_Stationery_section/Stationery_item";
import FloralCollection from "./User_Pannel/User_Floral_section/Floral";
import FootwearCollection from "./User_Pannel/User_Footwear_section/Footwear";
import AccessoriesCollection from "./User_Pannel/User_Accessories_section/Accessories";
import BuildingBlocksPage from "./User_Pannel/User_Toys_section/Building_blocks";
import DenimJeansPage from "./User_Pannel/User_Cloths_section/Denim-jeans";
import HalloweenPumpkinPage from "./User_Pannel/Festive_items_Collection/Halloween-Pumpkin";
import GelPenSetPage from "./User_Pannel/User_Stationery_section/Gelpen";
import LavenderBundlesPage from "./User_Pannel/User_Floral_section/lavender-bundles";
import FAQPopup from "./User_Pannel/Footer_Quick_Links/FAQ";
import ShippingReturnsPopup from "./User_Pannel/Footer_Quick_Links/Shipping_and_returns";
import PrivacyPolicyPopup from "./User_Pannel/Footer_Quick_Links/Privacy_policy";
import TermsConditionsPopup from "./User_Pannel/Footer_Quick_Links/Terms_and_condition";
import CheckoutPage from "./User_Pannel/User_checkout";
import OrderConfirmation from "./User_Pannel/User_confirmtion_order";
import Orders from "./User_Pannel/User_orders";
import AdminDashboard from "./Admin_Pannel/Admin_dashboard";
import AdminCategoryPage from "./Admin_Pannel/Admin_Category_Page";
import AdminProductsPage from "./Admin_Pannel/Admin_Products_Page";
import AdminDiscountsPage from "./Admin_Pannel/Admin_Discount_Page";
import AdminOffersPage from "./Admin_Pannel/Admin_Offers_Page";
import AdminOrdersPage from "./Admin_Pannel/Admin_Orders_Page";
import AdminCustomersPage from "./Admin_Pannel/Admin_Customer_Page";
function App() {
  return (
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<UserDashboardPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/change-password" element={<UserChangePassword />} />
      <Route path="/contact" element={<UserContactPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/exclusive" element={<Exclusive />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cloth-collection" element={<ClothCollection />} />
      <Route path="/toys" element={<ToysCollection />} />
      <Route path="/festive-items" element={<FestiveCollection />} />
      <Route path="/stationery-items" element={<StationeryCollection />} />
      <Route path="/floral" element={<FloralCollection />} />
      <Route path="/footwear" element={<FootwearCollection />} />
      <Route path="/accessories" element={<AccessoriesCollection />} />
      <Route path="/toys/building-blocks" element={<BuildingBlocksPage />} />
      <Route path="/clothes/denim-jeans" element={<DenimJeansPage />} />
      <Route path="/festive-items/halloween-pumpkin" element={<HalloweenPumpkinPage />} />
      <Route path="/stationery-items/gelpen-set" element={<GelPenSetPage />} />
      <Route path="/floral/lavender-bundles" element={<LavenderBundlesPage />} />
      <Route path="/faq" element={<FAQPopup />} />
      <Route path="/shipping-returns" element={<ShippingReturnsPopup />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPopup />} />
      <Route path="/terms-conditions" element={<TermsConditionsPopup />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/categories" element={<AdminCategoryPage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/discounts" element={<AdminDiscountsPage />} />
      <Route path="/admin/offers" element={<AdminOffersPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/customers" element={<AdminCustomersPage />} />
      </Routes>
  );
}

export default App;
