import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, fmt = "MMMM d, yyyy") {
  return format(new Date(date), fmt);
}

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isUpcoming(date: string | Date) {
  return isAfter(new Date(date), new Date());
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

// Simple rate limiting via in-memory map (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

export const VOLUNTEER_INTERESTS = [
  "Canvassing",
  "Social Media",
  "Event Organization",
  "Photography/Videography",
  "Graphic Design",
  "Data Entry",
  "Phone Banking",
  "Translation",
  "Fundraising",
  "Street Teams",
] as const;

export const PRIORITY_ICONS: Record<string, string> = {
  "Student Welfare": "Heart",
  "Academic Excellence": "BookOpen",
  "Mental Health": "Brain",
  "Campus Facilities": "Building2",
  "Student Representation": "Users",
  "Career Development": "Briefcase",
};
