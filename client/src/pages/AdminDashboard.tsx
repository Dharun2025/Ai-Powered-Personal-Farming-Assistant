import React, { useState } from 'react';
import { ShieldCheck, Users, Sprout, Database, Plus, CheckCircle, RefreshCw, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'users' | 'crops' | 'system'>('users');

  const [users, setUsers] = useState([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@farm.com", role: "farmer", status: "Active" },
    { id: 2, name: "Ananya Patel", email: "ananya@farm.com", role: "farmer", status: "Active" },
    { id: 3, name: "Admin Chief", email: "admin@agriai.com", role: "admin", status: "Active" },
    { id: 4, name: "Suresh Singh", email: "suresh@farm.com", role: "farmer", status: "Suspended" },
  ]);

  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", type: "Rabi", soil: "Loamy/Clayey", n: "60", p: "45", k: "50" },
    { id: 2, name: "Basmati Rice", type: "Kharif", soil: "Clayey/Alluvial", n: "80", p: "60", k: "60" },
    { id: 3, name: "Potato", type: "Rabi/Zaid", soil: "Sandy/Loamy", n: "50", p: "40", k: "80" },
  ]);

  // System status
  const systemMetrics = {
    usersTotal: 12504,
    diagnosesTotal: 48312,
    dbStatus: "Connected",
    serverLoad: "12%",
    responseTime: "42ms"
  };

  const handleToggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    showToast("User status updated", "info");
  };

  const handleToggleRole = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'admin' ? 'farmer' : 'admin' } : u));
    showToast("User authority level modified", "success");
  };

  const handleDeleteCrop = (id: number) => {
    setCrops(crops.filter(c => c.id !== id));
    showToast("Crop model deleted from database", "info");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <ShieldAlert className="w-6 h-6 text-teal-600" />
          {t('adminDashboard')}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Manage crop database, farmer directories, and system server status indicators.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-slate-800/80 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'users' ? 'border-b-2 border-teal-600 text-teal-600 dark:text-teal-400' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Users className="w-4 h-4" /> Users Directory
        </button>
        <button
          onClick={() => setActiveTab('crops')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'crops' ? 'border-b-2 border-teal-600 text-teal-600 dark:text-teal-400' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Sprout className="w-4 h-4" /> Crops Registry
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'system' ? 'border-b-2 border-teal-600 text-teal-600 dark:text-teal-400' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Database className="w-4 h-4" /> System Health
        </button>
      </div>

      <div className="w-full">
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold text-gray-500">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800/50 pb-2 text-[10px] text-gray-400 uppercase">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Authority</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800/20">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                    <td className="py-3.5 px-2 font-bold text-gray-800 dark:text-gray-200 capitalize">{u.name}</td>
                    <td className="py-3.5 px-2">{u.email}</td>
                    <td className="py-3.5 px-2 uppercase text-[10px] text-teal-600 dark:text-teal-450">{u.role}</td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right flex justify-end gap-2">
                      <button
                        onClick={() => handleToggleRole(u.id)}
                        className="p-1 border border-gray-200 dark:border-slate-800/80 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-gray-450"
                        title="Toggle Role"
                      >
                        Role
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-2 py-1 rounded text-white text-[10px] font-bold ${
                          u.status === 'Active' ? 'bg-rose-500' : 'bg-emerald-600'
                        }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Crops Tab */}
        {activeTab === 'crops' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button 
                onClick={() => showToast("Add Crop dialog opened (Mock)", "info")}
                className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Crop Model
              </button>
            </div>
            
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-semibold text-gray-500">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-800/50 pb-2 text-[10px] text-gray-400 uppercase">
                    <th className="py-3 px-2">Crop Name</th>
                    <th className="py-3 px-2">Season</th>
                    <th className="py-3 px-2">Soil Type</th>
                    <th className="py-3 px-2">NPK Ratios</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800/20">
                  {crops.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      <td className="py-3.5 px-2 font-bold text-gray-800 dark:text-gray-200">{c.name}</td>
                      <td className="py-3.5 px-2">{c.type}</td>
                      <td className="py-3.5 px-2">{c.soil}</td>
                      <td className="py-3.5 px-2 font-mono text-[10px]">N:{c.n} P:{c.p} K:{c.k}</td>
                      <td className="py-3.5 px-2 text-right flex justify-end gap-2">
                        <button
                          onClick={() => showToast("Edit dialog (Mock)", "info")}
                          className="p-1 border border-gray-200 dark:border-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-gray-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCrop(c.id)}
                          className="p-1 border border-rose-200 dark:border-rose-900/20 rounded hover:bg-rose-50 text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active User Nodes</span>
              <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-2">{systemMetrics.usersTotal.toLocaleString()}</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Active sync online
              </p>
            </div>
            
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Diagnostics</span>
              <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mt-2">{systemMetrics.diagnosesTotal.toLocaleString()}</h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Leaf diagnosis queries
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Database Server Status</span>
              <h3 className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-3">{systemMetrics.dbStatus}</h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1.5">
                Load: {systemMetrics.serverLoad} • Ping: {systemMetrics.responseTime}
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
export default AdminDashboard;
