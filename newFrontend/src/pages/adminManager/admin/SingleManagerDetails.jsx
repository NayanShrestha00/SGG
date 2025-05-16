import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi'
import axios from 'axios'
import CountUp from "react-countup";


const SingleManagerDetails = (props) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [managerData, setManagerData] = useState({});
    const [managerPost, setManagerPost] = useState([]);

    useEffect(() => {
        const fetchManagerData = async () => {
            try {
                const response = await axios.get(AdminManagerSummaryApi.ManagerData(props.managerId).url, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                console.log(response);
                setManagerData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchManagerPost = async () => {
            try {
                const response = await axios.get(AdminManagerSummaryApi.ManagerPost(props.managerId).url, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                console.log(response);
                setManagerPost(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }


        fetchManagerData();
        fetchManagerPost();
    }, [accessToken, props.managerId]);
  return (
    <main className="flex-col flex-wrap p-4 bg-[#d4ebfe]  shadow-md h-[90vh] w-[75vw] overflow-y-auto scrollbar-hide">
      {/* Header */}
      <header className="bg-white mb-2 rounded-lg border-gray-200 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{props.managerName}</h2>
          </div>
        </div>
      </header>

      {/* Activity Section */}
      <section className="bg-white p-4 rounded-lg shadow mb-2">
        <h3 className="text-lg font-medium mb-4">My Activity</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL POST</p>
            <p className="text-lg font-semibold">
              <CountUp end={managerData.totalPostByManager} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL SELLER FORMS</p>
            <p className="text-lg font-semibold">
              <CountUp end={managerData.totalSellerForms} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL BUYER FORM</p>
            <p className="text-lg font-semibold">
              <CountUp end={managerData.totalBuyerForms} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL ENQUERY FORM</p>
            <p className="text-lg font-semibold">
              <CountUp end={managerData.totalEnqueryForms} duration={3} />
            </p>
          </div>
        </div>
      </section>

        {/* Post Section */}
        <section className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">My Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {managerPost.map((managerPost) => (
                    <div key={managerPost._id} className="bg-gray-100 p-4 rounded-lg">
                        <img src={managerPost.avatar} alt={managerPost.propertyTitle} className="w-full h-40 object-cover rounded-lg" />
                        <h4 className="text-lg font-semibold">{managerPost.propertyTitle}</h4>
                        <p className="text-gray-500">{managerPost.createdAt}</p>
                    </div>
                ))}
            </div>
        </section>
    </main>
  )
}

export default SingleManagerDetails
