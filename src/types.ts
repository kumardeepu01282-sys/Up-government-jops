/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type JobCategory =
  | 'latest-jobs'
  | 'sewayojan-jobs'
  | 'admit-card'
  | 'result'
  | 'answer-key'
  | 'rojgar-mela'
  | 'scholarship'
  | 'government-schemes';

export interface JobPost {
  id: string;
  category: JobCategory;
  title: string;          // e.g. "UP Sewayojan Vacancy 2026"
  titleHindi: string;     // Hindi title
  organization: string;   // संस्था का नाम (e.g. "Uttar Pradesh Jal Nigam")
  postName: string;       // पद का नाम (e.g. "Junior Engineer")
  totalPosts: number;     // कुल पद
  eligibility: string;    // योग्यता (e.g. "Diploma in Civil Engineering")
  eligibilityHindi: string;
  ageLimit: string;       // आयु सीमा (e.g. "18 - 40 Years")
  ageLimitHindi: string;  // आयु सीमा (हिन्दी)
  salary: string;         // वेतन (e.g. "Rs. 35,400 - 1,12,400/-")
  startDate: string;      // आवेदन शुरू होने की तारीख (YYYY-MM-DD or readable string)
  endDate: string;        // अंतिम तारीख (YYYY-MM-DD or readable string)
  applicationFee: string; // आवेदन शुल्क
  applicationFeeHindi: string;
  selectionProcess: string; // चयन प्रक्रिया
  selectionProcessHindi: string;
  notificationLink: string; // Official Notification URL
  applyLink: string;        // Apply Online URL (Official only)
  importantNote?: string;   // Extra notes or safety reminders
  importantNoteHindi?: string;
  postedDate: string;       // Date posted
  viewsCount?: number;
  featured?: boolean;
}

export interface QuickLink {
  label: string;
  labelHindi: string;
  url: string;
  isExternal: boolean;
}
