import React from 'react';
import SmsGatewayCard from './SmsGatewayCard';
const SmsGatewayContainer = () => {
    return (
        <div className="content container-fluid snipcss-eTbvi">
            <div className="row gy-3" id="sms-gateway-cards">
                {/* Replace 'gatewayName' with actual gateway names */}
                <SmsGatewayCard gatewayName="2factor" />
                <SmsGatewayCard gatewayName="msg91" />
                <SmsGatewayCard gatewayName="alphanet_sms" />
                <SmsGatewayCard gatewayName="releans" />
                <SmsGatewayCard gatewayName="twilio" />
                <SmsGatewayCard gatewayName="nexmo" />
            </div>
        </div>
    );
};

export default SmsGatewayContainer;
