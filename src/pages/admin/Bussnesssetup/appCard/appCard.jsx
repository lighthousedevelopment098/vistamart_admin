import React, { useState } from 'react';
import Switcher from '../../../../components/FormInput/Switcher';

const AppDownloadInfoCard = ({ appLinks, onInputChange }) => {
  const [appStoreEnabled, setAppStoreEnabled] = useState(true);
  const [playStoreEnabled, setPlayStoreEnabled] = useState(true);

  const handleToggle = (store) => {
    if (store === 'appStore') {
      setAppStoreEnabled(!appStoreEnabled);
      onInputChange("appStoreEnabled", !appStoreEnabled);  // Pass the change to the parent
    } else if (store === 'playStore') {
      setPlayStoreEnabled(!playStoreEnabled);
      onInputChange("playStoreEnabled", !playStoreEnabled);  // Pass the change to the parent
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value); // Pass the changed input value back to the parent
  };

  return (
    <div className="card mb-3 border border-gray-300 rounded-lg shadow-lg">
      <div className="card-header p-3 bg-white shadow-md">
        <h5 className="mb-0 text-lg font-semibold flex gap-2 items-center">
          <h1 className=" text-sm font-bold"> App download info </h1>
        </h5>
      </div>
      <div className="card-body p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Apple Store Section */}
          <div className="space-y-3">
            <div className="flex gap-2 items-center text-capitalize mb-3">
              <img width="22" src="https://6valley.6amtech.com/public/assets/back-end/img/apple.png" alt="Apple Store" />
              Apple store:
            </div>

            <div className="bg-aliceblue p-3 rounded">
              <div className="flex justify-between  items-center w-full gap-4 mb-2">
                <span className="text-gray-700 text-sm font-medium flex gap-1 items-center">
                  Download link
                  <span className="cursor-pointer" title="If enabled the download button from the App Store will be visible in the Footer section">
                    <img width="16" src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg" alt="Info" />
                  </span>
                </span>
                <div className='ml-10'>
                  <Switcher checked={appStoreEnabled} onChange={() => handleToggle('appStore')} />
                </div>
              </div>

              <input
                type="url"
                name="appleStoreLink"
                className="form-input w-full p-2 border rounded"
                value={appLinks.appleStoreLink || ""}
                onChange={handleInputChange}  // Bind the input field to handle changes
                placeholder="Ex: https://www.apple.com/app-store/"
              />
            </div>
          </div>

          {/* Google Play Store Section */}
          <div className="space-y-3">
            <div className="flex gap-2 items-center text-capitalize mb-3">
              <img width="22" src="https://6valley.6amtech.com/public/assets/back-end/img/play_store.png" alt="Play Store" />
              Google Play Store:
            </div>
            <div className="bg-aliceblue p-3 rounded">
              <div className="flex justify-between  items-center w-full gap-4 mb-2">
                <span className="text-gray-700 text-sm font-medium flex gap-1 items-center">
                  Download link
                  <span className="cursor-pointer" title="If enabled the download button from the Play Store will be visible in the Footer section">
                    <img width="16" src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg" alt="Info" />
                  </span>
                </span>
                <div className='ml-10'>
                  <Switcher checked={playStoreEnabled} onChange={() => handleToggle('playStore')} />
                </div>
              </div>

              <input
                type="url"
                name="googlePlayStoreLink"
                className="form-input w-full p-2 border rounded"
                value={appLinks.googlePlayStoreLink || ""}
                onChange={handleInputChange}  // Bind the input field to handle changes
                placeholder="Ex: https://play.google.com/store"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadInfoCard;
