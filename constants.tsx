
import { ServiceCategory, ServiceItem, Booking } from './types';

export const CATEGORIES: ServiceCategory[] = [
  { id: 'electrical', title: 'Electrician', titleBn: 'ইলেকট্রিশিয়ান', icon: 'fa-plug-circle-bolt', color: 'bg-yellow-500' },
  { id: 'plumbing', title: 'Plumber', titleBn: 'প্লাম্বার', icon: 'fa-faucet-drip', color: 'bg-blue-500' },
  { id: 'mechanic', title: 'Bike Mechanic', titleBn: 'বাইক মেকানিক', icon: 'fa-screwdriver-wrench', color: 'bg-orange-500' },
  { id: 'painting', title: 'Painter', titleBn: 'পেইন্টার', icon: 'fa-paint-roller', color: 'bg-pink-500' },
  { id: 'tailor', title: 'Tailor', titleBn: 'দর্জি', icon: 'fa-scissors', color: 'bg-purple-500' },
  { id: 'agriculture', title: 'Agriculture', titleBn: 'কৃষি সহায়তা', icon: 'fa-wheat-awn', color: 'bg-green-500' },
];

export const SERVICES: ServiceItem[] = [
  { 
    id: 'e1', 
    categoryId: 'electrical', 
    name: 'Rahim Electrical', 
    nameBn: 'রহিম ইলেকট্রিক্যাল', 
    description: 'Expert house wiring and fan repair in Sarisahatir Mor.', 
    descriptionBn: 'সরিষাহাটীর মোড়ে হাউজ ওয়্যারিং এবং ফ্যান মেরামতে অভিজ্ঞ।', 
    phone: '01712345678', 
    type: 'phone' 
  },
  { 
    id: 'p1', 
    categoryId: 'plumbing', 
    name: 'Karim Plumbing', 
    nameBn: 'করিম প্লাম্বিং', 
    description: 'Expert in pipeline repair and bathroom fittings.', 
    descriptionBn: 'পাইপলাইন মেরামত এবং বাথরুম ফিটিংসে অভিজ্ঞ।', 
    phone: '01700000000', 
    type: 'phone' 
  },
  { 
    id: 'm1', 
    categoryId: 'mechanic', 
    name: 'Bike Doctor', 
    nameBn: 'বাইক ডক্টর', 
    description: 'Specialized in Indian and Japanese bike servicing.', 
    descriptionBn: 'ইন্ডিয়ান ও জাপানিজ বাইক সার্ভিসিং স্পেশালিস্ট।', 
    phone: '01800000000', 
    type: 'phone' 
  },
  { 
    id: 't1', 
    categoryId: 'tailor', 
    name: 'Adarsha Tailors', 
    nameBn: 'আদর্শ টেইলার্স', 
    description: 'High quality gents tailoring and fitting.', 
    descriptionBn: 'উন্নত মানের জেন্টস টেইলারিং ও ফিটিং।', 
    phone: '01900000000', 
    type: 'phone' 
  }
];

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    serviceName: 'House Wiring',
    serviceNameBn: 'হাউজ ওয়্যারিং',
    providerName: 'Rahim Electrical',
    providerNameBn: 'রহিম ইলেকট্রিক্যাল',
    date: '2023-10-24',
    status: 'Completed',
    statusBn: 'সম্পন্ন',
    price: '৳ ১২০০'
  },
  {
    id: 'BK-1002',
    serviceName: 'Bathroom Fitting',
    serviceNameBn: 'বাথরুম ফিটিং',
    providerName: 'Karim Plumbing',
    providerNameBn: 'করিম প্লাম্বিং',
    date: '2023-11-05',
    status: 'Scheduled',
    statusBn: 'নির্ধারিত',
    price: '৳ ৮৫০'
  },
  {
    id: 'BK-1003',
    serviceName: 'Bike Service',
    serviceNameBn: 'বাইক সার্ভিস',
    providerName: 'Bike Doctor',
    providerNameBn: 'বাইক ডক্টর',
    date: '2023-11-12',
    status: 'Pending',
    statusBn: 'অপেক্ষমান',
    price: '৳ ৫৫০'
  }
];

export const LOCATIONS = [
  'All Areas',
  'Sarisahatir Mor',
  'Naogaon Sadar',
  'Hossenpur',
  'Rajarbag',
  'Santal Para'
];

export const UI_STRINGS = {
  en: {
    heroTitle: 'Find Local Experts Instantly.',
    heroSubtitle: 'Connect with verified electricians, plumbers, and mechanics in Naogaon.',
    searchPlaceholder: 'What service do you need? (e.g. Electrician)...',
    allServices: 'All Services',
    categories: 'Local Categories',
    featured: 'Available Now in Your Area',
    noResults: 'No providers found',
    clearFilters: 'Clear filters',
    askGemini: 'Ask Gemini for a local pro!',
    guest: 'Guest User',
    free: 'OTP Verified',
    login: 'Login / Register',
    location: 'Area',
    myBookings: 'My Bookings',
    bookingHistory: 'Booking History',
    bookingId: 'ID',
    status: 'Status',
    date: 'Date',
    total: 'Total',
    noBookings: 'No bookings found.'
  },
  bn: {
    heroTitle: 'সহজেই খুঁজুন আপনার এলাকার দক্ষ কারিগর।',
    heroSubtitle: 'নওগাঁর ভেরিফাইড ইলেকট্রিশিয়ান, প্লাম্বার এবং মেকানিকদের সাথে যোগাযোগ করুন।',
    searchPlaceholder: 'আপনার কোন সেবা প্রয়োজন? (যেমন: ইলেকট্রিশিয়ান)...',
    allServices: 'সব সেবা',
    categories: 'সেবা ক্যাটাগরি',
    featured: 'আপনার এলাকার কারিগররা',
    noResults: 'কোনো কারিগর পাওয়া যায়নি',
    clearFilters: 'ফিল্টার মুছে ফেলুন',
    askGemini: 'জেমিইনাইকে সাহায্য করতে বলুন!',
    guest: 'অতিথি ব্যবহারকারী',
    free: 'OTP ভেরিফাইড',
    login: 'লগইন / রেজিস্ট্রেশন',
    location: 'এলাকা',
    myBookings: 'আমার বুকিং',
    bookingHistory: 'বুকিং ইতিহাস',
    bookingId: 'আইডি',
    status: 'অবস্থা',
    date: 'তারিখ',
    total: 'মোট',
    noBookings: 'কোনো বুকিং পাওয়া যায়নি।'
  }
};
