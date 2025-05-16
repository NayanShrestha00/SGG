// User pages
import Home from "./user/Home";
import Profile from "./user/Profile";
import Login from "./user/Login"
import EnquaryForm from "./user/EnquaryForm"
import SellerForm from "./user/SellerForm";
import Register from "./user/Register";
import ForgotPassword from "./user/ForgotPassword";
import Editprofile from "./user/Editprofile";
import Buy from "./user/main/Buy";
import Rent from "./user/main/Rent";
import Converter from "./user/main/Converter";
import About from "./user/main/About";
import PostDetails from "./user/main/PostDetails";
import Post from "./user/posts/Posts";
import Test from "./user/Test";
import Help from "./user/main/Help";

// Admin Manager pages
import AdminManagerLogin from "./adminManager/AdminManagerLogin"
import AdminManagerForgotPassword from "./adminManager/AdminManagerForgotPassword"

// Admin pages
import AdminDashboard from "./adminManager/admin/AdminDashboard"
import AdminHome from "./adminManager/admin/AdminHome";
import CreateManager from "./adminManager/admin/CreateManager";
import Managers from "./adminManager/admin/Managers";
import Users from "./adminManager/admin/Users";
import Posts from "./adminManager/admin/Posts";
import AdminAccountSetting from "./adminManager/admin/AdminAccountSetting";
import SingleManagerDetails from "./adminManager/admin/SingleManagerDetails";

// Manager pages
import ManagerDashboard from "./adminManager/manager/ManagerDashboard"
import ManagerHome from "./adminManager/manager/ManagerHome";
import CreatePost from "./adminManager/manager/CreatePost";
import TotalPost from "./adminManager/manager/TotalPost";
import SellerForms from "./adminManager/manager/SellerForms";
import BuyerForms from "./adminManager/manager/BuyerForms";
import EnquaryForms from "./adminManager/manager/EnquaryForms";
import ManagerAccountSetting from "./adminManager/manager/ManagerAccountSetting";
// extra pages
import Unauthorized from "./Unauthorized"

export { 
    // User pages
    Test,
    Login,
    Home,
    Profile,
    EnquaryForm,
    SellerForm,
    Register,
    ForgotPassword,
    Editprofile,
    Buy,
    Rent,
    Converter,
    About,
    PostDetails,
    Post,
    Help,

    // Admin Manager pages
    AdminManagerLogin,
    AdminManagerForgotPassword,
    
    // Admin pages
    AdminDashboard,
    AdminHome,
    CreateManager,
    Managers,
    Users,
    Posts,
    AdminAccountSetting,
    SingleManagerDetails,

    // Manager pages
    ManagerDashboard,
    ManagerHome,
    CreatePost,
    TotalPost,
    SellerForms,
    BuyerForms,
    EnquaryForms,
    ManagerAccountSetting,

    // extra pages
    Unauthorized
    
 };