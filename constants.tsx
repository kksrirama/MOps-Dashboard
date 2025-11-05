import React from 'react';
import { Kpi, ProductionLine, Asset, ProductionLineStatusEnum, HealthHistory, StaffMember, SkillDistribution, Supplier, InventoryItem } from './types';

export const INITIAL_KPIS: Kpi[] = [
  { title: 'OEE', value: '85%', change: 2.1, changeType: 'increase' },
  { title: 'Production Volume', value: '12,500 units', change: 5.3, changeType: 'increase' },
  { title: 'Defect Rate', value: '1.2%', change: 0.3, changeType: 'decrease' },
  { title: 'Downtime', value: '2.5 hrs', change: 10.0, changeType: 'increase' },
];

export const INITIAL_PRODUCTION_LINES: ProductionLine[] = [
  { id: 'Line 1', status: ProductionLineStatusEnum.Operational, currentProduct: 'Widget A', efficiency: 92 },
  { id: 'Line 2', status: ProductionLineStatusEnum.Operational, currentProduct: 'Widget B', efficiency: 88 },
  { id: 'Line 3', status: ProductionLineStatusEnum.Warning, currentProduct: 'Widget C', efficiency: 75 },
  { id: 'Line 4', status: ProductionLineStatusEnum.Down, currentProduct: 'N/A', efficiency: 0 },
  { id: 'Line 5', status: ProductionLineStatusEnum.Operational, currentProduct: 'Widget D', efficiency: 95 },
];

const generateInitialHistory = (initialScore: number, points = 20): HealthHistory[] => {
    const history: HealthHistory[] = [];
    const now = Date.now();
    for (let i = 0; i < points; i++) {
        const time = new Date(now - (points - 1 - i) * 5000); // 5 second intervals
        const score = Math.floor(Math.max(50, Math.min(100, initialScore + (Math.random() - 0.5) * 10)));
        history.push({
            time: time.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
            score,
        });
    }
    return history;
};


export const INITIAL_ASSETS: Asset[] = [
  { id: 'CNC-001', name: 'CNC Mill', healthScore: 95, temperature: 45, vibration: 0.5, healthHistory: generateInitialHistory(95) },
  { id: 'ROBO-002', name: 'Welding Robot', healthScore: 82, temperature: 60, vibration: 1.2, healthHistory: generateInitialHistory(82) },
  { id: 'PRESS-003', name: 'Stamping Press', healthScore: 70, temperature: 55, vibration: 2.1, healthHistory: generateInitialHistory(70) },
  { id: 'CONV-004', name: 'Conveyor Belt', healthScore: 98, temperature: 35, vibration: 0.2, healthHistory: generateInitialHistory(98) },
  { id: 'PACK-005', name: 'Packaging Arm', healthScore: 91, temperature: 40, vibration: 0.8, healthHistory: generateInitialHistory(91) },
];

export const INITIAL_STAFF: StaffMember[] = [
    { id: 'S-001', name: 'John Doe', role: 'Technician', assignment: 'Line 2', onSite: true },
    { id: 'S-002', name: 'Jane Smith', role: 'Engineer', assignment: 'Asset Maintenance', onSite: true },
    { id: 'S-003', name: 'Mike Ross', role: 'Operator', assignment: 'Line 1', onSite: true },
    { id: 'S-004', name: 'Rachel Zane', role: 'Operator', assignment: 'Line 3', onSite: false },
    { id: 'S-005', name: 'Harvey Specter', role: 'Supervisor', assignment: 'Floor', onSite: true },
];

export const INITIAL_SKILL_DISTRIBUTION: SkillDistribution[] = [
    { skill: 'Operators', count: 45 },
    { skill: 'Technicians', count: 20 },
    { skill: 'Engineers', count: 15 },
    { skill: 'Supervisors', count: 10 },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
    { id: 'SUP-01', name: 'Steel Co.', onTimeDelivery: 98, material: 'Steel Beams' },
    { id: 'SUP-02', name: 'Plastics Inc.', onTimeDelivery: 92, material: 'Polymer Pellets' },
    { id: 'SUP-03', name: 'Circuits R Us', onTimeDelivery: 85, material: 'Microchips' },
    { id: 'SUP-04', name: 'Fasteners Global', onTimeDelivery: 99, material: 'Nuts & Bolts' },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
    { id: 'INV-001', name: 'Widget A Casing', stock: 1200, reorderPoint: 500 },
    { id: 'INV-002', name: 'Widget B Core', stock: 800, reorderPoint: 400 },
    { id: 'INV-003', name: 'Microchip X', stock: 550, reorderPoint: 600 },
    { id: 'INV-004', name: 'Fastener Kit', stock: 5000, reorderPoint: 2000 },
];


export const Icons = {
  send: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  ),
  arrowUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.03 9.83a.75.75 0 01-1.06-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
    </svg>
  ),
  arrowDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l4.22-4.22a.75.75 0 111.06 1.06l-5.25 5.25a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 111.06-1.06L9.25 14.388V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
    </svg>
  ),
  robot: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16 8V6H8v2h8zM8.5 12.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path fillRule="evenodd" d="M4 4.75A.75.75 0 014.75 4h14.5a.75.75 0 01.75.75v9.5A.75.75 0 0119.25 15h-2.128a6.012 6.012 0 00-2.274 1.343 3.51 3.51 0 01-1.348.657 3.512 3.512 0 01-2.6 0 3.51 3.51 0 01-1.348-.657 6.012 6.012 0 00-2.274-1.343H4.75A.75.75 0 014 14.25v-9.5zM15 15a4.512 4.512 0 01-1.603 3.412 5.01 5.01 0 00-1.41 1.056 1.75 1.75 0 11-2.973 0 5.01 5.01 0 00-1.41-1.056A4.512 4.512 0 019 15H6.843a4.512 4.512 0 012.868 2.28a1.75 1.75 0 102.578 0A4.512 4.512 0 0115.157 15H15z" clipRule="evenodd" />
    </svg>
  ),
  spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ),
  warning: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  error: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  ),
  users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM1.5 15.75a8.25 8.25 0 0113.5 0v3a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-3zM16.5 15.75a6.75 6.75 0 0110.5 0v3a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5v-3z" />
    </svg>
  ),
  truck: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h1.063c.24-1.657 1.683-3 3.437-3s3.197 1.343 3.437 3H15V6.375c0-1.036-.84-1.875-1.875-1.875h-9.75z" />
      <path fillRule="evenodd" d="M19.5 13.5h1.875c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21v.75c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h1.5v-2.25zM6 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016 15z" clipRule="evenodd" />
      <path d="M8.25 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018.25 15zM1.5 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 011.5 15z" />
    </svg>
  ),
  cog: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.946 1.55l-.292.936a25.503 25.503 0 00-2.296 1.393c-.88.66-2.023.498-2.652-.382l-.683-.935a1.923 1.923 0 00-2.433-.635 11.242 11.242 0 00-2.036 3.014c-.453.946.002 2.064.882 2.652l.936.683a25.503 25.503 0 00-1.393 2.296l-.936.292c-.887.247-1.55.98-1.55 1.946v2.144c0 .966.663 1.699 1.55 1.946l.936.292a25.503 25.503 0 001.393 2.296l-.683.936c-.66.88-.498 2.023.382 2.652l.935.683a1.923 1.923 0 002.433.635 11.242 11.242 0 003.014 2.036c.946.453 2.064-.002 2.652-.882l.683-.936a25.503 25.503 0 002.296-1.393l.292-.936c.247-.887.98-1.55 1.946-1.55h2.144c.966 0 1.699-.663 1.946-1.55l.292-.936a25.503 25.503 0 002.296-1.393c.88-.66 2.023-.498 2.652.382l.683.935a1.923 1.923 0 002.433.635 11.242 11.242 0 002.036-3.014c.453-.946-.002-2.064-.882-2.652l-.936-.683a25.503 25.503 0 001.393-2.296l.936-.292c.887-.247 1.55-.98 1.55-1.946v-2.144c0-.966-.663-1.699-1.55-1.946l-.936-.292a25.503 25.503 0 00-1.393-2.296l.683-.936c.66-.88.498-2.023-.382-2.652l-.935-.683a1.923 1.923 0 00-2.433-.635 11.242 11.242 0 00-3.014-2.036c-.946-.453-2.064.002-2.652.882l-.683.936a25.503 25.503 0 00-2.296 1.393l-.292.936c-.247.887-.98 1.55-1.946 1.55h-2.144zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
    </svg>
  )
};
