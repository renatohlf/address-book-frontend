import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
    return <div className={"loading-spinner__overlay"}>
            <div className="loading-spinner bounce"/>
            <div className="loading-spinner bounce bounce-delay-1"/>
            <div className="loading-spinner bounce bounce-delay-2"/>
    </div>;
};

export default LoadingSpinner;