import React from 'react';
import { MdDelete } from 'react-icons/md';

const BusinessProcess = () => {
    return (
        <div className="card snipcss-1UDty">
            <div className="card-header">
                <h5 className="mb-0 text-capitalize">Business process</h5>
            </div>
            <div className="card-body">
                <div className="card border shadow-none mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="title-color">Title</label>
                                    <input type="text" name="title" className="form-control outline-none hover:border-primary" defaultValue="3 Easy Steps To Start Selling" placeholder="Enter title" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="title-color">Sub title</label>
                                    <input type="text" name="sub_title" className="form-control outline-none hover:border-primary" defaultValue="Start selling quickly! Register, upload your products with detailed info and images, and reach millions of buyers instantly." placeholder="Enter sub title" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border shadow-none mb-2">
                    <div className="card-body">
                        <h5 className="mb-4">Section 1</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="title-color">Title</label>
                                    <input type="text" name="section_1_title" className="form-control outline-none hover:border-primary" defaultValue="Get Registered" placeholder="messages.enter_title" />
                                </div>
                                <div className="form-group">
                                    <label className="title-color text-capitalize">Short description</label>
                                    <textarea name="section_1_description" className="form-control outline-none hover:border-primary" rows="4" placeholder="Write description...">Sign up easily and create your seller account in just a few minutes. It's fast and simple to get started.</textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mx-auto max-w-150">
                                    <div className="mb-3 text-center">
                                        <label htmlFor="name" className="title-color text-capitalize font-weight-bold mb-0">Image</label>
                                        <span className="badge badge-soft-info">(Size: 1:1)</span>
                                    </div>
                                    <div className="custom_upload_input">
                                        <input type="file" name="section_1_image" className="image-input" data-image-id="view-bp-logo-1" accept="image/*" />
                                        <span className="delete_file_input btn btn-outline-danger btn-sm square-btn d--none">
                                            <MdDelete />
                                        </span>
                                        <div className="img_area_with_preview position-absolute z-index-2">
                                            <img id="view-bp-logo-1" src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-1-1.png" className="bg-white h-auto" alt="placeholder" />
                                        </div>
                                        <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <img alt="upload icon" className="w-50" src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg" />
                                                <h5 className="text-muted">Upload Image</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted text-center fz-12 mt-2"> Image format: Jpg, png, jpeg, webp, <br /> Image size: Max 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border shadow-none mb-2">
                    <div className="card-body">
                        <h5 className="mb-4">Section 2</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="title-color">Title</label>
                                    <input type="text" name="section_2_title" className="form-control outline-none hover:border-primary" defaultValue="Upload Products" placeholder="messages.enter_title" />
                                </div>
                                <div className="form-group">
                                    <label className="title-color text-capitalize">Short description</label>
                                    <textarea name="section_2_description" className="form-control outline-none hover:border-primary" rows="4" placeholder="messages.write_description...">List your products with detailed descriptions and high-quality images to attract more buyers effortlessly.</textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mx-auto max-w-150">
                                    <div className="mb-3 text-center">
                                        <label htmlFor="name" className="title-color text-capitalize font-weight-bold mb-0">Image</label>
                                        <span className="badge badge-soft-info">(Size: 1:1)</span>
                                    </div>
                                    <div className="custom_upload_input">
                                        <input type="file" name="section_2_image" className="image-input" data-image-id="view-bp-logo-2" accept="image/*" />
                                        <span className="delete_file_input btn btn-outline-danger btn-sm square-btn d--none">
                                            <MdDelete />
                                        </span>
                                        <div className="img_area_with_preview position-absolute z-index-2">
                                            <img id="view-bp-logo-2" src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-1-1.png" className="bg-white h-auto" alt="placeholder" />
                                        </div>
                                        <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <img alt="upload icon" className="w-50" src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg" />
                                                <h5 className="text-muted">Upload Image</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted text-center fz-12 mt-2"> Image format: Jpg, png, jpeg, webp, <br /> Image size: Max 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border shadow-none mb-2">
                    <div className="card-body">
                        <h5 className="mb-4">Section 3</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="title-color">Title</label>
                                    <input type="text" name="section_3_title" className="form-control outline-none hover:border-primary" defaultValue="Start Selling" placeholder="messages.enter_title" />
                                </div>
                                <div className="form-group">
                                    <label className="title-color text-capitalize">Short description</label>
                                    <textarea name="section_3_description" className="form-control outline-none hover:border-primary" rows="4" placeholder="messages.write_description...">Go live and start reaching millions of potential buyers immediately. Watch your sales grow with our vast audience.</textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mx-auto max-w-150">
                                    <div className="mb-3 text-center">
                                        <label htmlFor="name" className="title-color text-capitalize font-weight-bold mb-0">Image</label>
                                        <span className="badge badge-soft-info">(Size: 1:1)</span>
                                    </div>
                                    <div className="custom_upload_input">
                                        <input type="file" name="section_3_image" className="image-input" data-image-id="view-bp-logo-3" accept="image/*" />
                                        <span className="delete_file_input btn btn-outline-danger btn-sm square-btn d--none">
                                            <MdDelete />
                                        </span>
                                        <div className="img_area_with_preview position-absolute z-index-2">
                                            <img id="view-bp-logo-3" src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-1-1.png" className="bg-white h-auto" alt="placeholder" />
                                        </div>
                                        <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <img alt="upload icon" className="w-50" src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg" />
                                                <h5 className="text-muted">Upload Image</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted text-center fz-12 mt-2"> Image format: Jpg, png, jpeg, webp, <br /> Image size: Max 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-end gap-3 mt-3 mx-1">
                    <button type="reset" className="btn btn-secondary px-5">Reset</button>
                    <button type="submit" className="btn btn--primary bg-primary hover:bg-primary-dark px-5"
                    style={{color:"white"}}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BusinessProcess;
