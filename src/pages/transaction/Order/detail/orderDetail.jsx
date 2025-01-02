import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IoIosPrint } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrderStatus,
  fetchOrderById,
  updateOrder,
} from "../../../../redux/slices/transaction/orderSlice";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import apiConfig from "../../../../config/apiConfig";
import axios from "axios";
import { getAuthData } from "../../../../utils/authHelper";

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from URL parameters
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null); // State to store order details
  const [loading, setLoading] = useState(true); // State to handle loading


  // const { orders, status, error } = useSelector((state) => state.vendorOrder);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [paymentStatus, setPaymentStatus] = useState(false);
  const fallbackImage = "/image-place-holder.png"; // Replace with the path to your fallback image
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupId, setPickupId] = useState(null); // State to store Pickup ID


  const {token, user} = getAuthData();
  // Fetch order by ID
  useEffect(() => {
    const fetchOrder = async () => {
      const {token } = getAuthData();
      try {
        const response = await axios.get(
          `${apiConfig.transaction}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data?.status === "success") {
          setOrder(response.data.doc); // Store order details in state
        } else {
          toast.error("Failed to fetch order details.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching the order.");
        toast.error("An error occurred while fetching the order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const printInvoice = () => {
    // Store the current body content to restore later
    const originalContent = document.body.innerHTML;
  
    // Select only the content you want to print
    const printContent = document.getElementById("orderDetailsForPrint").innerHTML;
  
    // Set the content of the page to the order details
    document.body.innerHTML = printContent;
  
    // Trigger the print dialog
    window.print();
  
    // Restore the original content after printing
    document.body.innerHTML = originalContent;
  };

  useEffect(() => {
    const fetchPickupId = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.seller}/shippingInfo?vendorId=${user?._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Access the first item in the `doc` array to get `pickingAddressId`
        const pickingAddressId = response.data.doc?.[0]?.pickingAddressId || null;
  
        setPickupId(pickingAddressId);
      } catch (err) {
        console.error("Failed to fetch Pickup ID:", err.response || err.message);
      }
    };
  
    fetchPickupId();
  }, [token, user?._id]);


  const cleanHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const shippingCategoryId = order?.products?.[0]?.productDetails?.category?.shippingCategoryId;
  const shippingCategoryDescription = order?.products?.[0]?.productDetails?.description;
  const cleanedDescription = cleanHTML(shippingCategoryDescription);
  
  

  const handleBookShipping = async () => {   
    
    if (!pickupId) {
      toast.error("Pickup address not found. Please add a pickup address.");
      setTimeout(() => {
        navigate("/addpickupaddress"); 
      }, 2000); // Delay of 2 seconds
      return;
    }
  
    const payload = {
      service_type_id: 1,
      pickup_address_id: pickupId,
      information_display: 0,
      consignee_city_id: order?.shippingAddress?.cityId,
      consignee_name: order?.customer?.firstName,
      consignee_address: order?.shippingAddress?.address,
      consignee_phone_number_1: order?.shippingAddress?.phoneNumber,
      consignee_email_address: order?.customer?.email,
      order_id: order?.orderId, // Dynamic Order ID
      item_product_type_id: shippingCategoryId || 3, // category id 
      item_description: cleanedDescription,
      item_quantity: order?.totalQty || 1, 
      item_insurance: 0,
  
      pickup_date: pickupDate, // Pickup Date from Form
      special_instructions: "Please call before delivery",
      estimated_weight: parseFloat(totalWeight.toFixed(2)) || 1, // Total weight
      shipping_mode_id: 1,
     
      amount: order?.totalAmount,
      payment_mode_id: 1,
      charges_mode_id: 4,
      open_shipment: 0,
      pieces_quantity: 1,
      shipper_reference_number_1: "Abdullah 1122",
    };
  
    try {
      console.log("Data to be submitted:", payload);
      const response = await fetch("https://app.sonic.pk/api/shipment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Shipping data:", data);
  
        
        const trackingId = data.tracking_number;

        await dispatch(updateOrder({ orderId: order?._id, trackingId })).unwrap();
  
        toast.success(`Shipping booked successfully! Tracking Number: ${data.tracking_number}`);
        setShowModal(false); // Close modal
       
        setTimeout(() => {
          navigate("/orderlist")
        }, 2000); // Delay of 2 seconds
          

    
      } else {
        toast.error("Failed to book shipping. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while booking shipping:", error);
      toast.error("An error occurred while booking shipping.");
    }
  };
  


  

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status })).unwrap();
      toast.success("Order status updated successfully!");
      if (status === "confirmed") {
        navigate("/confirmedorder");
      } else if (status === "packaging") {
        navigate("/packagingorder");
      } else if (status === "pending") {
        navigate("/pendingorder");
      } else if (status === "out_for_delivery") {
        navigate("/outfordelivery");
      } else if (status === "delivered") {
        navigate("/deliveredorder");
      } else if (status === "canceled") {
        navigate("/cancelledorder");
      } else if (status === "failed_to_deliver") {
        navigate("/failedorder");
      } else if (status === "returned") {
        navigate("/returnedorder");
      }
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  const togglePaymentStatus = () => {
    setPaymentStatus(!paymentStatus);
  };

  const subtotal = order?.products?.reduce((total, item) => {
    return total + (item.productDetails?.price || 0) * (item?.quantity || 0);
  }, 0);

  // Calculate total weight
const totalWeight = order?.products.reduce(
  (sum, item) => sum + (item.productDetails?.weight || 0) * (item.quantity || 1),
  0
);
console.log("weight caluclate----", totalWeight)


  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  // // Check for errors
  // if (status === "failed") {
  //   return <div>Error fetching orders details: {error}</div>;
  // }
  

 
  return (
    <>
      <div className="bg-[#F9F9FB] w-full px-4 py-8">
        <div className="flex items-center gap-2">
          <img src="/all-orders.png" alt="" className="w-5 h-5" />
          <h1 className="text-xl font-bold">Order Details</h1>
        </div>
        <br />
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="col-span-1 lg:col-span-4 bg-white rounded h-full border-gray-400 hover:shadow-md p-2">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[1rem] font-bold pb-5">
                  Order ID #{order?.orderId}
                </h2>
                <p>{new Date(order?.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
              {
}
<div className="flex items-center gap-2">
  {order?.trackingId !== "0" ? (
    <p className="bg-secondary-500 font-bold p-1 rounded border text-primary-500 mt-3 mb-2">
      Tracking ID: {order?.trackingId}
    </p>
  ) : order?.status === "packaging" ? (
    <Button
      variant="primary"
      className="bg-primary-500 text-white hover:bg-primary-dark-500"
      onClick={handleShow}
    >
      Book Shipping
    </Button>
  ) : (
    <p className="text-gray-500">No Tracking ID</p>
  )}
</div>
               
                <button
                  className="borders rounded px-3 py-2  bg-primary flex items-center gap-2 text-white hover:bg-primary-dark"
                  onClick={printInvoice}
                  style={{ color: "white" }}
                >
                  <IoIosPrint className="text-white" /> Print Invoice
                </button>
              </div>
            </div>
            <div className="text-end pt-2">
              <h1>
                Status :
                <span
                  className={`bg-secondary-500  font-bold p-1 rounded border text-primary-500 mb-3`}
                    
               >
                  {order?.status}
                </span>
              </h1>
             
              <h1 className="pt-3 text-md">
                Payment Method :
                <span className="font-bold text-md">{order?.paymentMethod}</span>
              </h1>
              <h1 className="pt-3 text-md">
                Payment Status :
                <span className={`font-bold text-primary-500 ms-3`}>
                  {paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </h1>
              <h1 className="pt-3 text-md">
                order verification code :
                <span className="font-bold ms-3"> {order?.orderId}</span>
              </h1>
            </div>
            <div className="container p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-secondary-500 text-gray-500">
                      <th className="px-4 py-2 text-center font-semibold text-sm whitespace-nowrap">
                        SL
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-sm whitespace-nowrap">
                        Item Details
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-sm whitespace-nowrap">
                        Item Price
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-sm whitespace-nowrap">
                        Tax
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-sm whitespace-nowrap">
                        Item Discount
                      </th>
                      <th className="px-4 py-2 text-center font-bold text-sm whitespace-nowrap">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products && order?.products?.length > 0 ? (
                      order?.products?.map((item, index) => (
                        <tr className="hover:bg-gray-100" key={item?._id}>
                          <td className="px-4 py-2 text-center">{index + 1}</td>
                          <td className="px-4 py-2 w-full">
                            <div className="flex items-center whitespace-nowrap">
                            {item?.productDetails ? (
  <img
    src={
      item.productDetails.thumbnail
        ? `${apiConfig.bucket}/${item.productDetails.thumbnail}`
        : fallbackImage
    }
    alt={item.productDetails.name || "Product Image"}
    className="w-10 h-10 object-cover rounded mr-3"
    onError={(e) => (e.target.src = fallbackImage)}
  />
) : (
  <img
    src={fallbackImage}
    alt="Fallback Product Image"
    className="w-10 h-10 object-cover rounded mr-3"
  />
)}



                              <div>
                                <div>{item?.name}</div>
                                <div>Qty: {item?.quantity}</div>
                                <div>
                                  Unit price: PKR {item?.price} (Tax:{" "}
                                  {item?.taxAmount}%)
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            PKR {item?.price}
                          </td>
                          <td className="px-4 py-2 text-center">
                            PKR {item?.taxAmount}
                          </td>
                          <td className="px-4 py-2 text-center">
                            PKR {item?.discountAmount}
                          </td>
                          <td className="px-4 py-2 text-center">
                            PKR {item?.price + item?.taxAmount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No products available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
             
              <div className="mt-4 flex  gap-2 flex-col">
  <div className="flex justify-between">
    <span>Sub Total</span>
    <span>Rs. {subtotal}</span>
  </div>
 
  <div className="flex justify-between">
    <span>Shipping</span>
    <span>Rs. {order?.totalShippingCost.toLocaleString()}</span>
  </div>

  <div className="flex justify-between">
    <span>Discount</span>
    <span>- Rs. {order?.totalDiscount.toLocaleString()}</span>
  </div>
 <div className="flex justify-between">
    <span>Tax</span>
    <span>Rs. {order?.totalTaxAmount.toLocaleString()}</span>
  </div>
  <div className="flex justify-between border-t pt-2">
    <span>Payment Method</span>
    <span>{order?.paymentMethod}</span>
  </div>
  <div className="flex justify-between font-bold border-t pt-2">
    <span>Total Amount (after tax, discount, and shipping)</span>
    <span>
      Rs.{" "}
      {(
        subtotal +
        order?.totalTaxAmount +
        order?.totalShippingCost -
        order?.totalDiscount
      ).toLocaleString()}
    </span>
  </div>
</div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">
                  Order & Shipping Info
                </h2>
                <div>
                  <label className="block">
                    <span className="text-gray-700 font-semibold">
                      Change Order Status
                    </span>
                    <select
                      className="form-select mt-1 border bg-white borders border-gray-400 px-3 py-2 rounded block w-full"
                      value={order?.status}
                      onChange={(e) =>
                        handleUpdateStatus(order?._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Cancelled</option>
                      <option value="packaging">Packaging</option>
                      <option value="out_for_delivery">Out_for_delivery</option>
                       <option value="failed_to_deliver">
                        Failed_to_deliver
                      </option> 
                      <option value="returned">Returned</option>
                    </select>
                  </label>
                  {/* <label className="mt-3 flex justify-between items-center bg-white border border-gray-400 px-3 py-2 rounded">
                    <span className="text-gray-700">Payment Status</span>
                    <div className="flex items-center mt-1">
                      <span className="mr-2 text-primary-500">Paid</span>
                      <button
                        onClick={togglePaymentStatus}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
                          order?.paymentStatus ? "bg-primary-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`${
                            order?.paymentStatus ? "translate-x-6" : "translate-x-1"
                          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
                        />
                      </button>
                    </div>
                  </label> */}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <h2 className="text-md flex items-center gap-2 font-semibold">
                  <IoPersonSharp /> Customer information
                </h2>
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      src={
                        order?.customer?.image
                          ? `${apiConfig.bucket}/${order?.customer?.image}`
                          : fallbackImage
                      }
                      alt="Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="text-md font-medium">{order?.customer?.firstName}</p>
                    {/* <p className="text-gray-500">17 order</p> */}
                    <p className="text-gray-500">{order?.customer?.phoneNumber}</p>
                    <p className="text-gray-500">{order?.customer?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold flex gap-2">
                    <IoPersonSharp /> Shipping Address
                  </h2>
                  {/* <MdEdit className="text-[2rem] p-1 border hover:bg-primary-dark hover:text-white rounded border-primary bg-primary text-white" /> */}
                </div>
                <div className="space-y-1">
                  <p className="text-md font-medium">{order?.customer?.firstName}</p>
                  <p className="text-gray-500">
                    Contact: {order?.customer?.phoneNumber}
                  </p>
                  <p className="text-gray-500">
                    Country: {order?.shippingAddress?.country}
                  </p>
                  <p className="text-gray-500">City: {order?.shippingAddress?.city}</p>
                  <p className="text-gray-500">
                    Zip Code: {order?.shippingAddress?.zipCode}
                  </p>
                  <p className="text-gray-500">
                    address: {order?.shippingAddress?.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold flex gap-2">
                    <IoPersonSharp /> Billing Address
                  </h2>
                  {/* <MdEdit className="text-[2rem] p-1 border hover:bg-primary-dark hover:text-white rounded border-primary text-white bg-primary" /> */}
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">
                    Country: {order?.billingAddress?.country}
                  </p>
                  <p className="text-gray-500">City: {order?.billingAddress?.city} </p>
                  <p className="text-gray-500">
                    Zip Code: {order?.billingAddress?.zipCode}
                  </p>
                  <p className="text-gray-500">
                    Address: {order?.billingAddress?.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>

              <div className="mb-4 p-4 bg-white rounded shadow-md">
                <h3 className="text-lg font-semibold">
                  Name: {order?.vendor?.firstName || "N/A"}
                </h3>
                <img
                  src={
                    order?.vendor?.vendorImage
                      ? `${apiConfig.bucket}/${order?.vendorImage}`
                      : fallbackImage
                  }
                  alt={order?.vendor?.name || "N/A"}
                  className="w-16 h-16 object-cover rounded mb-2"
                />
                <div>
                  <p className="text-lg font-bold">
                    Shop: {order?.vendor?.shopName || "N/A"}
                  </p>
                  {/* <p className="text-gray-500 pt-3">Vendor Orders: 9 Orders Served</p> */}
                  <p className="text-gray-500">
                    Vendor No: {order?.vendor?.phoneNumber || "N/A"}
                  </p>
                  <p className="text-gray-500 flex justify-center gap-2">
                    <FaMapMarkerAlt className="text-xl" />
                    {order?.vendor?.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Book Shipping Modal */}
       {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Book Shipping</h2>
            {/* <label className="block mb-2 text-sm font-medium">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter weight"
            /> */}
            <label className="block mb-2 text-sm font-medium">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Restrict to current or future dates

              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBookShipping}
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-dark-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;



