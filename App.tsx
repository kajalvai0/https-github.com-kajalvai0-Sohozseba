
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ServiceCard from './components/ServiceCard';
import ChatBot from './components/ChatBot';
import AuthModal from './components/AuthModal';
import { CATEGORIES, SERVICES, UI_STRINGS, LOCATIONS, SAMPLE_BOOKINGS } from './constants';
import { Language, Booking } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeView, setActiveView] = useState<'services' | 'bookings'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocation, setActiveLocation] = useState('All Areas');
  const [lang, setLang] = useState<Language>('bn');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'bn' : 'en');
  const t = UI_STRINGS[lang];

  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesCategory = activeCategory === 'all' || service.categoryId === activeCategory;
      const term = searchQuery.toLowerCase();
      const matchesSearch = service.name.toLowerCase().includes(term) || 
                           service.nameBn.includes(searchQuery) ||
                           service.description.toLowerCase().includes(term) ||
                           service.descriptionBn.includes(searchQuery);
      // For local services, we simulate location match
      const matchesLocation = activeLocation === 'All Areas' || 
                             service.description.includes(activeLocation) || 
                             service.descriptionBn.includes(activeLocation);
      
      return matchesCategory && matchesSearch && matchesLocation;
    });
  }, [activeCategory, searchQuery, activeLocation]);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Layout 
      activeCategory={activeCategory} 
      activeView={activeView}
      onCategoryChange={setActiveCategory} 
      onViewChange={setActiveView}
      categories={CATEGORIES}
      lang={lang}
      onLanguageToggle={toggleLanguage}
    >
      {activeView === 'services' ? (
        <div className="space-y-12 pb-32">
          {/* Navigation Overlays */}
          <div className="flex justify-end -mb-8">
             <button 
               onClick={() => setIsAuthOpen(true)}
               className="bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-2xl text-blue-600 font-bold border border-blue-100 shadow-sm hover:bg-white transition-all flex items-center gap-2"
             >
               <i className="fa-solid fa-user-lock"></i>
               {t.login}
             </button>
          </div>

          {/* Hero Section */}
          <section className="relative rounded-[3.5rem] overflow-hidden bg-slate-900 p-8 md:p-16 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-400/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
            
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-8 border border-white/10 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {lang === 'en' ? 'Sarisahatir Mor, Naogaon' : 'সরিষাহাটীর মোড়, নওগাঁ'}
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                {t.heroTitle}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl font-medium leading-relaxed">
                {t.heroSubtitle}
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
                <div className="flex-1 relative group">
                  <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors group-focus-within:text-blue-500"></i>
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-white focus:bg-white focus:text-slate-900 focus:ring-[6px] focus:ring-blue-500/20 outline-none shadow-2xl transition-all text-base font-medium placeholder:text-slate-500"
                  />
                </div>
                <div className="md:w-56 relative">
                   <i className="fa-solid fa-location-dot absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                   <select 
                     value={activeLocation}
                     onChange={(e) => setActiveLocation(e.target.value)}
                     className="w-full pl-12 pr-4 py-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-white focus:bg-white focus:text-slate-900 outline-none transition-all appearance-none font-bold"
                   >
                     {LOCATIONS.map(loc => <option key={loc} value={loc} className="text-slate-900">{loc}</option>)}
                   </select>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  {activeCategory === 'all' ? t.featured : CATEGORIES.find(c => c.id === activeCategory)?.[lang === 'en' ? 'title' : 'titleBn']}
                </h2>
              </div>
              <p className="text-slate-500 font-medium text-lg">{lang === 'en' ? `Browsing providers in ${activeLocation}` : `${activeLocation} এর দক্ষ কারিগর খুঁজছেন`}</p>
            </div>
          </div>

          {/* Grid of Services */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[4rem] border-2 border-dashed border-slate-200 p-24 text-center shadow-inner">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                <i className="fa-solid fa-search text-4xl"></i>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">{t.noResults}</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-10 text-lg font-medium">
                {lang === 'en' ? `We couldn't find any ${activeCategory !== 'all' ? activeCategory : 'experts'} in ${activeLocation}.` : `দুঃখিত, ${activeLocation}-এ কোনো ${activeCategory !== 'all' ? activeCategory : 'কারিগর'} পাওয়া যায়নি।`}
              </p>
              <button 
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setActiveLocation('All Areas'); }}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-2xl"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 pb-32">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.bookingHistory}</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SAMPLE_BOOKINGS.length > 0 ? (
              SAMPLE_BOOKINGS.map(booking => (
                <div key={booking.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all border-l-8 border-l-blue-600">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
                      <i className="fa-solid fa-file-invoice"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{lang === 'en' ? booking.serviceName : booking.serviceNameBn}</h4>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.bookingId}: {booking.id}</p>
                      <p className="text-sm font-medium text-slate-600 mt-1">{lang === 'en' ? booking.providerName : booking.providerNameBn}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 text-center md:text-left">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.date}</p>
                      <p className="font-bold text-slate-700">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.total}</p>
                      <p className="font-bold text-slate-900 text-lg">{booking.price}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                      {lang === 'en' ? booking.status : booking.statusBn}
                    </div>
                    <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all flex items-center justify-center">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                <i className="fa-solid fa-calendar-xmark text-6xl text-slate-200 mb-6"></i>
                <h3 className="text-2xl font-black text-slate-800">{t.noBookings}</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shared Footer Block */}
      <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden mb-12">
          <div className="absolute -left-10 bottom-0 opacity-[0.03]">
            <i className="fa-solid fa-map-location-dot text-[300px]"></i>
          </div>
          
          <div className="relative z-10 flex-1">
            <h4 className="text-3xl font-black text-slate-900 mb-6">{lang === 'en' ? 'Connect Directly With Us' : 'সরাসরি আমাদের সাথে যোগাযোগ করুন'}</h4>
            <div className="space-y-4 text-lg font-medium text-slate-600">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-phone text-blue-600"></i>
                <span>+880 1712 345678</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-envelope text-blue-600"></i>
                <span>info@sohojseba.net</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-map-pin text-blue-600"></i>
                <span>{lang === 'en' ? '123 Sarisahatir Mor, Naogaon.' : '১২৩ সরিষাহাটীর মোড়, নওগাঁ।'}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4">
              <p className="font-bold text-center text-slate-500 uppercase tracking-widest text-xs">Follow Our Community</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fa-brands fa-youtube"></i></a>
                <a href="#" className="w-12 h-12 bg-blue-50 text-sky-500 rounded-xl flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></a>
              </div>
            </div>
          </div>
      </div>

      <ChatBot lang={lang} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} lang={lang} />
    </Layout>
  );
};

export default App;
