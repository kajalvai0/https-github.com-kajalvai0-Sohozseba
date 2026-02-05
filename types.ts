
export type Language = 'en' | 'bn';

export interface ServiceCategory {
  id: string;
  title: string;
  titleBn: string;
  icon: string;
  color: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  link?: string;
  phone?: string;
  type: 'link' | 'phone' | 'info';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingUrls?: { title: string, uri: string }[];
}

export interface Booking {
  id: string;
  serviceName: string;
  serviceNameBn: string;
  providerName: string;
  providerNameBn: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Scheduled' | 'Cancelled';
  statusBn: 'সম্পন্ন' | 'অপেক্ষমান' | 'নির্ধারিত' | 'বাতিল';
  price: string;
}
