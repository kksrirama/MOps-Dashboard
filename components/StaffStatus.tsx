import React from 'react';
import { StaffMember, SkillDistribution } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StaffStatusProps {
  staff: StaffMember[];
  skills: SkillDistribution[];
}

const COLORS = ['#58a6ff', '#3fb950', '#db6d28', '#a371f7', '#f85149'];

const StaffStatus: React.FC<StaffStatusProps> = ({ staff, skills }) => {
  const onSiteCount = staff.filter(s => s.onSite).length;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-max h-full">
        <div className="lg:col-span-2 bg-base-200 p-4 rounded-lg border border-base-300">
            <h3 className="text-lg font-bold text-neutral mb-4">On-Site Personnel</h3>
             <div className="overflow-x-auto">
                <table className="table-auto w-full text-left text-sm">
                    <thead className="border-b border-base-300 text-gray-400">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.filter(s => s.onSite).map(member => (
                            <tr key={member.id} className="border-b border-base-300/50 hover:bg-base-300/20">
                                <td className="p-2 font-medium">{member.name}</td>
                                <td className="p-2">{member.role}</td>
                                <td className="p-2">{member.assignment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
        <div className="bg-base-200 p-4 rounded-lg border border-base-300 flex flex-col">
            <h3 className="text-lg font-bold text-neutral mb-2">Staff Overview</h3>
            <div className="text-sm space-y-2 mb-4">
                <p>Total Staff: <span className="font-bold text-primary">{staff.length}</span></p>
                <p>On-Site: <span className="font-bold text-success">{onSiteCount}</span></p>
            </div>
            <h4 className="text-md font-bold text-neutral mb-2">Skill Distribution</h4>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={skills}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="skill"
                        >
                            {skills.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #21262d' }} />
                        <Legend wrapperStyle={{fontSize: "14px"}} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default StaffStatus;
