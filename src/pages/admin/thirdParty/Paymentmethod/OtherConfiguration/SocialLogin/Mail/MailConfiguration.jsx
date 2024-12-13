import React, { useState } from "react";
import Mail from "./Mail";

const MailConfiguration = () => {
  const [activeTab, setActiveTab] = useState("mail-config"); // State to track active tab
  const [testEmail, setTestEmail] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSendTestMail = () => {
    // Logic to send test mail (you can implement your actual sending logic here)
    console.log("Sending test mail to:", testEmail);
    // Here you can implement actual sending logic, e.g., using an API call
    // Dummy example: alert(`Sending test mail to: ${testEmail}`);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-3">
          <div className="bg-white rounded-top">
            <div className="card-body pb-0">
              <div className="d-flex flex-wrap justify-content-between gap-3 border-bottom">
                <nav>
                  <div
                    className="nav nav-tabs border-0 "
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      className={`nav-link ${
                        activeTab === "mail-config" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("mail-config")}
                    >
                      Mail configuration
                    </button>
                    <button
                      className={`nav-link ${
                        activeTab === "send-test-mail" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("send-test-mail")}
                    >
                      Send test mail
                    </button>
                  </div>
                </nav>
              </div>
              <div className="tab-content">
                {activeTab === "mail-config" && (
                  // <div className="tab-pane fade show active" id="mail-config" role="tabpanel" aria-labelledby="mail-config-tab">
                  //   <div className="bg-white rounded-bottom overflow-hidden">
                  //     <div className="bg-white card-body">
                  //       <form className="" action="javascript:">
                  //         <div className="row">
                  //           <div className="col-xl-8 col-lg-10">
                  //             <div className="d-flex align-items-end gap-2 gap-sm-3">
                  //               <div className="flex-grow-1">
                  //                 <label className="title-color">Email</label>
                  //                 <input
                  //                   type="email"
                  //                   id="test-email"
                  //                   className="form-control"
                  //                   placeholder="Ex: jhon@email.com"
                  //                   value={testEmail}
                  //                   onChange={(e) => setTestEmail(e.target.value)}
                  //                 />
                  //               </div>
                  //               <button type="button" className="btn btn--primary px-sm-5" onClick={handleSendTestMail}>
                  //                 <i className="tio-telegram"></i> Send mail
                  //               </button>
                  //             </div>
                  //           </div>
                  //         </div>
                  //       </form>
                  //     </div>
                  //   </div>
                  // </div>
                  <Mail />
                )}
                {activeTab === "send-test-mail" && (
                  <div
                    className="tab-pane fade show active"
                    id="send-test-mail"
                    role="tabpanel"
                    aria-labelledby="send-test-mail-tab"
                  >
                    <div className="bg-white rounded-bottom overflow-hidden">
                      <div className="bg-white card-body">
                        <form className="" action="javascript:">
                          <div className="row">
                            <div className="col-xl-8 col-lg-10">
                              <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex flex-col md:flex-row items-center  gap-2">
                                  <div className="flex-grow">
                                    <label className="title-color">Email</label>
                                    <input
                                      type="email"
                                      id="test-email"
                                      className="form-control w-full sm:w-64 md:w-96"
                                      placeholder="Ex: jhon@email.com"
                                      value={testEmail}
                                      onChange={(e) =>
                                        setTestEmail(e.target.value)
                                      }
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="bg-primary hover:bg-primary-dark px-4 py-2 sm:py-3 shadow-md rounded-md w-full mt-0 md:mt-6  "
                                    style={{ color: "white" }}
                                    onClick={handleSendTestMail}
                                  >
                                    Send mail
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailConfiguration;
