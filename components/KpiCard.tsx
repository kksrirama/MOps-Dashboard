
import React from 'react';
import { Kpi } from '../types';
import { Icons } from '../constants';

interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isIncreaseGood = kpi.title !== 'Defect Rate' && kpi.title !== 'Downtime';
  const isPositiveChange = (isIncreaseGood && kpi.changeType === 'increase') || (!isIncreaseGood && kpi.changeType === 'decrease');

  const changeColor = isPositiveChange ? 'text-success' : 'text-error';

  return (
    <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-lg flex flex-col justify-between h-full">
      <div>
        <h3 className="text-sm font-medium text-gray-400">{kpi.title}</h3>
        <p className="text-3xl font-bold text-neutral mt-2">{kpi.value}</p>
      </div>
      <div className={`flex items-center mt-4 text-sm ${changeColor}`}>
        {kpi.changeType === 'increase' ? (
          <Icons.arrowUp className="w-5 h-5 mr-1" />
        ) : (
          <Icons.arrowDown className="w-5 h-5 mr-1" />
        )}
        <span>{kpi.change}% vs last shift</span>
      </div>
    </div>
  );
};

export default KpiCard;
