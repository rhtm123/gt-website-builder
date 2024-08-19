// components/Alert.js
import React, { useState, useEffect } from 'react';

const Alert = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const alertTypeClass = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div className={`alert ${alertTypeClass[type]} shadow-lg`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
