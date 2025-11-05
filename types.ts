export interface Kpi {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
}

export enum ProductionLineStatusEnum {
  Operational = 'Operational',
  Warning = 'Warning',
  Down = 'Down',
}

export interface ProductionLine {
  id: string;
  status: ProductionLineStatusEnum;
  currentProduct: string;
  efficiency: number;
}

export interface HealthHistory {
  time: string;
  score: number;
}

export interface Asset {
  id: string;
  name: string;
  healthScore: number;
  temperature: number;
  vibration: number;
  healthHistory: HealthHistory[];
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error';
  message: string;
  timestamp: string;
}

// New types for Staff Status
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignment: string;
  onSite: boolean;
}

export interface SkillDistribution {
  skill: string;
  count: number;
}

// New types for Supply Chain Status
export interface Supplier {
  id: string;
  name: string;
  onTimeDelivery: number;
  material: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  reorderPoint: number;
}
