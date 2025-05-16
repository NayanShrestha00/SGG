import { Outlet } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { AdminDashboard, ManagerDashboard } from './pages';
// import HashLoader from 'react-spinners/HashLoader';
import DotLoader from 'react-spinners/DotLoader';

function App() {
  const role = useSelector((state) => state.auth.user?.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-80 flex items-center justify-center'>
          {/* <HashLoader color='#10B981' size={90} /> */}
          <DotLoader color='#10B981' size={100} />
        </div>
      )}
      {isAuthenticated ? (
        role === 'Admin' ? (
          <AdminDashboard />
        ) : role === 'Manager' ? (
          <ManagerDashboard />
        ) : (
          <>
            <Header />
            <main className='bg-gray-100'>
              <Outlet />
            </main>
            <Footer />
          </>
        )
      ) : (
        <>
          <Header />
          <ScrollToTop />
          <main className='bg-gray-100'>
            <Outlet />
          </main>
          <Footer />
        </>
      )}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        zIndex={9999}
      />
    </>
  )
}

export default App
