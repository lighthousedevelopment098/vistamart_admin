import React from 'react';
import { MdDelete } from 'react-icons/md';  // Delete icon
import { FiInfo } from 'react-icons/fi';    // Info icon
import { BsFillPlayFill } from 'react-icons/bs';  // Play Store icon
import { FaApple } from 'react-icons/fa';  // Apple Store icon
const DownloadAppSection = () => {
    return (
        <div className="card snipcss-zcstF">
            <div className="card-header">
                <h5 className="mb-0 text-capitalize">Download app section</h5>
            </div>
            <div className="card-body">
                <div className="card border shadow-none mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="title-color">Title</label>
                                    <input type="text" name="title" className="form-control outline-none hover:border-primary" defaultValue="Download Free Vendor App" placeholder="Enter title" />
                                </div>
                                <div className="form-group">
                                    <label className="title-color text-capitalize">Sub title</label>
                                    <input type="text" name="sub_title" className="form-control outline-none hover:border-r-primary" defaultValue="Download our free seller app and start reaching millions of buyers on the go! Easy setup, manage listings, and boost sales anywhere." placeholder="Enter title" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mx-auto max-w-150">
                                    <div className="mb-3 text-center">
                                        <label htmlFor="name" className="title-color text-capitalize font-weight-bold mb-0">Image</label>
                                        <span className="badge badge-soft-info">(Size 1:1)</span>
                                    </div>
                                    <div className="custom_upload_input">
                                        <input type="file" name="image" className="image-input" data-image-id="view-bp-logo" accept="image/*" />
                                        <span className="delete_file_input btn btn-outline-danger btn-sm square-btn d--none">
                                            <MdDelete />
                                        </span>
                                        <div className="img_area_with_preview position-absolute z-index-2">
                                            <img id="view-bp-logo" src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-1-1.png" className="bg-white h-auto" alt="" />
                                        </div>
                                        <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <img alt="" className="w-50" src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg" />
                                                <h5 className="text-muted text-capitalize">Upload image</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted text-center fz-12 mt-2"> Image format: Jpg, png, jpeg, webp, <br /> Image size: Max 2 MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border shadow-none mb-3">
                    <div className="card-body">
                        <div className="row gy-3">
                            <div className="col-lg-6">
                                <div className="d-flex gap-2 align-items-center text-capitalize mb-3 font-weight-bold">
                                    <BsFillPlayFill size={22} />
                                    Play store button
                                </div>
                                <div className="bg-aliceblue p-3 rounded">
                                    <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                                        <span className="title-color text-capitalize">
                                            Download link 
                                            <span className="input-label-secondary  cursor-pointer" data-toggle="tooltip" data-placement="right" title="If enabled, the Google Play Store will be visible in the website footer section">
                                                <FiInfo size={16} />
                                            </span>
                                        </span>
                                        <label className="switcher">
                                            <input type="checkbox" name="download_google_app_status" value="1" className="switcher_input" />
                                            <span className="switcher_control"></span>
                                        </label>
                                    </div>
                                    <input type="url" name="download_google_app" className="form-control outline-none hover:border-primary" placeholder="Ex: https://play.google.com/store/apps" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex gap-2 align-items-center text-capitalize mb-3 font-weight-bold">
                                    <FaApple size={22} />
                                    App store button
                                </div>
                                <div className="bg-aliceblue p-3 rounded">
                                    <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                                        <span className="title-color text-capitalize">
                                            Download link 
                                            <span className="input-label-secondary cursor-pointer" data-toggle="tooltip" data-placement="right" title="If enabled, the download button from the App Store will be visible in the footer section">
                                                <FiInfo size={16} />
                                            </span>
                                        </span>
                                        <label className="switcher">
                                            <input type="checkbox" name="download_apple_app_status" value="1" className="switcher_input" />
                                            <span className="switcher_control"></span>
                                        </label>
                                    </div>
                                    <input type="url" name="download_apple_app" className="form-control outline-none hover:border-primary" placeholder="Ex: https://www.apple.com/app-store/" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-end gap-3 mt-3 mx-1">
                    <button type="reset" className="btn btn-secondary px-5">reset</button>
                    <button type="submit" className="btn btn--primary bg-primary hover:bg-primary-dark px-5"
                    style={{color:"white"}}>submit</button>
                </div>
            </div>
        </div>
    );
};

export default DownloadAppSection;
