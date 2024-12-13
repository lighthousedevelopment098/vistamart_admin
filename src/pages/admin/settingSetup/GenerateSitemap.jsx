import React from "react";

const GenerateSitemap = () => {
  return (
    <div className="col-md-12 snipcss-JoY3b">
      <div className="card">
        <div className="border-bottom px-4 py-3">
          <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
            <img
              width="20"
              src="https://6valley.6amtech.com/public/assets/back-end/img/sitemap.png"
              alt="sitemap icon"
            />{" "}
            Generate sitemap
          </h5>
        </div>
        <div className="card-body text-center">
          <a
            href="/"
            className="btn  py-2 bg-primary text-white hover:bg-primary-dark text-capitalize px-4"
            style={{ color: "white" }}
          >
            Download generate sitemap
          </a>
        </div>
      </div>
    </div>
  );
};

export default GenerateSitemap;
