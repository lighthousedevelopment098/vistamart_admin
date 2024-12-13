import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  updateProductStatus,
  toggleFeatured,
} from '../../../../../redux/slices/seller/productSlice';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../../../../../components/LoodingSpinner/LoadingSpinner';
import { FaEye } from 'react-icons/fa';
import ActionButton from '../../../../../components/ActionButton/Action';

const VenderProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select products and loading/error state from Redux
  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ userId: id }));
  }, [dispatch, id]);




  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change the status to ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateProductStatus({ productId: id, status: newStatus }))
          .then(() => toast.success(`Product status updated to ${newStatus}!`))
          .catch(() => toast.error('Failed to update product status.'));
      } else {
        toast.info('Status update canceled.');
      }
    });
  };



  const handleToggleFeatured = (product) => {
    if (typeof product.isFeatured !== 'boolean') {
      return; // Prevent further action if the property is not defined
    }
  
    const newStatus = !product.isFeatured; // Toggle the featured status
    dispatch(toggleFeatured({ productId: product._id, isFeatured: newStatus }))
      .then(() => toast.success(`Product featured status updated to ${newStatus ? 'featured' : 'not featured'}.`))
      .catch(() => toast.error('Failed to update featured status.'));
  };
  
  // Handle loading and error states
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="row pt-2 snipcss-W7Odc">
      <div className="col-md-12">
        <div className="card h-100">
          <div className="px-3 py-4">
            <h5 className="mb-0 d-flex align-items-center gap-2">
              Products{' '}
              <span className="badge badge-soft-dark radius-50 fz-12">
                {products.length}
              </span>
            </h5>
          </div>
          <div className="table-responsive datatable-custom">
            <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 style-rXVHW">
              <thead className="thead-light thead-50 text-capitalize">
                <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th className="text-center">Featured</th>
                  <th className="text-center">Active Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody id="set-rows">
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td className="text-center">
                      <label className="switcher mx-auto">
                        <input
                          type="checkbox"
                          className="switcher_input toggle-switch-message"
                          checked={product.isFeatured}
                          onChange={() => handleToggleFeatured(product)}
                        />
                        <span className="switcher_control"></span>
                      </label>
                    </td>
                    <td className="text-center">
                      <label className="switcher mx-auto">
                        <input
                          type="checkbox"
                          className="switcher_input toggle-switch-message"
                          checked={product.status === 'approved'}
                          onChange={() => handleUpdateStatus(product._id, product.status)}
                        />
                        <span className="switcher_control"></span>
                      </label>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-10">
                      <ActionButton
            to={`/products/${product._id}`}
            icon={FaEye}
       
          />
                     
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VenderProduct;
