import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Alert from './Alert';

const AlertContainer = forwardRef((props, ref) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setAlerts([...alerts, { id, message, type, duration }]);

    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    }, duration);
  };

  useImperativeHandle(ref, () => ({
    addAlert,
  }));

  return (
    <div className="fixed top-5 right-5 space-y-2 z-50">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          onClose={() =>
            setAlerts((alerts) => alerts.filter((a) => a.id !== alert.id))
          }
        />
      ))}
    </div>
  );
});

// Add displayName for debugging purposes
AlertContainer.displayName = 'AlertContainer';

export default AlertContainer;
