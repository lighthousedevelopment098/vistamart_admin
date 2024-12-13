import React from 'react';
import GoogleLoginComponent from './GoogleLoginComponent';

import TwitterLoginComponent from './FacebookLoginComponent';
import InstagramLoginComponent from './InstagramLoginComponent';


const SocialLoginSettings = () => {
    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <GoogleLoginComponent />
            </div>
            <div className="col-md-6 mb-4">
                <TwitterLoginComponent />
            </div>
            <div className="col-md-6 mb-4">
                <InstagramLoginComponent />
            </div>
        </div>
    );
};

export default SocialLoginSettings;
