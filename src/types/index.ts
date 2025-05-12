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
  icon: LucideIcon;
  text: string;
}

export interface Experience {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TimelineItem {
  icon: LucideIcon;
  title: string;
  description: string;
  timeSlot: string;
}

export interface Bonus {
  icon: LucideIcon;
  title: string;
  description: string;
  worth: string;
}