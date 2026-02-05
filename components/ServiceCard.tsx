
import React from 'react';
import { ServiceItem, Language } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  lang: Language;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, lang }) => {
  const isPhone = service.type === 'phone';
  const name = lang === 'en' ? service.name : service.nameBn;
  const desc = lang === 'en' ? service.description : service.descriptionBn;

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-200 p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <i className={`fa-solid ${isPhone ? 'fa-phone' : 'fa-link'} text-6xl rotate-12`}></i>
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 ${isPhone ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-100' : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-100'}`}>
          <i className={`fa-solid ${isPhone ? 'fa-phone' : 'fa-arrow-up-right-from-square'} text-xl`}></i>
        </div>
        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[1.5px] border ${isPhone ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
          {service.type}
        </span>
      </div>

      <div className="mb-8 flex-1 relative z-10">
        <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{name}</h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
      </div>

      <div className="mt-auto relative z-10">
        {isPhone ? (
          <a 
            href={`tel:${service.phone}`}
            className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 group-hover:shadow-xl"
          >
            <i className="fa-solid fa-phone-volume animate-bounce"></i>
            <span>{lang === 'en' ? 'Call Now' : 'কল করুন'} {service.phone}</span>
          </a>
        ) : (
          <a 
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <span>{lang === 'en' ? 'Access Service' : 'সেবাটি ব্যবহার করুন'}</span>
            <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
