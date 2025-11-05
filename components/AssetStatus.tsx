import React from 'react';
import { Asset } from '../types';
import AssetHealthMonitor from './AssetHealthMonitor';

interface AssetStatusProps {
  assets: Asset[];
}

const AssetStatus: React.FC<AssetStatusProps> = ({ assets }) => {
  return (
    <div className="grid grid-cols-1 gap-4 auto-rows-max h-full">
        <div className="col-span-1 row-span-2 min-h-[400px]">
            <AssetHealthMonitor assets={assets} />
        </div>
    </div>
  );
};

export default AssetStatus;
