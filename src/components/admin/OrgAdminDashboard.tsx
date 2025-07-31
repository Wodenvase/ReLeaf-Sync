import React, { useState } from 'react';
import { Users, TrendingUp, Target, Award, BarChart3, Calendar } from 'lucide-react';
import { FootprintData, User } from '../../types';

interface OrgAdminDashboardProps {
  footprintHistory: FootprintData[];
}

export const OrgAdminDashboard: React.FC<OrgAdminDashboardProps> = ({ footprintHistory }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock team data
  const teamMembers: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'org_member', organizationId: 'org_1', createdAt: '2024-01-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@company.com', role: 'org_member', organizationId: 'org_1', createdAt: '2024-02-01' },
    { id: '3', name: 'Carol Davis', email: 'carol@company.com', role: 'org_member', organizationId: 'org_1', createdAt: '2024-01-20' }
  ];

  const teamFootprints = [
    { userId: '1', name: 'Alice Johnson', current: 180, previous: 220, target: 200 },
    { userId: '2', name: 'Bob Smith', current: 240, previous: 260, target: 220 },
    { userId: '3', name: 'Carol Davis', current: 160, previous: 190, target: 180 }
  ];

  const orgStats = {
    totalMembers: teamMembers.length,
    avgFootprint: Math.round(teamFootprints.reduce((sum, member) => sum + member.current, 0) / teamFootprints.length),
    totalReduction: teamFootprints.reduce((sum, member) => sum + (member.previous - member.current), 0),
    targetAchievement: Math.round((teamFootprints.filter(member => member.current <= member.target).length / teamFootprints.length) * 100)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Organization Dashboard</h2>
          <p className="text-gray-600">Manage your team's carbon footprint performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Team Members</p>
              <p className="text-3xl font-bold text-gray-800">{orgStats.totalMembers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Footprint</p>
              <p className="text-3xl font-bold text-gray-800">{orgStats.avgFootprint}</p>
              <p className="text-sm text-gray-500">kg CO₂e</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Reduction</p>
              <p className="text-3xl font-bold text-green-600">-{orgStats.totalReduction}</p>
              <p className="text-sm text-gray-500">kg CO₂e</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Target Achievement</p>
              <p className="text-3xl font-bold text-purple-600">{orgStats.targetAchievement}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-800">Team Leaderboard</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">Ranked by carbon footprint reduction</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {teamFootprints
              .sort((a, b) => (b.previous - b.current) - (a.previous - a.current))
              .map((member, index) => {
                const reduction = member.previous - member.current;
                const reductionPercent = Math.round((reduction / member.previous) * 100);
                const isOnTarget = member.current <= member.target;
                
                return (
                  <div key={member.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-600">Current: {member.current} kg CO₂e</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${reduction > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {reduction > 0 ? '-' : '+'}{Math.abs(reduction)} kg
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isOnTarget ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isOnTarget ? 'On Target' : 'Above Target'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {reductionPercent > 0 ? '-' : '+'}{Math.abs(reductionPercent)}% vs last month
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Benchmarks & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Benchmarks</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Organization</span>
              <span className="font-bold text-gray-800">{orgStats.avgFootprint} kg CO₂e</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Industry Average</span>
              <span className="font-bold text-gray-800">280 kg CO₂e</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Best in Class</span>
              <span className="font-bold text-green-600">150 kg CO₂e</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Performance vs Industry</span>
                <span className={`text-sm font-bold ${orgStats.avgFootprint < 280 ? 'text-green-600' : 'text-red-600'}`}>
                  {orgStats.avgFootprint < 280 ? 'Above Average' : 'Below Average'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">🎯 67% of team members are meeting their targets</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">📈 Average 15% reduction this month</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">⚡ Travel emissions are the biggest opportunity</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 font-medium">🏆 Alice leads in consistent improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};