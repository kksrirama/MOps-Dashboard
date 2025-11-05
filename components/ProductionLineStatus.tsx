
import React from 'react';
import { ProductionLine, ProductionLineStatusEnum } from '../types';

interface ProductionLineStatusProps {
  lines: ProductionLine[];
}

const statusStyles: { [key in ProductionLineStatusEnum]: { dot: string; text: string; bg: string } } = {
  [ProductionLineStatusEnum.Operational]: { dot: 'bg-success', text: 'text-success', bg: 'bg-success/10' },
  [ProductionLineStatusEnum.Warning]: { dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning/10' },
  [ProductionLineStatusEnum.Down]: { dot: 'bg-error', text: 'text-error', bg: 'bg-error/10' },
};

const ProductionLineStatus: React.FC<ProductionLineStatusProps> = ({ lines }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-lg h-full">
      <h3 className="text-lg font-bold text-neutral mb-4">Production Line Status</h3>
      <div className="space-y-3">
        {lines.map((line) => (
          <div key={line.id} className="grid grid-cols-3 gap-4 items-center p-2 rounded-md bg-base-300/50">
            <div className="font-semibold">{line.id}</div>
            <div className={`text-center font-medium px-2 py-1 rounded-full text-xs ${statusStyles[line.status].bg} ${statusStyles[line.status].text}`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusStyles[line.status].dot}`}></span>
              {line.status}
            </div>
            <div className="text-right text-sm text-gray-400">{line.currentProduct}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionLineStatus;
