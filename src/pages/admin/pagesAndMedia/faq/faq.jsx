import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const FaqList = () => {
  // Define your FAQ data array
  const [faqs, setFaqs] = useState([
   
    // {
    //   id: 4,
    //   question: "How do I register as a seller?",
    //   answer:
    //     'To register, click on the "Sign Up" button, fill in your details, and verify your account via email.',
    //   priority: 1,
    //   status: true,
    // },
  ]);

  const handleStatusToggle = (id) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, status: !faq.status } : faq))
    );
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="card mt-3 snipcss-rviUJ">
      <div className="px-3 py-4">
        <div className="d-flex flex-wrap justify-content-between gap-3 align-items-center">
          <div className="">
            <h5 className="text-capitalize d-flex gap-2">
              FAQ list{" "}
              {/* <span className="badge badge-soft-dark radius-50 fz-12">
                 {faqs.length} 
              </span> */}
            </h5>
          </div>
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <form>
              <div className="input-group input-group-custom input-group-merge">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FaSearch />
                  </div>
                </div>
                <input
                  type="search"
                  name="searchValue"
                  className="form-control outline-none hover:border-primary"
                  placeholder="Search by question & answer"
                />
                <button type="submit" className="btn btn--primary bg-primary hover:bg-primary-dark"
                style={{color:"white"}}>
                  Search
                </button>
              </div>
            </form>
            <button
              type="button"
              className="btn btn--primary bg-primary hover:bg-primary-dark flex gap-2 justify-center align-items-center"
              style={{color:"white"}}
            >
              {/* <FaPlus /> Add FAQ */}
              Add FAQ
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 text-start">
          <thead className="thead-light thead-50 text-capitalize">
            <tr>
              <th>SL</th>
              <th>Question</th>
              <th>Answer</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq.id}>
                <td>{index + 1}</td>
                <td>
                  <h5 className="text-wrap max-w-500 min-w-120">
                    {faq.question}
                  </h5>
                </td>
                <td>
                  <div className="text-wrap max-w-500 min-w-200">
                    {faq.answer}
                  </div>
                </td>
                <td className="text-center">{faq.priority}</td>
                <td className="text-center">
                  <label className="switcher mx-auto">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      checked={faq.status}
                      onChange={() => handleStatusToggle(faq.id)}
                    />
                    <span className="switcher_control"></span>
                  </label>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-10">
                    <button
                      className="btn btn-outline--primary btn-sm edit"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      title="Delete"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqList;
