
import React, { useState } from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  activeView: 'services' | 'bookings';
  onCategoryChange: (id: string) => void;
  onViewChange: (view: 'services' | 'bookings') => void;
  categories: any[];
  lang: Language;
  onLanguageToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeCategory, 
  activeView,
  onCategoryChange, 
  onViewChange,
  categories, 
  lang, 
  onLanguageToggle 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = UI_STRINGS[lang];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f1f5f9]">
      {/* Mobile Header */}
      <header className="md:hidden bg-blue-700/90 backdrop-blur-md text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <i className="fa-solid fa-bolt text-yellow-300"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Sohozseba <span className="text-yellow-300">AI</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onLanguageToggle} className="text-xs font-bold px-2 py-1 bg-white/20 rounded-md">
            {lang === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-500 ease-out md:translate-x-0 md:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 hidden md:flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
            <i className="fa-solid fa-bolt text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-800">Sohozseba <span className="text-blue-600 italic">AI</span></h1>
        </div>

        <div className="px-6 mb-4">
           <button 
             onClick={onLanguageToggle} 
             className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-700 transition-all border border-slate-200"
           >
             <i className="fa-solid fa-language text-blue-600"></i>
             {lang === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
           </button>
        </div>

        <nav className="px-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)] pb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-4">{t.categories}</p>
          <button
            onClick={() => { onCategoryChange('all'); onViewChange('services'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${activeView === 'services' && activeCategory === 'all' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <i className="fa-solid fa-grid-2 w-5 text-center"></i>
            <span>{t.allServices}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { onCategoryChange(cat.id); onViewChange('services'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${activeView === 'services' && activeCategory === cat.id ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
            >
              <i className={`fa-solid ${cat.icon} w-5 text-center ${activeView === 'services' && activeCategory === cat.id ? 'text-white' : 'text-slate-400'}`}></i>
              <span className="text-sm font-medium">{lang === 'en' ? cat.title : cat.titleBn}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => { onViewChange('bookings'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${activeView === 'bookings' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
            >
              <i className={`fa-solid fa-calendar-check w-5 text-center ${activeView === 'bookings' ? 'text-white' : 'text-slate-400'}`}></i>
              <span className="text-sm font-medium">{t.myBookings}</span>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-100 bg-white/50">
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <i className="fa-solid fa-user-circle text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">{t.guest}</span>
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{t.free}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen scroll-smooth">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
