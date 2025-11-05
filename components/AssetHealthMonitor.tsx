import React from 'react';
import { Asset } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AssetHealthMonitorProps {
  assets: Asset[];
}

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-base-300 p-3 border border-base-200 rounded-md shadow-lg">
        <p className="font-bold text-neutral">{label}</p>
        <p className="text-sm text-info">{`Health: ${data.healthScore}%`}</p>
        <p className="text-sm text-gray-400">{`Temp: ${data.temperature}°C`}</p>
        <p className="text-sm text-gray-400">{`Vibration: ${data.vibration} g`}</p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-300 p-3 border border-base-200 rounded-md shadow-lg">
        <p className="font-bold text-neutral mb-2">{`Time: ${label}`}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }} className="text-sm font-medium">
            {`${pld.dataKey}: ${pld.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AssetHealthMonitor: React.FC<AssetHealthMonitorProps> = ({ assets }) => {
  const lineColors = ['#58a6ff', '#3fb950', '#db6d28', '#f85149', '#a371f7'];

  const lineChartData = assets[0]?.healthHistory.map((historyPoint, index) => {
    const dataPoint: { [key: string]: string | number } = { time: historyPoint.time };
    assets.forEach(asset => {
      // Ensure we have a score for each point, default to 0 if missing
      dataPoint[asset.name] = asset.healthHistory[index]?.score ?? 0;
    });
    return dataPoint;
  });
  
  return (
    <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-bold text-neutral">Asset Health Monitor</h3>
      <div className="flex-1 min-h-0 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={assets} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis dataKey="name" stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#21262d' }}/>
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey="healthScore" name="Health Score" unit="%" fill="#58a6ff" background={{ fill: '#161b22' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <h4 className="text-md font-bold text-neutral mt-4 border-t border-base-300 pt-4">Recent Health Trend</h4>
      <div className="flex-1 min-h-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis dataKey="time" stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#c9d1d9" fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[50, 100]} />
            <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: '#c9d1d9', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            {assets.map((asset, index) => (
              <Line
                key={asset.id}
                type="monotone"
                dataKey={asset.name}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetHealthMonitor;
