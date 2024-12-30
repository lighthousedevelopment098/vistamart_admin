
// ThirdPartySettings.js

import React, { useState } from 'react';
import StatisticsCard from './StatisticsCard';


const EarningReport = () => {
    const [currentTab, setCurrentTab] = useState('adminearning'); // State to manage active tab

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    // Function to render content based on currentTab state
    const renderContent = () => {
        switch (currentTab) {
            case 'adminearning':
                return (
                  
                    <StatisticsCard />
                );
            case 'venderearning':
                return (
                  
                    <StatisticsCard />
                    
                );
           
          
            default:
                return null;
        }
    };

    return (
        <div className="content container-fluid snipcss-YGKeU">
            <div className="mb-4 pb-2">
                <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                    <img src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png" alt="" /> Earning Reports
                </h2>
            </div>

            {/* Inline page menu */}
            <div className="inline-page-menu my-4">
                <ul className="list-unstyled">
                    <li className={currentTab === 'adminearning' ? 'active' : ''}>
                        <button className="text-capitalize" onClick={() => handleTabChange('adminearning')}>
                             Admin Earning 
                        </button>
                    </li>
             
                    <li className={currentTab === 'venderearning' ? 'active' : ''}>
                        <button className="text-capitalize" onClick={() => handleTabChange('venderearning')}>
                             Vender Earning 
                        </button>
                    </li>
             
                 
                </ul>
            </div>

            {/* Render content based on currentTab */}
            <div className="card overflow-hidden">
                {renderContent()}
            </div>
        </div>
    );
};

export default EarningReport;


