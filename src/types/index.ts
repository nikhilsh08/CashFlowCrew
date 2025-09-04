import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Message {
  type: 'student' | 'instructor';
  text: string;
  time: string;
}

export interface Testimonial {
  name: string;
  avatar: string;
  messages: Message[];
}

export interface EventDetail {
  icon: typeof LucideIcon;
  text: string;
}

export interface Experience {
  icon: typeof LucideIcon;
  title: string;
  description: string;
}

export interface TimelineItem {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  timeSlot: string;
}

export interface Bonus {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  worth: Number;
}

export interface PhonePePaymentStatusResponse {
  success: boolean;
  status: string; // e.g. "FAILED", "SUCCESS", "PENDING"
  data: PaymentStatusData;
  merchantOrderId: string;
}

export interface PaymentStatusData {
  orderId: string;
  state: string; // e.g. "FAILED", "COMPLETED"
  amount: number; // in paise
  expireAt: number; // timestamp (ms)
  errorCode?: string;
  detailedErrorCode?: string;
  paymentDetails: PaymentDetail[];
}

export interface PaymentDetail {
  paymentMode: string; // e.g. "CARD", "UPI"
  transactionId: string;
  timestamp: number; // timestamp (ms)
  amount: number;
  state: string; // e.g. "FAILED", "COMPLETED"
  errorCode?: string;
  detailedErrorCode?: string;
  splitInstruments: SplitInstrument[];
}

export interface SplitInstrument {
  amount: number;
  rail: RailInfo;
  instrument: InstrumentInfo;
}

export interface RailInfo {
  type: string; // e.g. "PG"
  transactionId: string;
  authorizationCode?: string;
  serviceTransactionId?: string;
}

export interface InstrumentInfo {
  type: string; // e.g. "CREDIT_CARD"
  bankTransactionId?: string;
  bankId?: string;
  arn?: string;
  brn?: string;
  geoScope?: string; // e.g. "DOMESTIC"
  cardNetwork?: string; // e.g. "VISA"
  maskedCardNumber?: string;
}

export interface Masterclass {
  email: string;
  title: string;
  description: string;
  instructor: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: string;
  price: number;
  location: string;
  meeting_link: string;
  currency: string;
  isRegistrationOpen: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}