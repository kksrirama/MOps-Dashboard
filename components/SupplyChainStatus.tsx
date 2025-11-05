import React from 'react';
import { Supplier, InventoryItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SupplyChainStatusProps {
  suppliers: Supplier[];
  inventory: InventoryItem[];
}

const SupplyChainStatus: React.FC<SupplyChainStatusProps> = ({ suppliers, inventory }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-max h-full">
        <div className="lg:col-span-2 bg-base-200 p-4 rounded-lg border border-base-300">
             <h3 className="text-lg font-bold text-neutral mb-4">Supplier On-Time Delivery</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={suppliers} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
                    <XAxis dataKey="name" stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[70, 100]} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#161b22', border: '1px solid #21262d' }} 
                        cursor={{ fill: '#21262d' }}
                    />
                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                    <Bar dataKey="onTimeDelivery" name="On-Time Delivery" unit="%" fill="#58a6ff" />
                  </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="bg-base-200 p-4 rounded-lg border border-base-300">
            <h3 className="text-lg font-bold text-neutral mb-4">Critical Inventory</h3>
             <div className="space-y-3">
                {inventory.map((item) => {
                    const isLow = item.stock < item.reorderPoint;
                    return (
                         <div key={item.id} className="p-2 rounded-md bg-base-300/50">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{item.name}</span>
                                <span className={`font-bold ${isLow ? 'text-error' : 'text-success'}`}>{item.stock.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-base-300 rounded-full h-1.5 mt-1">
                                <div 
                                    className={`h-1.5 rounded-full ${isLow ? 'bg-error' : 'bg-success'}`}
                                    style={{ width: `${Math.min(100, (item.stock / (item.reorderPoint * 1.5)) * 100)}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-right text-gray-500 mt-1">Reorder at {item.reorderPoint}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default SupplyChainStatus;
