// // import React from 'react';
// // import { FaWallet, FaArrowRight, FaDollarSign, FaUserAlt, FaStoreAlt } from 'react-icons/fa';

// // const VendorWalletDetail = () => {
// //   const [showModal, setShowModal] = React.useState(false);

// //   const handleModalClose = () => setShowModal(false);
// //   const handleModalShow = () => setShowModal(true);

// //   return (
// //     <div className="container mx-auto p-4">
// //       <div className="mb-6">
// //         <h2 className="text-2xl font-bold flex items-center gap-2">
// //           <FaWallet size={20} /> Withdraw
// //         </h2>
// //       </div>
// //       <div className="grid grid-cols-1 gap-6">
// //         {/* Vendor Withdraw Information */}
// //         <div className="bg-white shadow rounded p-4">
// //           <div className="border-b pb-4 mb-4 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold">Vendor withdraw information</h3>
// //             <FaWallet className="text-xl" />
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div>
// //               <div className="flex items-center">
// //                 <h5 className="font-medium">Amount:</h5>
// //                 <span className="ml-2">PKR500.00</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <h5 className="font-medium">Request time:</h5>
// //                 <span className="ml-2">2022-10-12 07:01:09</span>
// //               </div>
// //             </div>
// //             <div>
// //               <div className="flex items-center">
// //                 <h5 className="font-medium">Note:</h5>
// //               </div>
// //             </div>
// //             <div className="text-right">
// //               <button
// //                 type="button"
// //                 className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500 flex gap-2 items-center"
// //                 onClick={handleModalShow}
// //               >
// //                 Proceed <FaArrowRight />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* My Bank Info */}
// //         <div className="bg-white shadow rounded p-4">
// //           <div className="border-b pb-4 mb-4 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold">Bank info</h3>
// //             <FaDollarSign className="text-xl" />
// //           </div>
// //           <div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Bank name:</h5>
// //               <span className="ml-2">City Bank</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Branch:</h5>
// //               <span className="ml-2">Mirpur- 12</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Holder name:</h5>
// //               <span className="ml-2">Fatema</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Account no:</h5>
// //               <span className="ml-2">12345678</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Shop Info */}
// //         <div className="bg-white shadow rounded p-4">
// //           <div className="border-b pb-4 mb-4 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold">Shop info</h3>
// //             <FaStoreAlt className="text-xl" />
// //           </div>
// //           <div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Vendor:</h5>
// //               <span className="ml-2">Book Store</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Phone:</h5>
// //               <span className="ml-2">+1**********</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Address:</h5>
// //               <span className="ml-2">House-09, Road-02, Section-15, Block-D, Mirpur-13</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Vendor Info */}
// //         <div className="bg-white shadow rounded p-4">
// //           <div className="border-b pb-4 mb-4 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold">Vendor info</h3>
// //             <FaUserAlt className="text-xl" />
// //           </div>
// //           <div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Name:</h5>
// //               <span className="ml-2">kamrujjaman joy</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Email:</h5>
// //               <span className="ml-2">email.com@gmail.com</span>
// //             </div>
// //             <div className="flex items-center">
// //               <h5 className="font-medium">Phone:</h5>
// //               <span className="ml-2">+922342342</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Modal */}
// //         {showModal && (
// //           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //             <div className="bg-white rounded shadow-lg w-1/3 p-6">
// //               <h3 className="text-lg font-bold mb-4">Withdraw request process</h3>
// //               <div className="mb-4">
// //                 <label htmlFor="approval" className="block font-medium mb-2">Request:</label>
// //                 <select className="w-full border rounded p-2 bg-none outline-none" id="approval">
// //                   <option value="1">Approve</option>
// //                   <option value="2">Deny</option>
// //                 </select>
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="note" className="block font-medium mb-2">Note about transaction or request:</label>
// //                 <textarea className="w-full border rounded p-2" id="note" rows="3"></textarea>
// //               </div>
// //               <div className="flex justify-end gap-2">
// //                 <button
// //                   className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-500"
// //                   onClick={handleModalClose}
// //                 >
// //                   Close
// //                 </button>
// //                 <button className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500">
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorWalletDetail;






// import React, { useState, useEffect } from 'react';
// import { FaWallet, FaArrowRight, FaDollarSign, FaUserAlt, FaStoreAlt } from 'react-icons/fa';
// import apiConfig from '../../../../../config/apiConfig';
// import { getAuthData } from '../../../../../utils/authHelper';
// import { useParams } from 'react-router-dom';

// const VendorWalletDetail = () => {
//     const { id } = useParams()
//   const { token, user } = getAuthData();
//   const [withdrawal, setWithdrawal] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [note, setNote] = useState('');
//   const [status, setStatus] = useState('Pending');

//   const fetchWithdrawal = async () => {
//     try {
//       const response = await fetch(`${apiConfig.transaction}/withdraws/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         setWithdrawal(data.doc);
//         setStatus(data.doc.status);
//       }
//     } catch (error) {
//       console.error('Error fetching withdrawal data:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {

//       const response = await fetch(`${apiConfig.transaction}/withdraws/request-status/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           status,
//           note,
//           processedBy: user?._id,
//           processedAt: new Date().toISOString(),
//         }),
//       });
//       const result = await response.json();
//       console.log("response ====", result)
//       if (result.status === 'success') {
//         setWithdrawal(result.doc);
//         setShowModal(false);
//       }
//     } catch (error) {
//       console.error('Error updating withdrawal status:', error);
//     }
//   };

//   useEffect(() => {
//     fetchWithdrawal();
//   }, [user?._id]);

//   const handleModalClose = () => setShowModal(false);
//   const handleModalShow = () => setShowModal(true);

//   if (!withdrawal) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {
//         console.log("width detail=====", withdrawal)
//       }
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <FaWallet size={20} /> Withdraw
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 gap-6">
//         {/* Vendor Withdraw Information */}
//         <div className="bg-white shadow rounded p-4">
//           <div className="border-b pb-4 mb-4 flex items-center justify-between">
//             <h3 className="text-lg font-semibold">Vendor withdraw information</h3>
//             <FaWallet className="text-xl" />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <div className="flex items-center">
//                 <h5 className="font-medium">Amount:</h5>
//                 <span className="ml-2">PKR{withdrawal.amount}.00</span>
//               </div>
//               <div className="flex items-center">
//                 <h5 className="font-medium">Request time:</h5>
//                 <span className="ml-2">{new Date(withdrawal.createdAt).toLocaleString()}</span>
//               </div>
//             </div>
//             <div>
//               <div className="flex items-center">
//                 <h5 className="font-medium">Note:</h5>
//                 <span className="ml-2">{withdrawal.note || 'N/A'}</span>
//               </div>
//               <div className="flex items-center">
//                 <h5 className="font-medium">Status:</h5>
//                 <span className="ml-2">{withdrawal.status || 'Pending'}</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <button
//                 type="button"
//                 className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500 flex gap-2 items-center"
//                 onClick={handleModalShow}
//               >
//                 Proceed <FaArrowRight />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded shadow-lg w-1/3 p-6">
//               <h3 className="text-lg font-bold mb-4">Withdraw request process</h3>
//               <div className="mb-4">
//                 <label htmlFor="approval" className="block font-medium mb-2">Request:</label>
//                 <select
//                   className="w-full border rounded p-2 bg-none outline-none"
//                   id="approval"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 >

//                   <option value="Pending">Pending</option>
//                   <option value="Approved">Approve</option>
//                   <option value="Rejected">Deny</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="note" className="block font-medium mb-2">Note about transaction or request:</label>
//                 <textarea
//                   className="w-full border rounded p-2"
//                   id="note"
//                   rows="3"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-500"
//                   onClick={handleModalClose}
//                 >
//                   Close
//                 </button>
//                 <button
//                   className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorWalletDetail;





import React, { useState, useEffect } from 'react'; 
import { FaWallet, FaArrowRight } from 'react-icons/fa';
import apiConfig from '../../../../../config/apiConfig';
import { getAuthData } from '../../../../../utils/authHelper';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VendorWalletDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = getAuthData();
  const [withdrawal, setWithdrawal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('Pending');

  const fetchWithdrawal = async () => {
    try {
      const response = await fetch(`${apiConfig.transaction}/withdraws/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setWithdrawal(data.doc);
        setStatus(data.doc.status);
      }
    } catch (error) {
      console.error('Error fetching withdrawal data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiConfig.transaction}/withdraws/request-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          note,
          processedBy: user?._id,
          processedAt: new Date().toISOString(),
        }),
      });
      const result = await response.json();

      if (result.status === 'success') {
        setWithdrawal(result.doc);
        setShowModal(false);

        Swal.fire({
          title: 'Success!',
          text: `Withdrawal request has been ${status.toLowerCase()}.`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/addvenderwallet');
        });
      }
    } catch (error) {
      console.error('Error updating withdrawal status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the withdrawal status.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchWithdrawal();
  }, [user?._id]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  if (!withdrawal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaWallet size={20} /> Withdraw
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow rounded p-4">
          <div className="border-b pb-4 mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vendor withdraw information</h3>
            <FaWallet className="text-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center">
                <h5 className="font-medium">Amount:</h5>
                <span className="ml-2">PKR{withdrawal.amount}.00</span>
              </div>
              <div className="flex items-center">
                <h5 className="font-medium">Request time:</h5>
                <span className="ml-2">{new Date(withdrawal.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <h5 className="font-medium">Note:</h5>
                <span className="ml-2">{withdrawal.note || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <h5 className="font-medium">Status:</h5>
                <span className="ml-2">{withdrawal.status || 'Pending'}</span>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500 flex gap-2 items-center"
                onClick={handleModalShow}
              >
                Proceed <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-1/3 p-6">
              <h3 className="text-lg font-bold mb-4">Withdraw request process</h3>
              <div className="mb-4">
                <label htmlFor="approval" className="block font-medium mb-2">Request:</label>
                <select
                  className="w-full border rounded p-2 bg-none outline-none"
                  id="approval"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  {withdrawal.status === 'Pending' && <option value="Approved">Approve</option>}
                  {withdrawal.status === 'Pending' && <option value="Rejected">Deny</option>}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="note" className="block font-medium mb-2">Note about transaction or request:</label>
                <textarea
                  className="w-full border rounded p-2"
                  id="note"
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-500"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorWalletDetail;
