
const backendDomin = "http://localhost:8080"

const UserSummaryApi = {
    LoginWithGoogle : {
        url : `${backendDomin}/api/v1/user/google`,
        method : "POST"
    },
    LogIn : {
        url : `${backendDomin}/api/v1/user/login`,
        method : "POST"
    },
    Logout : {
        url : `${backendDomin}/api/v1/user/logout`,
        method : "POST"
    },
    SignUp : {
        url : `${backendDomin}/api/v1/user/register`,
        method : "POST"
    },
    VerifyEmail : {
        url : `${backendDomin}/api/v1/user/register/verifyemail`,
        method : "POST"
    },
    ForgotPassword : {
        url : `${backendDomin}/api/v1/user/forgot-password`,
        method : "POST"
    },
    ResetPassword : {
        url : `${backendDomin}/api/v1/user/reset-password`,
        method : "PATCH"
    },
    ResendOtp : {
        url : `${backendDomin}/api/v1/user/resendotp`,
        method : "POST"
    },
    UserDetials : {
        url : `${backendDomin}/api/v1/user/userdetails`,
        method : "GET"
    },
    ReferenceTokenValidation : {
        url : `${backendDomin}/api/auth/refresh`,
        method : "POST"
    },
    EditUserProfile : (role, userId) => ({
        url : `${backendDomin}/api/v1/user/edit/${role}/${userId}`,
        method : "PATCH"
    }),
    ChangeUserEmail : {
        url : `${backendDomin}/api/v1/user/changeemail`,
        method : "PATCH"
    },
    VerifyNewEmail : {
        url : `${backendDomin}/api/v1/user/verify-email`,
        method : "POST"
    },
    ResendNewOtp : {
        url : `${backendDomin}/api/v1/user/resend-otp`,
        method : "POST"
    },
    ChangeUserPassword : (role, userId) => ({
        url : `${backendDomin}/api/v1/user/changepassword/${role}/${userId}`,
        method : "PATCH"
    }),
    Posts : {
        url : `${backendDomin}/api/v1/user/property`,
        method : "POST"
    },
    SellerForm : {
        url : `${backendDomin}/api/v1/user/sellproperty`,
        method : "POST"
    },
    EnqueryForm : {
        url : `${backendDomin}/api/v1/user/enqueryproperty`,
        method : "POST"
    },
    BuyerForm : (postId) => ({
            url : `${backendDomin}/api/v1/user/buy/${postId}`,
            method : "POST"
        }
    ),
    // Posts
    PostDetails: (postId) => ({
        url : `${backendDomin}/api/v1/user/property-details/${postId}`,
        method : "GET"
    }),
    ViewCount: (postId) => ({
        url : `${backendDomin}/api/v1/user/property-view/${postId}`,
        
    }),
    Views: (postId) =>({
        url : `${backendDomin}/api/v1/user/property-count/${postId}`,
    }),

    FeaturePosts : {
        url : `${backendDomin}/api/v1/user/featured-posts`,
        method : "GET"
    },
    Category: (category) => ({
        url : `${backendDomin}/api/v1/user/category/${category}/data`,
        method : "GET"
    }),
    TypeData : (type) => ({
        url : `${backendDomin}/api/v1/user/type/${type}`,
        method : "GET"
    }),
    StatsData : {
        url : `${backendDomin}/api/v1/user/stats-data`,
        method : "GET"
    },
}


export {UserSummaryApi}