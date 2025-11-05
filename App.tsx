import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import ProductionLineStatus from './components/ProductionLineStatus';
import AiAnalyst from './components/AiAnalyst';
import Alerts from './components/Alerts';
import Sidebar from './components/Sidebar';
import StaffStatus from './components/StaffStatus';
import SupplyChainStatus from './components/SupplyChainStatus';
import AssetStatus from './components/AssetStatus';
import { Kpi, ProductionLine, Asset, ProductionLineStatusEnum, Alert, StaffMember, SkillDistribution, Supplier, InventoryItem } from './types';
import { INITIAL_KPIS, INITIAL_PRODUCTION_LINES, INITIAL_ASSETS, INITIAL_STAFF, INITIAL_SKILL_DISTRIBUTION, INITIAL_SUPPLIERS, INITIAL_INVENTORY } from './constants';

type Tab = 'staff' | 'supply-chain' | 'assets';

const App: React.FC = () => {
  const [kpis, setKpis] = useState<Kpi[]>(INITIAL_KPIS);
  const [productionLines, setProductionLines] = useState<ProductionLine[]>(INITIAL_PRODUCTION_LINES);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [skills, setSkills] = useState<SkillDistribution[]>(INITIAL_SKILL_DISTRIBUTION);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [activeTab, setActiveTab] = useState<Tab>('staff');

  const addAlert = (newAlert: Omit<Alert, 'id' | 'timestamp'>) => {
    const alertToAdd: Alert = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      ...newAlert,
    };
    setAlerts(prevAlerts => [alertToAdd, ...prevAlerts].slice(0, 10)); // Keep max 10 alerts
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate KPI fluctuations
      setKpis(prevKpis => prevKpis.map(kpi => {
        const change = (Math.random() - 0.5) * 0.2;
        let currentValue = parseFloat(kpi.value);
        if (isNaN(currentValue)) {
            currentValue = parseInt(kpi.value.replace(/,/g, '').split(' ')[0]);
        }
        const newValue = (currentValue + change);
        
        let formattedValue = kpi.value;
        if (kpi.value.includes('%')) {
            formattedValue = `${newValue.toFixed(1)}%`;
        } else if (kpi.value.includes('units')) {
            formattedValue = `${Math.round(newValue).toLocaleString()} units`;
        } else if (kpi.value.includes('hrs')) {
            formattedValue = `${newValue.toFixed(1)} hrs`;
        }
        
        return {
          ...kpi,
          value: formattedValue,
          change: (Math.random() * 5).toFixed(1),
          changeType: Math.random() > 0.5 ? 'increase' : 'decrease',
        } as Kpi;
      }));

      // Simulate asset health changes and update history
      setAssets(prevAssets => {
        const now = new Date();
        const newTime = now.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
        
        const newAssets = prevAssets.map(asset => {
            const newHealthScore = Math.floor(Math.max(40, Math.min(100, asset.healthScore + (Math.random() - 0.5) * 5)));
            const newHistory = [...asset.healthHistory, { time: newTime, score: newHealthScore }].slice(-20); // Keep last 20

            return {
                ...asset,
                healthScore: newHealthScore,
                temperature: asset.temperature + (Math.random() - 0.5) * 2,
                vibration: Math.max(0.1, asset.vibration + (Math.random() - 0.5) * 0.1),
                healthHistory: newHistory,
            };
        });
        
        newAssets.forEach((newAsset, index) => {
            const oldAsset = prevAssets[index];
            if(newAsset.healthScore < 70 && oldAsset.healthScore >= 70) {
                addAlert({ type: 'warning', message: `${newAsset.name} health score is low (${newAsset.healthScore}%)` });
            }
        });

        return newAssets;
      });

      // Simulate production line status changes
       setProductionLines(prevLines => {
            const newLines = prevLines.map(line => {
                if (Math.random() < 0.05 && line.status !== ProductionLineStatusEnum.Down) {
                    const statuses = [ProductionLineStatusEnum.Operational, ProductionLineStatusEnum.Warning, ProductionLineStatusEnum.Down];
                    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    return { ...line, status: newStatus };
                }
                return line;
            });

            newLines.forEach((newLine, index) => {
                const oldLine = prevLines[index];
                if(newLine.status !== oldLine.status) {
                    if (newLine.status === ProductionLineStatusEnum.Warning) {
                        addAlert({ type: 'warning', message: `${newLine.id} status changed to Warning.` });
                    } else if (newLine.status === ProductionLineStatusEnum.Down) {
                        addAlert({ type: 'error', message: `${newLine.id} has gone down.` });
                    }
                }
            });

            return newLines;
       });
       
       // Simulate inventory changes
       setInventory(prevInv => prevInv.map(item => {
           const change = Math.floor(Math.random() * 10) - 5; // Use or produce some
           const newStock = Math.max(0, item.stock + change);
           if (newStock < item.reorderPoint && item.stock >= item.reorderPoint) {
              addAlert({ type: 'warning', message: `Inventory for ${item.name} is low.`});
           }
           return { ...item, stock: newStock };
       }))

    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const plantData = { kpis, productionLines, assets, staff, skills, suppliers, inventory };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'staff':
        return <StaffStatus staff={staff} skills={skills} />;
      case 'supply-chain':
        return <SupplyChainStatus suppliers={suppliers} inventory={inventory} />;
      case 'assets':
        return <AssetStatus assets={assets} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-neutral flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-max overflow-y-auto">
        <Header />
        
        {kpis.map((kpi) => (
          <div key={kpi.title} className="lg:col-span-1">
            <KpiCard kpi={kpi} />
          </div>
        ))}
        
        <div className="lg:col-span-4">
            {renderActiveTab()}
        </div>

        <div className="lg:col-span-2">
            <ProductionLineStatus lines={productionLines} />
        </div>
        
        <div className="lg:col-span-2">
            <Alerts alerts={alerts} onDismiss={handleDismissAlert} />
        </div>
        
        <div className="lg:col-span-4 row-span-2 min-h-[400px]">
           <AiAnalyst plantData={plantData} />
        </div>

      </main>
    </div>
  );
};

export default App;
