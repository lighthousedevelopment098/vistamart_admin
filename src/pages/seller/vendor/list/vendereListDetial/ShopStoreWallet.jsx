import React from 'react';
// import './VendorWallet.css'; // Make sure to create and import the corresponding CSS file

const VendorWallet = () => {
  // Define arrays for dynamic content
  const vendorWalletData = [
    {
      id: 1,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png',
      amount: 'PKR 0',
      description: 'Withdrawable balance',
    },
    {
      id: 2,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/pw.png',
      amount: 'PKR 0',
      description: 'Pending Withdraw',
    },
    {
      id: 3,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/tcg.png',
      amount: 'PKR 0',
      description: 'Total Commission given',
    },
    {
      id: 4,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/aw.png',
      amount: 'PKR 0',
      description: 'Aready Withdrawn',
    },
    {
      id: 5,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/tdce.png',
      amount: 'PKR 0',
      description: 'Total delivery charge earned',
    },
    {
      id: 6,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/ttg.png',
      amount: 'PKR 0',
      description: 'Total tax given',
    },
    {
      id: 7,
      image: 'https://6valley.6amtech.com/public/assets/back-end/img/cc.png',
      amount: 'PKR 0',
      description: 'Collected cash',
    },
  ];

  return (
    <div className="card-body snipcss-GROgo">
      <div className="row justify-content-between align-items-center g-2 mb-3">
        <div className="col-sm-6">
          <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
            <img width="20" className="mb-1" src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png" alt="Vendor Wallet" /> Vendor Wallet
          </h4>
        </div>
      </div>
      <div className="row g-2" id="order_stats">
        <div className="col-lg-4">
          <div className="card h-100 d-flex justify-content-center align-items-center">
            <div className="card-body d-flex flex-column gap-10 align-items-center justify-content-center">
              <img width="48" className="mb-2" src={vendorWalletData[0].image} alt="Withdrawable balance" />
              <h3 className="for-card-count mb-0 fz-24">{vendorWalletData[0].amount}</h3>
              <div className="font-weight-bold text-capitalize mb-30"> {vendorWalletData[0].description} </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row g-2">
            {vendorWalletData.slice(1).map(item => (
              <div key={item.id} className="col-md-6">
                <div className="card card-body h-100 justify-content-center">
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                      <h3 className="mb-1 fz-24">{item.amount}</h3>
                      <div className="text-capitalize mb-0">{item.description}</div>
                    </div>
                    <div>
                      <img width="40" src={item.image} alt={item.description} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorWallet;
