import React, { useState, useEffect } from "react";
import { FiSkipBack } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewImage from "../../../../components/FormInput/PreviewImage";
import FileUpload from "../../../../components/FormInput/FileUpload";
import apiConfig from "../../../../config/apiConfig";
import { getAuthData } from "../../../../utils/authHelper";
import { getUploadUrl, uploadImageToS3 } from "../../../../utils/helpers";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ApiUrl = `${apiConfig.admin}`;
const ApiUrls = `${apiConfig.seller}`;

const BannerUpdateForm = () => {
  const { id } = useParams(); // Get banner ID from URL
  const [bannerType, setBannerType] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [url, setUrl] = useState("");

  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  useEffect(() => {
    const { token } = getAuthData();
    setToken(token);

    const fetchBannerData = async () => {
      try {
        // Fetch the existing banner data for editing
        const bannerResponse = await axios.get(`${ApiUrl}/banners/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const banner = bannerResponse.data.doc;

        // Populate form fields with existing data
        setBannerType(banner?.bannerType);
        setResourceType(banner?.resourceType);
        setResourceId(banner?.resourceId || "");
        setCategory(banner?.category || "");
        setBrand(banner?.brand || "");
        setBannerImage(`${apiConfig.bucket}/${banner.bannerImage}`);
        setUrl(banner.url); // Set the URL for the banner
      } catch (error) {
        console.error("Error fetching banner:", error);
        toast.error("Error fetching banner data");
      }
    };

    fetchBannerData();
  }, [id]);

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const endpoints = {
          product: `${ApiUrls}/products/`,
          category: `${ApiUrl}/categories/`,
          brand: `${ApiUrl}/brands/`,
        };
        const response = await axios.get(endpoints[resourceType], {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.doc) {
          if (resourceType === "product") setProducts(response.data.doc);
          else if (resourceType === "category")
            setCategories(response.data.doc);
          else if (resourceType === "brand") setBrands(response.data.doc);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Error fetching resources");
      }
    };

    if (resourceType) {
      fetchResourceData();
    }
  }, [resourceType, token]);

  const handleBannerTypeChange = (e) => setBannerType(e.target.value);
  const handleResourceTypeChange = (e) => {
    setResourceType(e.target.value);
    setResourceId("");
    setCategory("");
    setBrand("");
  };
  const handleProductChange = (e) => setProductId(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("Image is too large. Maximum size is 2MB.");
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setBannerImage(objectUrl); // Update preview image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageKey = bannerImage; // Use existing image if no new upload
    if (selectedFile) {
      try {
        const uploadConfig = await getUploadUrl(selectedFile.type, "banners");
        imageKey = await uploadImageToS3(uploadConfig.url, selectedFile);
      } catch (error) {
        toast.error("Error uploading image");
        console.error("Error uploading image:", error);
        return;
      }
    }

    const data = {
      bannerType,
      resourceType,
      resourceId: {
        product: productId,
        category,
        brand,
      }[resourceType],
      url: e.target.url.value,
      bannerImage: imageKey, // Updated or existing image
    };

    try {
      console.log("banner=====", data);
      const response = await axios.put(`${ApiUrl}/banners/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Banner updated successfully");
        navigate("/bannersetup");

        // Optionally navigate back or reset the form
      } else {
        toast.error("Failed to update banner");
      }
    } catch (error) {
      toast.error("Error updating banner");
      console.error(
        "Error updating banner:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="content container-fluid snipcss-j33vn">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
            <img width="20" src="/banner.png" alt="Banner Icon" /> Update Banner
          </h2>
        </div>
        <div>
          <Link
            to="/bannersetup"
            className="btn flex align-items-center gap-2 text-white"
            style={{ background: "lightgreen" }}
          >
            <FiSkipBack /> Back
          </Link>
        </div>
      </div>

      <div className="row text-start">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="banner_form"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB"
                  autoComplete="off"
                />
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="banner_type"
                        className="title-color text-capitalize"
                      >
                        Banner Type
                      </label>
                      <select
                        className="form-control"
                        name="banner_type"
                        id="banner_type"
                        value={bannerType}
                        onChange={handleBannerTypeChange}
                      >
                        <option value="main-banner">Main Banner</option>
                        <option value="popup-banner">Popup Banner</option>
                        <option value="footer-banner">Footer Banner</option>
                        <option value="main-section-banner">
                          Main Section Banner
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="url"
                        className="title-color text-capitalize"
                      >
                        Banner URL
                      </label>
                      <input
                        type="url"
                        name="url"
                        className="form-control"
                        id="url"
                        required
                        placeholder="Enter URL"
                        value={url}
                        defaultValue=""
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="resource_type"
                        className="title-color text-capitalize"
                      >
                        Resource Type
                      </label>
                      <select
                        className="form-control"
                        name="resource_type"
                        id="resource_type"
                        value={resourceType}
                        onChange={handleResourceTypeChange}
                      >
                        <option value="product">Product</option>
                        <option value="category">Category</option>
                        {/* <option value="shop">Shop</option> */}
                        <option value="brand">Brand</option>
                      </select>
                    </div>
                    {resourceType === "product" && (
                      <div className="form-group">
                        <label
                          htmlFor="product_id"
                          className="title-color text-capitalize"
                        >
                          Product
                        </label>
                        <select
                          className="form-control"
                          name="product_id"
                          id="product_id"
                          value={productId}
                          onChange={handleProductChange}
                        >
                          {products.map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {resourceType === "category" && (
                      <div className="form-group">
                        <label
                          htmlFor="category_id"
                          className="title-color text-capitalize"
                        >
                          Category
                        </label>
                        <select
                          className="form-control"
                          name="category_id"
                          id="category_id"
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {resourceType === "shop" && (
                      <div className="form-group">
                        <label
                          htmlFor="shop_id"
                          className="title-color text-capitalize"
                        >
                          Shop
                        </label>
                        <select
                          className="form-control"
                          name="shop_id"
                          id="shop_id"
                          value={shop}
                          onChange={handleShopChange}
                        >
                          {shops.map((shop) => (
                            <option key={shop._id} value={shop._id}>
                              {shop.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {resourceType === "brand" && (
                      <div className="form-group">
                        <label
                          htmlFor="brand_id"
                          className="title-color text-capitalize"
                        >
                          Brand
                        </label>
                        <select
                          className="form-control"
                          name="brand_id"
                          id="brand_id"
                          value={brand}
                          onChange={handleBrandChange}
                        >
                          {brands.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {/* <div className="form-group">
                                            <label htmlFor="banner_image" className="title-color text-capitalize">Banner Image</label>
                                            <input type="file" name="banner_image" className="form-control" id="banner_image" onChange={handleImageChange} />
                                        </div> */}
                  </div>
                  <div className="col-lg-6 ">
                    <PreviewImage
                      image={bannerImage}
                      altText="Banner image"
                      style={{ width: "200px" }}
                    />
                    <FileUpload
                      name="image"
                      label="Banner Image (Ratio 1:1)"
                      accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="form-group mt-3 col-12 justify-end">
                  <button
                    type="submit"
                    className="btn bg-primary-500 text-white"
                    style={{ color: "white", background: "lightgreen" }}
                  >
                    Save Banner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUpdateForm;

// import React, { useState, useEffect } from 'react';
// import { FiSkipBack } from 'react-icons/fi';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PreviewImage from '../../../../components/FormInput/PreviewImage';
// import FileUpload from '../../../../components/FormInput/FileUpload';
// import apiConfig from '../../../../config/apiConfig';
// import { getAuthData } from '../../../../utils/authHelper';
// import { getUploadUrl, uploadImageToS3 } from '../../../../utils/helpers';

// const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
// const ApiUrl = `${apiConfig.admin}`;
// const ApiUrls = `${apiConfig.seller}`;

// const BannerUpdateForm = () => {
//     const { id } = useParams(); // Get banner ID from URL
//     const [bannerType, setBannerType] = useState('');
//     const [resourceType, setResourceType] = useState('');
//     const [productId, setProductId] = useState('');
//     const [category, setCategory] = useState('');
//     const [brand, setBrand] = useState('');
//     const [bannerImage, setBannerImage] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [url, setUrl] = useState('');  // New state for the banner URL
//     const navigate = useNavigate();

//     const [token, setToken] = useState('');

//     useEffect(() => {
//         const { token } = getAuthData();
//         setToken(token);

//         const fetchBannerData = async () => {
//             try {
//                 // Fetch the existing banner data for editing
//                 const bannerResponse = await axios.get(`${ApiUrl}/banners/${id}`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 const banner = bannerResponse.data.doc;

//                 // Populate form fields with existing data
//                 setBannerType(banner.bannerType);
//                 setResourceType(banner.resourceType);
//                 setProductId(banner.productId || '');
//                 setCategory(banner.category || '');
//                 setBrand(banner.brand || '');
//                 setBannerImage(`${apiConfig.bucket}/${banner?.bannerImage}`);
//                 setUrl(banner.url);  // Set the URL for the banner
//             } catch (error) {
//                 console.error('Error fetching banner:', error);
//                 toast.error('Error fetching banner data');
//             }
//         };

//         fetchBannerData();
//     }, [id]);

//     useEffect(() => {
//         const fetchResourceData = async () => {
//             try {
//                 const endpoints = {
//                     product: `${ApiUrls}/products/`,
//                     category: `${ApiUrl}/categories/`,
//                     brand: `${ApiUrl}/brands/`,
//                 };
//                 const response = await axios.get(endpoints[resourceType], {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 if (response.data.doc) {
//                     if (resourceType === 'product') setProducts(response.data.doc);
//                     else if (resourceType === 'category') setCategories(response.data.doc);
//                     else if (resourceType === 'brand') setBrands(response.data.doc);
//                 }
//             } catch (error) {
//                 console.error('Error fetching resources:', error);
//                 toast.error('Error fetching resources');
//             }
//         };

//         if (resourceType) {
//             fetchResourceData();
//         }
//     }, [resourceType, token]);

//     const handleBannerTypeChange = (e) => setBannerType(e.target.value);
//     const handleResourceTypeChange = (e) => {
//         setResourceType(e.target.value);
//         setProductId('');
//         setCategory('');
//         setBrand('');
//     };
//     const handleProductChange = (e) => setProductId(e.target.value);
//     const handleCategoryChange = (e) => setCategory(e.target.value);
//     const handleBrandChange = (e) => setBrand(e.target.value);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > MAX_IMAGE_SIZE) {
//                 toast.error('Image is too large. Maximum size is 2MB.');
//                 return;
//             }
//             setSelectedFile(file);
//             const objectUrl = URL.createObjectURL(file);
//             setBannerImage(objectUrl); // Update preview image
//         }
//     };

//     const handleUrlChange = (e) => {
//         setUrl(e.target.value);  // Update URL state on change
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let imageKey = bannerImage; // Use existing image if no new upload
//         if (selectedFile) {
//             try {
//                 const uploadConfig = await getUploadUrl(selectedFile.type, "banners");
//                 imageKey = await uploadImageToS3(uploadConfig.url, selectedFile);
//             } catch (error) {
//                 toast.error('Error uploading image');
//                 console.error('Error uploading image:', error);
//                 return;
//             }
//         }

//         const data = {
//             bannerType,
//             resourceType,
//             resourceId: {
//                 product: productId,
//                 category,
//                 brand
//             }[resourceType],
//             url: url,  // Use the updated URL state
//             publish: false, // Example publish value
//             bannerImage: imageKey // Updated or existing image
//         };

//         try {
//             const response = await axios.put(`${ApiUrl}/banners/${id}`, data, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.status === 200) {
//                 toast.success('Banner updated successfully');
//                 navigate('/bannersetup');
//             } else {
//                 toast.error('Failed to update banner');
//             }
//         } catch (error) {
//             toast.error('Error updating banner');
//             console.error('Error updating banner:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div className="content container-fluid snipcss-j33vn">
//             <ToastContainer />
//             <div className="d-flex justify-content-between mb-3">
//                 <div>
//                     <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                         <img width="20" src="/banner.png" alt="Banner Icon" /> Update Banner
//                     </h2>
//                 </div>
//                 <div>
//                     <Link to='/bannersetup' className="btn flex align-items-center gap-2 text-white" style={{ background: "lightgreen" }}>
//                         <FiSkipBack /> Back
//                     </Link>
//                 </div>
//             </div>
//             <div className="row text-start">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit} encType="multipart/form-data" className="banner_form">
//                                 <div className="row g-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="banner_type" className="title-color text-capitalize">Banner Type</label>
//                                             <select className="form-control" name="banner_type" id="banner_type" value={bannerType} onChange={handleBannerTypeChange}>
//                                                 <option value="main-banner">Main Banner</option>
//                                                 <option value="popup-banner">Popup Banner</option>
//                                                 <option value="footer-banner">Footer Banner</option>
//                                                 <option value="main-section-banner">Main Section Banner</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="url" className="title-color text-capitalize">Banner URL</label>
//                                             <input type="url" name="url" className="form-control" id="url" required placeholder="Enter URL" value={url} onChange={handleUrlChange} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="resource_type" className="title-color text-capitalize">Resource Type</label>
//                                             <select className="form-control" name="resource_type" id="resource_type" value={resourceType} onChange={handleResourceTypeChange}>
//                                                 <option value="product">Product</option>
//                                                 <option value="category">Category</option>
//                                                 <option value="brand">Brand</option>
//                                             </select>
//                                         </div>
//                                         {/* Resource selection logic */}
//                                         {resourceType === 'product' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="product_id">Product</label>
//                                                 <select className="form-control" name="product_id" id="product_id" value={productId} onChange={handleProductChange}>
//                                                     {products.map((product) => (
//                                                         <option key={product.id} value={product.id}>{product.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'category' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="category_id">Category</label>
//                                                 <select className="form-control" name="category_id" id="category_id" value={category} onChange={handleCategoryChange}>
//                                                     {categories.map((category) => (
//                                                         <option key={category.id} value={category.id}>{category.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {resourceType === 'brand' && (
//                                             <div className="form-group">
//                                                 <label htmlFor="brand_id">Brand</label>
//                                                 <select className="form-control" name="brand_id" id="brand_id" value={brand} onChange={handleBrandChange}>
//                                                     {brands.map((brand) => (
//                                                         <option key={brand.id} value={brand.id}>{brand.name}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="banner_image" className="title-color text-capitalize">Banner Image</label>
//                                             <FileUpload
//                                                 id="banner_image"
//                                                 value={bannerImage}
//                                                 onFileChange={handleImageChange}
//                                             />
//                                             {bannerImage && <PreviewImage src={bannerImage} />}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <button type="submit" className="btn btn-success">Save Changes</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BannerUpdateForm;
