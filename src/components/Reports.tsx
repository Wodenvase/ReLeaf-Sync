import React from 'react';
import { Download, Calendar, TrendingDown, FileText } from 'lucide-react';
import { FootprintData } from '../App';

interface ReportsProps {
  footprintHistory: FootprintData[];
}

export const Reports: React.FC<ReportsProps> = ({ footprintHistory }) => {
  const downloadCSV = () => {
    const headers = ['Date', 'Travel', 'Home Energy', 'Food & Purchases', 'Total'];
    const csvContent = [
      headers.join(','),
      ...footprintHistory.map(data => [
        data.date,
        data.travel,
        data.homeEnergy,
        data.foodPurchases,
        data.total
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-footprint-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePDFReport = () => {
    // In a real app, you'd use a library like jsPDF
    alert('PDF generation would be implemented with a library like jsPDF');
  };

  const totalReduction = footprintHistory.length > 1 
    ? footprintHistory[footprintHistory.length - 1].total - footprintHistory[0].total
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">Download your carbon footprint data and track progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Records</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{footprintHistory.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Total Reduction</span>
          </div>
          <p className={`text-2xl font-bold ${totalReduction < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalReduction < 0 ? '' : '+'}{totalReduction} kg
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-600">Average Monthly</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(footprintHistory.reduce((sum, data) => sum + data.total, 0) / footprintHistory.length)}
          </p>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={downloadCSV}
            className="flex items-center justify-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span className="font-medium">Download CSV</span>
          </button>
          <button
            onClick={generatePDFReport}
            className="flex items-center justify-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span className="font-medium">Generate PDF Report</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Footprint History</h3>
          <p className="text-sm text-gray-600">Last {Math.min(footprintHistory.length, 10)} entries</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Energy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food & Purchases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {footprintHistory.slice(0, 10).map((data, index) => (
                <tr key={data.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(data.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.travel} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.homeEnergy} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.foodPurchases} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.total} kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};