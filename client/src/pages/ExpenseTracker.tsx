import React, { useState } from 'react';
import { Wallet, Plus, Download, TrendingUp, TrendingDown, RefreshCw, Trash2, Calendar, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ExpenseTracker: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [expenses, setExpenses] = useState([
    { id: 1, category: "Seeds", amount: 4500, date: "2026-06-10", desc: "Premium wheat seeds" },
    { id: 2, category: "Fertilizer", amount: 6200, date: "2026-06-15", desc: "Potash and Urea bags" },
    { id: 3, category: "Labor", amount: 8000, date: "2026-06-20", desc: "Field sowing labor wages" },
    { id: 4, category: "Machinery", amount: 3500, date: "2026-06-22", desc: "Tractor rental" },
    { id: 5, category: "Transportation", amount: 2000, date: "2026-06-28", desc: "Mandi transit cargo" },
  ]);

  const [category, setCategory] = useState('Seeds');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [desc, setDesc] = useState('');

  const [incomeInput, setIncomeInput] = useState('68000');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      showToast("Please enter an amount", "warning");
      return;
    }
    const id = expenses.length + 1;
    setExpenses([...expenses, { id, category, amount: parseFloat(amount), date, desc }]);
    setAmount('');
    setDesc('');
    showToast("Expense log recorded!", "success");
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
    showToast("Transaction record removed", "info");
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = parseFloat(incomeInput) || 0;
  const netProfit = totalIncome - totalExpense;

  // Chart dataset
  const chartData = [
    { name: "Seeds", amount: expenses.filter(e => e.category === 'Seeds').reduce((a, b) => a + b.amount, 0) },
    { name: "Fertilizer", amount: expenses.filter(e => e.category === 'Fertilizer').reduce((a, b) => a + b.amount, 0) },
    { name: "Labor", amount: expenses.filter(e => e.category === 'Labor').reduce((a, b) => a + b.amount, 0) },
    { name: "Machinery", amount: expenses.filter(e => e.category === 'Machinery').reduce((a, b) => a + b.amount, 0) },
    { name: "Transport", amount: expenses.filter(e => e.category === 'Transportation').reduce((a, b) => a + b.amount, 0) },
  ];

  const colors = ['#10b981', '#0d9488', '#eab308', '#3b82f6', '#6366f1'];

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    showToast(`Generating report. Your ${format.toUpperCase()} export started!`, "success");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
            <Wallet className="w-6 h-6 text-emerald-600" />
            {t('expenseTracker')}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Track cultivation investments, log income, and export crop financial statements.
          </p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => exportReport('csv')}
            className="p-2 border border-gray-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl text-gray-500 dark:text-gray-400 text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="p-2 border border-gray-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl text-gray-500 dark:text-gray-400 text-xs font-bold flex items-center gap-1"
          >
            <FileText className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Finance Cards (Income, Expense, Profit) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Income Card */}
        <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex justify-between items-center shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Income (₹)</span>
            <input 
              type="number"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              className="text-2xl font-extrabold text-gray-850 dark:text-gray-100 mt-1 bg-transparent border-b border-dashed border-gray-200 dark:border-slate-850 focus:outline-none w-28"
            />
            <span className="text-[9px] text-gray-400 block mt-1">Click to edit sales value</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex justify-between items-center shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Invested Capital (₹)</span>
            <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mt-1">₹{totalExpense.toLocaleString()}</h3>
            <span className="text-[9px] text-gray-400 block mt-1">Sum of logged expenses</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        {/* Net Profit Card */}
        <div className={`p-6 rounded-3xl border shadow-sm flex justify-between items-center ${
          netProfit >= 0 
            ? 'border-emerald-100 dark:border-emerald-950/20 bg-emerald-500/[0.02]' 
            : 'border-rose-100 dark:border-rose-950/20 bg-rose-500/[0.02]'
        }`}>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Net Profit / Loss</span>
            <h3 className={`text-2xl font-extrabold mt-1 ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              ₹{netProfit.toLocaleString()}
            </h3>
            <span className="text-[9px] text-gray-400 block mt-1">Income minus expenses</span>
          </div>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            netProfit >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
          }`}>
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Chart */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Add Expense Form */}
          <form 
            onSubmit={addExpense}
            className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col gap-4 shadow-sm"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Record New Expense</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Labor">Labor / Wages</option>
                  <option value="Machinery">Machinery Rental</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Amount (INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
                />
              </div>

              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <input
                  type="text"
                  placeholder="e.g. purchased urea bags"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-850 bg-transparent text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold py-3 rounded-2xl shadow-md flex items-center justify-center gap-1.5 text-xs mt-2"
            >
              <Plus className="w-4 h-4" /> Save Record
            </button>
          </form>

          {/* Bar chart categories */}
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Investment Categorization</span>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Transactions list */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4 h-full">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Recent Expenses Log</span>
            
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[28rem] no-scrollbar">
              {expenses.map((e) => (
                <div 
                  key={e.id}
                  className="flex justify-between items-center p-3 rounded-2xl border border-gray-50 dark:border-slate-900 bg-slate-50/20 dark:bg-slate-900/10 text-xs font-semibold hover:border-emerald-500/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 text-gray-500 dark:text-gray-400 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">{e.category}</p>
                      <span className="text-[10px] text-gray-400">{e.desc} • {e.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-800 dark:text-gray-200">₹{e.amount}</span>
                    <button
                      onClick={() => deleteExpense(e.id)}
                      className="p-1 rounded text-gray-450 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && (
                <div className="text-center py-20 text-gray-400 text-xs font-semibold">
                  No registered expenses yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default ExpenseTracker;
