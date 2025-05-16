

const backendDomin = "http://localhost:8080"

const AdminManagerSummaryApi = {
    // For Admin
    AdminLogin : {
        url : `${backendDomin}/api/v1/admin/login`,
        method : "POST"
    },
    AdminForgotPassword : {
        url : `${backendDomin}/api/v1/admin/forgot-password`,
        method : "POST"
    },
    AdminResetPassword : {
        url : `${backendDomin}/api/v1/admin/reset-password`,
        method : "PATCH"
    },
    AdminDetails : {
        url : `${backendDomin}/api/v1/admin/admindetails`,
        method : "GET"
    },
    CreateManager : {
        url : `${backendDomin}/api/v1/admin/register-manager`,
        method : "POST"
    },
    ManagerList : {
        url : `${backendDomin}/api/v1/admin/allmanager`,
        method : "GET"
    },
    DeleteManagerById : (managerId) => ({
        url : `${backendDomin}/api/v1/admin/delete/${managerId}`,
        method : "DELETE"
    }),
    UserList : {
        url : `${backendDomin}/api/v1/admin/totaluser`,
        method : "GET"
    },
    PostList : {
        url : `${backendDomin}/api/v1/admin/view-post`,
        method : "GET"
    },
    Stats : {
        url : `${backendDomin}/api/v1/admin/admin-stats`,
        method : "GET"
    },
    ChartData : {
        url : `${backendDomin}/api/v1/admin/pie-chart`,
        method : "GET"
    },
    ChangePassword : (role, id) => ({
        url : `${backendDomin}/api/v1/admin/changepwd/${role}/${id}`,
        method : "PATCH"
    }),
    ManagerData : (managerId) => ({
        url : `${backendDomin}/api/v1/admin/view/data/${managerId}`,
        method : "GET"
    }),
    ManagerPost : (managerId) => ({
        url : `${backendDomin}/api/v1/admin/view-manager/posts/${managerId}`,
        method : "GET"
    }),
    AdminLogout : {
        url : `${backendDomin}/api/v1/admin/logout`,
        method : "POST"
    },
    

    // For Manager
    ManagerLogin : {
        url : `${backendDomin}/api/v1/manager/login`,
        method : "POST"
    },
    ManagerForgotPassword : {
        url : `${backendDomin}/api/v1/manager/forgot-password`,
        method : "POST"
    },
    ManagerResetPassword : {
        url : `${backendDomin}/api/v1/manager/reset-password`,
        method : "PATCH"
    },
    ManagerDetails : {
        url : `${backendDomin}/api/v1/manager/managerdetails`,
        method : "GET"
    },
    ManagerLogout : {
        url : `${backendDomin}/api/v1/manager/logout`,
        method : "POST"
    },
    ManagerChangePassword : (role, id) => ({
        url : `${backendDomin}/api/v1/manager/changepassword/${role}/${id}`,
        method : "PATCH"
    }),
    ManagerStats : (managerId) => ({
        url : `${backendDomin}/api/v1/manager/manager-data/${managerId}`,
        method : "GET"
    }),
    CreatePost : {
        url : `${backendDomin}/api/v1/manager/post`,
        method : "POST"
    },
    TotalPost : (managerId) => ({
        url : `${backendDomin}/api/v1/manager/post/${managerId}`, 
        method : "GET"
    }),
    SinglePostData : (postId) => ({
        url : `${backendDomin}/api/v1/manager/post-details/${postId}`,
        method : "GET"
    }),
    
    EnquaryForms : {
        url : `${backendDomin}/api/v1/manager/enqueryfrom`,
        method : "GET"
    },
    SingleEnquaryData : (formId) => ({
        url : `${backendDomin}/api/v1/manager/enquery/${formId}/data`,
        method : "GET"
    }),
    ChangeEnquaryState : (enqueryId) => ({
        url : `${backendDomin}/api/v1/manager/enquerystate/${enqueryId}`,
        method : "PATCH"
    }),
    SellerForms : {
        url : `${backendDomin}/api/v1/manager/fetchallseller`,
        method : "GET"
    },
    SingleSellerData : (sellerId) => ({
        url : `${backendDomin}/api/v1/manager/seller/${sellerId}/data`,
        method : "GET"
    }),
    ChangeSellerState : (sellerId) => ({
        url : `${backendDomin}/api/v1/manager/sellerstate/${sellerId}`,
        method : "PATCH"
    }),
    BuyerForms : {
        url : `${backendDomin}/api/v1/manager/fetchallforms`,
        method : "GET"
    },
    SingleBuyerData : (postId) => ({
        url : `${backendDomin}/api/v1/manager/fetchdata/${postId}`,
        method : "GET"
    }),
    ChangeBuyerState : (buyerId) => ({
        url : `${backendDomin}/api/v1/manager/buyserstate/${buyerId}`,
        method : "PATCH"
    }),

}

export {AdminManagerSummaryApi};