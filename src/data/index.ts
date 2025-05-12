import {
  Calendar,
  Clock,
  Video,
  Building2,
  Briefcase,
  Target,
  Rocket,
  LineChart,
  ArrowDownUp,
  PieChart,
  Shield,
  Wallet,
  TrendingUp,
  Target as TargetIcon,
  AlertTriangle,
  FileText,
  BarChart2,
  BookOpen,
  PenTool as Tool,
  Bot
} from 'lucide-react';
import { Testimonial, EventDetail, Experience, TimelineItem, Bonus } from '../types';

const today = new Date().toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export const eventDetails: EventDetail[] = [
  { icon: Clock, text: "1 Day" },
  { icon: Video, text: "Live Session" },
  { icon: Calendar, text: today },
  { icon: Clock, text: "4 PM – 7 PM IST" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    messages: [
      { type: "student", text: "Sir, your SIP vs lumpsum explanation was GOLD! 🙌", time: "9:41 AM" },
      { type: "instructor", text: "Keep investing consistently! 🚀", time: "9:45 AM" },
      { type: "student", text: "Will do! This course changed everything for me 😃", time: "9:46 AM" }
    ]
  },
  {
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    messages: [
      { type: "student", text: "The alpha & beta concepts were confusing at first 😅", time: "2:15 PM" },
      { type: "instructor", text: "Think of alpha as bonus points, beta as market risk level 📊", time: "2:20 PM" },
      { type: "student", text: "That makes perfect sense! Thank you 🙌", time: "2:22 PM" }
    ]
  },
  {
    name: "Amit Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    messages: [
      { type: "student", text: "Love how practical the portfolio analysis was! 📈", time: "7:30 PM" },
      { type: "instructor", text: "Glad it helped! Keep applying these concepts 💡", time: "7:35 PM" },
      { type: "student", text: "Best investment course ever! Worth every penny 💯", time: "7:36 PM" }
    ]
  }
];

export const targetAudience = [
  'Aspiring Investors',
  'Finance Enthusiasts',
  'Beginners in Mutual Funds',
  'Young Professionals',
  'Students Curious About Investments',
  'Retirees Seeking Financial Security',
];

export const experiences: Experience[] = [
  {
    icon: Building2,
    title: "Goldman Sachs (4+ years)",
    description: "Managed $65Bn AUM, risk analysis for flagship hedge funds"
  },
  {
    icon: Briefcase,
    title: "Credy",
    description: "Led sales for Y-Combinator backed FinTech"
  },
  {
    icon: Target,
    title: "LocoNav",
    description: "Scaled enterprise sales, secured major partnerships"
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    description: "Founded LitmusEye & BlueFlowerCo"
  }
];

export const timelineItems: TimelineItem[] = [
  {
    icon: LineChart,
    title: "Performance vs Benchmark: The Key to Success",
    description: "Understand why mutual fund performance must be compared to its benchmark. Learn to evaluate funds promising outperformance.",
    timeSlot: "00 mins - 15 mins"
  },
  {
    icon: ArrowDownUp,
    title: "Sortino Ratio: Your Guide to Downside Volatility",
    description: "Master the Sortino Ratio to assess downside risk, ensuring smarter investment choices.",
    timeSlot: "15 mins - 30 mins"
  },
  {
    icon: PieChart,
    title: "Active Weight and Sector Breakdown",
    description: "Learn the importance of active weight and sector allocations to understand where your money is invested.",
    timeSlot: "30 mins - 45 mins"
  },
  {
    icon: Shield,
    title: "Active Share and Risk Assessment",
    description: "Measure a fund manager's risk-taking with active share analysis and align investments with risk tolerance.",
    timeSlot: "45 mins - 60 mins"
  },
  {
    icon: Wallet,
    title: "Asset Allocation: The Real Game-Changer",
    description: "Discover why asset allocation is the most critical factor in mutual fund investing and how to optimize it for financial goals.",
    timeSlot: "60 mins - 1:15 hrs"
  },
  {
    icon: TrendingUp,
    title: "Volatility as an Opportunity",
    description: "Learn how to use market volatility to your advantage, increasing investments when markets dip, like shopping during sales.",
    timeSlot: "1:15 hrs - 1:30 hrs"
  },
  {
    icon: TargetIcon,
    title: "Long-Term Goals and Financial Freedom",
    description: "Set clear financial targets, such as accumulating 50x your annual expenses, to achieve financial independence.",
    timeSlot: "1:30 hrs - 1:45 hrs"
  },
  {
    icon: AlertTriangle,
    title: "Avoid Pitfalls and Make Smarter Choices",
    description: "Understand why debt funds might not be ideal, the role of equity, how index funds work differently in India, and why sectoral funds may not always be a good choice.",
    timeSlot: "1:45 hrs - 2 hrs"
  }
];

export const bonuses: Bonus[] = [
  {
    icon: FileText,
    title: "Mutual Fund Investment Starter Guide",
    description: "Learn the fundamentals of mutual fund investing with this easy-to-follow guide, perfect for beginners.",
    worth: "1,500"
  },
  {
    icon: BarChart2,
    title: "Quick Hacks to Improve Portfolio Returns",
    description: "Discover actionable strategies to optimize your mutual fund portfolio and maximize returns.",
    worth: "1,500"
  },
  {
    icon: TrendingUp,
    title: "Monthly Portfolio Audit Checklist",
    description: "Stay on track with your financial goals by using this comprehensive portfolio evaluation blueprint.",
    worth: "2,000"
  },
  {
    icon: BookOpen,
    title: "Essential Mutual Fund Strategies for Beginners",
    description: "Master the key strategies for mutual fund selection and smart investing.",
    worth: "1,500"
  },
  {
    icon: Tool,
    title: "Portfolio Analysis Tools & Templates",
    description: "Access powerful tools and ready-to-use templates to make better financial decisions.",
    worth: "1,000"
  },
  {
    icon: Bot,
    title: "ChatGPT Prompts for Analyzing Fund Performances",
    description: "Leverage AI-powered prompts to evaluate mutual fund performance and refine your investment decisions.",
    worth: "1,500"
  }
];