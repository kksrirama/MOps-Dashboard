import React from 'react';
import { Alert } from '../types';
import { Icons } from '../constants';

interface AlertsProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const alertStyles = {
  warning: {
    icon: Icons.warning,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/50',
  },
  error: {
    icon: Icons.error,
    color: 'text-error',
    bg: 'bg-error/10',
    border: 'border-error/50',
  },
};

const Alerts: React.FC<AlertsProps> = ({ alerts, onDismiss }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-bold text-neutral mb-4">Critical Alerts</h3>
      <div className="flex-grow overflow-y-auto pr-2 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No critical alerts.</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const styles = alertStyles[alert.type];
            const Icon = styles.icon;
            return (
              <div
                key={alert.id}
                className={`flex items-start justify-between p-3 rounded-lg border ${styles.bg} ${styles.border}`}
              >
                <div className="flex items-start">
                  <Icon className={`w-6 h-6 mr-3 flex-shrink-0 ${styles.color}`} />
                  <div>
                    <p className={`font-semibold ${styles.color}`}>{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="text-gray-500 hover:text-neutral transition-colors"
                  aria-label="Dismiss alert"
                >
                  <Icons.close className="w-5 h-5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alerts;
