/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  RotateCcw, 
  ExternalLink, 
  Calendar, 
  Coins, 
  UserCheck, 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  Share2, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Edit, 
  X, 
  AlertTriangle,
  Award,
  BookOpen,
  Send,
  Languages,
  ArrowRight,
  Bell,
  Sparkles,
  SearchCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JobPost, JobCategory, QuickLink } from './types';
import { INITIAL_JOB_POSTS, INITIAL_QUICK_LINKS } from './data/initialData';

// Multi-language translation map
const TRANSLATIONS = {
  en: {
    title: "UP Government Jobs",
    subtitle: "Rojgar Sangam, Sewayojan & Sarkari Vacancy Update Portal",
    tagline: "Your verified gateway to all official recruitment in Uttar Pradesh",
    announcements: "Announcements",
    searchPlaceholder: "Search by title, department, qualification, or post...",
    filterByQualification: "Filter by Qualification",
    filterByCategory: "Filter by Category",
    all: "All",
    latestJobs: "Latest Government Jobs",
    sewayojanJobs: "Sewayojan & Private Jobs",
    admitCard: "Admit Card",
    result: "Exam Result",
    answerKey: "Answer Key",
    rojgarMela: "Rojgar Mela & Schemes",
    scholarship: "Scholarship & Schemes",
    quickLinks: "Direct Portals",
    posterPanel: "Job Poster Panel (CMS)",
    posterPanelDesc: "Use this form to post, update, or remove vacancies dynamically in real-time. Changes persist in local storage.",
    addVacancyBtn: "Add New Vacancy",
    editVacancyBtn: "Update Vacancy",
    resetBtn: "Reset to Default Data",
    activeLabel: "Active / Apply Now",
    closedLabel: "Closed / Ended",
    newLabel: "New Alert",
    detailsTitle: "Vacancy Specifications",
    orgLabel: "Organization / Institution",
    postLabel: "Post Name",
    totalPostsLabel: "Total Posts",
    eligibilityLabel: "Required Eligibility / Qualification",
    ageLimitLabel: "Age Limit & Criteria",
    salaryLabel: "Salary / Consolidated Pay",
    startDateLabel: "Application Start Date",
    endDateLabel: "Last Date to Apply",
    feeLabel: "Application Fee Structure",
    selectionLabel: "Selection Process",
    notificationLabel: "Official Notification PDF",
    applyLabel: "Apply Online (Official)",
    disclaimerTitle: "Important Safety Instructions",
    disclaimerDesc: "This website serves as an informational aggregator. You must always read the official notification carefully and apply only through the official portal/Sewayojan link provided above.",
    formTitle: "Create or Edit Vacancy Card",
    closeBtn: "Close",
    printBtn: "Print Details",
    shareBtn: "Share Vacancy",
    copySuccess: "Share link copied to clipboard!",
    successAdd: "New job alert added successfully!",
    successUpdate: "Job alert updated successfully!",
    successDelete: "Vacancy deleted successfully!",
    successReset: "Database reset to initial standard UP vacancies!",
    aboutSewayojan: "About Sewayojan Portal",
    aboutSewayojanDesc: "Rojgar Sangam Sewayojan Portal is an initiative of Uttar Pradesh government connecting job seekers with government departments, outsourcing partners, and private employers across UP.",
    contactInfo: "Uttar Pradesh Employment Exchange Department Helpline: 155330 / 18001805307",
    copyright: "© 2026 UP Government Jobs & Sewayojan Update Portal. All rights reserved. Managed & updated locally.",
    postsCount: "Posts",
    bilingualDesc: "Note: You can write text in both Hindi & English below."
  },
  hi: {
    title: "UP गवर्नमेंट जॉब्स",
    subtitle: "रोजगार संगम, सेवायोजन एवं सरकारी नौकरी अपडेट पोर्टल",
    tagline: "उत्तर प्रदेश में सभी आधिकारिक भर्तियों के लिए आपका प्रमाणित पोर्टल",
    announcements: "महत्वपूर्ण सूचनाएं",
    searchPlaceholder: "पद, विभाग, योग्यता या नौकरी खोजें...",
    filterByQualification: "योग्यता के अनुसार चुनें",
    filterByCategory: "श्रेणी के अनुसार चुनें",
    all: "सभी",
    latestJobs: "नवीनतम सरकारी नौकरियां",
    sewayojanJobs: "सेवायोजन एवं प्राइवेट जॉब्स",
    admitCard: "प्रवेश पत्र (Admit Card)",
    result: "परीक्षा परिणाम (Result)",
    answerKey: "उत्तर कुंजी (Answer Key)",
    rojgarMela: "रोजगार मेला एवं योजनाएं",
    scholarship: "स्कॉलरशिप एवं सरकारी योजनाएं",
    quickLinks: "सीधे पोर्टल लिंक्स",
    posterPanel: "वेकेंसी अपडेट टूल (CMS)",
    posterPanelDesc: "इस फॉर्म का उपयोग करके आप नई वेकेंसी जोड़ सकते हैं, पुरानी हटा सकते हैं या संपादित कर सकते हैं। बदलाव तुरंत लागू होंगे।",
    addVacancyBtn: "नई वेकेंसी जोड़ें",
    editVacancyBtn: "वेकेंसी अपडेट करें",
    resetBtn: "डेटा रीसेट करें",
    activeLabel: "सक्रिय / आवेदन करें",
    closedLabel: "समाप्त / अंतिम तिथि समाप्त",
    newLabel: "नया अपडेट",
    detailsTitle: "भर्ती विवरण तालिका",
    orgLabel: "संस्था का नाम",
    postLabel: "पद का नाम",
    totalPostsLabel: "कुल पद",
    eligibilityLabel: "अनिवार्य योग्यता / पात्रता",
    ageLimitLabel: "आयु सीमा",
    salaryLabel: "वेतनमान / मानदेय",
    startDateLabel: "आवेदन शुरू होने की तिथि",
    endDateLabel: "आवेदन की अंतिम तिथि",
    feeLabel: "आवेदन शुल्क विवरण",
    selectionLabel: "चयन प्रक्रिया",
    notificationLabel: "आधिकारिक अधिसूचना डाउनलोड करें",
    applyLabel: "ऑनलाइन आवेदन (आधिकारिक लिंक)",
    disclaimerTitle: "महत्वपूर्ण सुरक्षा निर्देश",
    disclaimerDesc: "यह वेबसाइट एक सूचना सेवा प्रदाता है। उम्मीदवारों को हमेशा सलाह दी जाती है कि वे आधिकारिक अधिसूचना को ध्यान से पढ़ें और केवल ऊपर दिए गए आधिकारिक पोर्टल / सेवायोजन लिंक के माध्यम से ही आवेदन करें।",
    formTitle: "भर्ती फॉर्म जोड़ें / संपादित करें",
    closeBtn: "बंद करें",
    printBtn: "विवरण प्रिंट करें",
    shareBtn: "शेयर करें",
    copySuccess: "शेयर लिंक क्लिपबोर्ड पर कॉपी हो गया!",
    successAdd: "नया जॉब अलर्ट सफलतापूर्वक जोड़ा गया!",
    successUpdate: "भर्ती विवरण सफलतापूर्वक अपडेट किया गया!",
    successDelete: "वेकेंसी सफलतापूर्वक हटा दी गई!",
    successReset: "डेटाबेस को पुनः मानक उत्तर प्रदेश भर्तियों में रीसेट किया गया!",
    aboutSewayojan: "सेवायोजन पोर्टल के बारे में",
    aboutSewayojanDesc: "रोजगार संगम सेवायोजन पोर्टल उत्तर प्रदेश सरकार की एक अनूठी पहल है जो नौकरी चाहने वाले युवाओं को सरकारी विभागों, आउटसोर्सिंग कंपनियों और निजी नियोक्ताओं से सीधे जोड़ती है।",
    contactInfo: "उत्तर प्रदेश रोजगार विभाग हेल्पलाइन नंबर: 155330 / 18001805307",
    copyright: "© 2026 यूपी गवर्नमेंट जॉब्स एवं सेवायोजन अपडेट पोर्टल। सभी अधिकार सुरक्षित।",
    postsCount: "पद",
    bilingualDesc: "नोट: आप नीचे दिए गए फॉर्म में हिंदी और अंग्रेजी दोनों भाषाओं में जानकारी लिख सकते हैं।"
  }
};

export default function App() {
  // Lang State: 'en' for English, 'hi' for Hindi, 'bilingual' to show both side-by-side or combined
  const [lang, setLang] = useState<'en' | 'hi' | 'bilingual'>('bilingual');
  
  // Storage Key
  const STORAGE_KEY = 'up_jobs_portal_data';
  
  // Core Jobs Data state
  const [jobs, setJobs] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed parsing stored jobs, resetting", e);
      }
    }
    return INITIAL_JOB_POSTS;
  });

  // Save to localStorage whenever jobs state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  // Current Time State (IST Simulation)
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time or local formatted view with dynamic clock ticking
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // UI Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('all');
  const [selectedSector, setSelectedSector] = useState<'all' | 'govt' | 'sewayojan' | 'others'>('all');

  // Selected post for detail popup modal
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  // Active Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Admin / Poster mode toggle
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);

  // New Job state (for Admin adding/editing)
  const emptyForm: Omit<JobPost, 'id' | 'postedDate'> = {
    category: 'latest-jobs',
    title: '',
    titleHindi: '',
    organization: '',
    postName: '',
    totalPosts: 1,
    eligibility: '',
    eligibilityHindi: '',
    ageLimit: '18 - 40 Years',
    ageLimitHindi: '18 - 40 वर्ष',
    salary: '',
    startDate: '',
    endDate: '',
    applicationFee: 'General/OBC: Rs. 0/- | SC/ST: Rs. 0/-',
    applicationFeeHindi: 'सामान्य/ओबीसी: रु. 0/- | एससी/ST: रु. 0/-',
    selectionProcess: 'Merit List or Interview',
    selectionProcessHindi: 'योग्यता सूची या साक्षात्कार',
    notificationLink: 'https://sewayojan.up.nic.in/',
    applyLink: 'https://sewayojan.up.nic.in/',
    importantNote: '',
    importantNoteHindi: '',
    featured: false
  };

  const [formData, setFormData] = useState(emptyForm);

  // Handle open form for editing
  const startEdit = (job: JobPost) => {
    setEditingJob(job);
    setFormData({
      category: job.category,
      title: job.title,
      titleHindi: job.titleHindi,
      organization: job.organization,
      postName: job.postName,
      totalPosts: job.totalPosts,
      eligibility: job.eligibility,
      eligibilityHindi: job.eligibilityHindi,
      ageLimit: job.ageLimit,
      ageLimitHindi: job.ageLimitHindi,
      salary: job.salary,
      startDate: job.startDate,
      endDate: job.endDate,
      applicationFee: job.applicationFee,
      applicationFeeHindi: job.applicationFeeHindi,
      selectionProcess: job.selectionProcess,
      selectionProcessHindi: job.selectionProcessHindi,
      notificationLink: job.notificationLink,
      applyLink: job.applyLink,
      importantNote: job.importantNote || '',
      importantNoteHindi: job.importantNoteHindi || '',
      featured: job.featured || false
    });
    // Scroll to the creator tool
    const elem = document.getElementById('poster-panel-anchor');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit Handler for Admin Form
  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.titleHindi) {
      triggerToast(lang === 'hi' ? 'कृपया भर्ती का शीर्षक (अंग्रेजी और हिंदी दोनों में) दर्ज करें!' : 'Please enter Job Title in both English & Hindi!', 'error');
      return;
    }

    if (editingJob) {
      // Edit mode
      setJobs(prev => prev.map(job => job.id === editingJob.id ? {
        ...job,
        ...formData,
        postedDate: new Date().toISOString().split('T')[0] // updated date
      } : job));
      triggerToast(lang === 'hi' ? TRANSLATIONS.hi.successUpdate : TRANSLATIONS.en.successUpdate, 'success');
      setEditingJob(null);
    } else {
      // Create mode
      const newJob: JobPost = {
        ...formData,
        id: `custom-${Date.now()}`,
        postedDate: new Date().toISOString().split('T')[0]
      };
      setJobs(prev => [newJob, ...prev]);
      triggerToast(lang === 'hi' ? TRANSLATIONS.hi.successAdd : TRANSLATIONS.en.successAdd, 'success');
    }

    // Reset Form
    setFormData(emptyForm);
  };

  // Delete Job handler
  const handleDeleteJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal triggering
    if (confirm(lang === 'hi' ? 'क्या आप वाकई इस भर्ती को हटाना चाहते हैं?' : 'Are you sure you want to delete this vacancy post?')) {
      setJobs(prev => prev.filter(job => job.id !== id));
      if (selectedJob?.id === id) setSelectedJob(null);
      triggerToast(lang === 'hi' ? TRANSLATIONS.hi.successDelete : TRANSLATIONS.en.successDelete, 'info');
    }
  };

  // Reset data handler
  const handleResetData = () => {
    if (confirm(lang === 'hi' ? 'क्या आप डेटाबेस को रीसेट करके प्रारंभिक उत्तर प्रदेश नौकरियों को पुनः स्थापित करना चाहते हैं?' : 'Reset entire database to standard default UP vacancies? This overwrites your changes.')) {
      setJobs(INITIAL_JOB_POSTS);
      setEditingJob(null);
      setFormData(emptyForm);
      triggerToast(lang === 'hi' ? TRANSLATIONS.hi.successReset : TRANSLATIONS.en.successReset, 'success');
    }
  };

  // Helpers for Qualification filters matching
  const hasQualificationMatch = (job: JobPost, qual: string) => {
    if (qual === 'all') return true;
    const text = (job.eligibility + ' ' + job.eligibilityHindi + ' ' + job.title + ' ' + job.titleHindi).toLowerCase();
    
    if (qual === '10th') {
      return text.includes('10th') || text.includes('high school') || text.includes('हाई स्कूल') || text.includes('10वीं') || text.includes('8th');
    }
    if (qual === '12th') {
      return text.includes('12th') || text.includes('intermediate') || text.includes('इंटरमीडिएट') || text.includes('12वीं');
    }
    if (qual === 'graduate') {
      return text.includes('graduate') || text.includes('bachelor') || text.includes('degree') || text.includes('स्नातक') || text.includes('b.tech') || text.includes('mba') || text.includes('b.ed');
    }
    if (qual === 'diploma') {
      return text.includes('diploma') || text.includes('iti') || text.includes('डिप्लोमा') || text.includes('आईटीआई');
    }
    if (qual === 'ccc') {
      return text.includes('ccc') || text.includes('c.c.c.') || text.includes('सीसीसी') || text.includes('computer');
    }
    return true;
  };

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Search Query
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(query) ||
        job.titleHindi.toLowerCase().includes(query) ||
        job.organization.toLowerCase().includes(query) ||
        job.postName.toLowerCase().includes(query) ||
        job.eligibility.toLowerCase().includes(query) ||
        job.eligibilityHindi.toLowerCase().includes(query);

      // 2. Qualification Filter
      const matchesQual = hasQualificationMatch(job, selectedQualification);

      // 3. Sector Filter
      let matchesSector = true;
      if (selectedSector === 'govt') {
        matchesSector = job.category === 'latest-jobs' || job.category === 'admit-card' || job.category === 'result' || job.category === 'answer-key';
      } else if (selectedSector === 'sewayojan') {
        matchesSector = job.category === 'sewayojan-jobs' || job.category === 'rojgar-mela';
      }

      return matchesSearch && matchesQual && matchesSector;
    });
  }, [jobs, searchQuery, selectedQualification, selectedSector]);

  // Split into categories for rendering lists
  const getJobsByCategory = (cat: JobCategory) => {
    return filteredJobs.filter(job => job.category === cat);
  };

  // Get active translation block based on language choice
  const t = useMemo(() => {
    if (lang === 'hi') return TRANSLATIONS.hi;
    return TRANSLATIONS.en; // fallback to English UI text for labels
  }, [lang]);

  // Bilingual text utility function
  const renderBilingual = (enText: string | undefined, hiText: string | undefined) => {
    if (!enText && !hiText) return '';
    if (lang === 'en') return enText || hiText || '';
    if (lang === 'hi') return hiText || enText || '';
    
    // Combined / Bilingual view
    if (enText && hiText && enText !== hiText) {
      return (
        <span className="flex flex-col gap-0.5">
          <span className="font-medium text-slate-800">{hiText}</span>
          <span className="text-xs text-slate-500 font-sans italic">{enText}</span>
        </span>
      );
    }
    return hiText || enText || '';
  };

  // Check if a job is still active or expired based on date
  const isJobActive = (job: JobPost) => {
    if (!job.endDate) return true;
    if (job.endDate.toLowerCase().includes('closed') || job.endDate.toLowerCase().includes('ended') || job.endDate.toLowerCase().includes('समाप्त')) return false;
    
    const end = new Date(job.endDate);
    if (isNaN(end.getTime())) return true; // not parseable, assume active
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return end >= today;
  };

  // Copy shareable link
  const handleShare = (job: JobPost) => {
    const textToCopy = `📋 ${job.titleHindi || job.title}\n🏢 ${job.organization}\n💼 पद का नाम: ${job.postName}\n🎓 योग्यता: ${job.eligibilityHindi || job.eligibility}\n⏰ अंतिम तिथि: ${job.endDate}\n🔗 ऑनलाइन आवेदन करें: ${job.applyLink}\n\n👉 अधिक सरकारी नौकरी और सेवायोजन अपडेट के लिए विज़िट करें: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    triggerToast(t.copySuccess, 'success');
  };

  // Trigger print view
  const handlePrint = () => {
    window.print();
  };

  // Count active listings per category
  const getCategoryCount = (cat: JobCategory) => {
    return jobs.filter(job => job.category === cat).length;
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-slate-950 font-sans selection:bg-orange-200 selection:text-orange-950 pb-16 print:bg-white print:text-black">
      
      {/* 1. TOP STATS BAR & RUNNING ALERTS MARQUEE */}
      <div className="bg-slate-950 text-white text-xs md:text-sm py-2 px-4 border-b-2 border-slate-950 shadow-sm font-sans flex flex-col md:flex-row justify-between items-center gap-2 print:hidden">
        <div className="flex items-center gap-2 overflow-hidden w-full md:w-3/4">
          <span className="bg-orange-600 text-white font-black py-0.5 px-2 rounded-none uppercase text-[10px] tracking-wider border border-white/20 shrink-0 flex items-center gap-1">
            <Bell className="w-3 h-3 inline text-yellow-300" /> {t.newLabel}
          </span>
          {/* Moving Marquee */}
          <div className="relative overflow-hidden w-full h-5">
            <div className="absolute whitespace-nowrap animate-marquee flex gap-12 text-[13px] font-bold text-slate-100">
              <span>🚀 <span className="text-orange-400">UP Sewayojan Computer Operator Outsourcing:</span> 500 Vacancies Apply Link Active!</span>
              <span>🔥 <span className="text-yellow-400">UP Police Constable 52,699 Posts:</span> Notification Released, Apply online starting August 1!</span>
              <span>⭐ <span className="text-orange-400">UP Scholarship 2026-27 Online Form:</span> Pre/Post Matric Open now till November 30!</span>
              <span>📝 <span className="text-yellow-400">UPSSSC PET 2026 Admit Card Released</span> - Click to retrieve call letter immediately.</span>
              <span>🎓 <span className="text-orange-400">Lucknow Mega Rojgar Mela:</span> 2500+ Private and Outsourcing Jobs direct Walk-in!</span>
            </div>
          </div>
        </div>
        
        {/* Dynamic IST Clock Display */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono bg-slate-900 px-3 py-1 rounded-none border border-slate-800 shrink-0">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-bold text-slate-200 uppercase">{currentTime || 'Loading clock...'}</span>
        </div>
      </div>

      {/* 2. MAIN HEADER BLOCK */}
      <header className="bg-white border-b-4 border-slate-950 sticky top-0 z-30 print:relative print:border-none">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Logo and App Title */}
            <div className="flex items-center gap-3 md:gap-4 text-center lg:text-left">
              <div className="bg-orange-600 text-white p-3 rounded-none shadow-[3.5px_3.5px_0px_0px_rgba(15,23,42,1)] shrink-0 flex items-center justify-center border-2 border-slate-950">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 uppercase">
                  <span>UP Government Jobs</span>
                  <span className="text-orange-600 text-xl font-black font-sans bg-orange-100 border border-orange-200 px-2 py-0.5">यूपी रोजगार संगम</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-700 font-bold tracking-wide uppercase mt-1">
                  {lang === 'hi' ? TRANSLATIONS.hi.subtitle : lang === 'en' ? TRANSLATIONS.en.subtitle : 'Sewayojan, Rojgar Sangam & UP Government Vacancies 2026'}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-none mt-1.5 border border-slate-950 uppercase shadow-[1.5px_1.5px_0px_rgba(15,23,42,1)]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" /> 100% Official & Verified Apply Links
                </span>
              </div>
            </div>

            {/* Language & Action Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 justify-center print:hidden">
              
              {/* Language Selector */}
              <div className="bg-white p-1 rounded-none flex items-center gap-1 border-2 border-slate-950 shadow-[2.5px_2.5px_0px_rgba(15,23,42,1)]">
                <span className="text-xs text-slate-500 px-2 font-bold flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-slate-950 font-bold" /> Lang:
                </span>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 text-xs font-black rounded-none transition uppercase ${lang === 'en' ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2 py-1 text-xs font-black rounded-none transition uppercase ${lang === 'hi' ? 'bg-orange-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('bilingual')}
                  className={`px-2.5 py-1 text-xs font-black rounded-none transition uppercase ${lang === 'bilingual' ? 'bg-gradient-to-r from-orange-600 to-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  Bilingual
                </button>
              </div>

              {/* Admin Mode Toggle */}
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-black uppercase transition duration-200 border-2 border-slate-950 shadow-[3px_3px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1.5px_1.5px_0px_rgba(15,23,42,1)] ${
                  isAdminMode 
                    ? 'bg-amber-300 text-amber-950 border-slate-950' 
                    : 'bg-slate-950 text-white border-slate-950 hover:bg-slate-900'
                }`}
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{t.posterPanel}</span>
              </button>

            </div>
          </div>

          {/* 3. QUICK LINKS - DIRECT EMBEDDED OFFICIAL SITES */}
          <div className="mt-4 pt-4 border-t-2 border-slate-950 flex flex-wrap items-center gap-2.5 justify-center text-xs md:text-sm">
            <span className="font-black text-slate-950 bg-amber-400 py-1.5 px-3 rounded-none border-2 border-slate-950 flex items-center gap-1 uppercase tracking-wider shadow-[2px_2px_0px_rgba(15,23,42,1)] shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" /> {t.quickLinks}:
            </span>
            {INITIAL_QUICK_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-1 bg-white hover:bg-orange-600 hover:text-white text-slate-950 font-black py-1.5 px-3 rounded-none border-2 border-slate-950 shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xs uppercase tracking-wide"
              >
                <span>{lang === 'hi' ? link.labelHindi : link.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-600 hover:text-white" />
              </a>
            ))}
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-6">

        {/* 4. ADMIN POSTER PANEL / CMS INTERFACE */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              id="poster-panel-anchor"
              className="bg-amber-50/70 border-3 border-slate-950 rounded-none p-4 md:p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(217,119,6,1)] print:hidden"
            >
              <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-slate-950">
                <div>
                  <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                    <Plus className="w-5 h-5 text-orange-600 stroke-[3]" />
                    <span>{editingJob ? t.editVacancyBtn : t.addVacancyBtn} (CMS Tool)</span>
                  </h3>
                  <p className="text-xs text-slate-800 font-bold mt-1">
                    {t.posterPanelDesc}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetData}
                    className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-950 text-xs font-black py-1.5 px-3 rounded-none border-2 border-slate-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.resetBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminMode(false);
                      setEditingJob(null);
                      setFormData(emptyForm);
                    }}
                    className="text-slate-950 p-1.5 bg-white rounded-none border-2 border-slate-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleSubmitJob} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Category / श्रेणी *</label>
                  <select
                     value={formData.category}
                     onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                     className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-black focus:outline-hidden focus:border-orange-600"
                  >
                    <option value="latest-jobs">Latest Government Jobs (नवीनतम सरकारी नौकरियां)</option>
                    <option value="sewayojan-jobs">Sewayojan & Private Jobs (सेवायोजन एवं प्राइवेट जॉब्स)</option>
                    <option value="admit-card">Admit Card (प्रवेश पत्र)</option>
                    <option value="result">Result (परीक्षा परिणाम)</option>
                    <option value="answer-key">Answer Key (उत्तर कुंजी)</option>
                    <option value="rojgar-mela">Rojgar Mela & Schemes (रोजगार मेला एवं योजनाएं)</option>
                    <option value="scholarship">Scholarship & Schemes (स्कॉलरशिप एवं सरकारी योजनाएं)</option>
                  </select>
                </div>

                {/* Title EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Vacancy Title (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UP Sewayojan Computer Operator Vacancy 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Title HI */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">भर्ती का शीर्षक (हिन्दी) *</label>
                  <input
                    type="text"
                    required
                    placeholder="जैसे: यूपी सेवायोजन कंप्यूटर ऑपरेटर भर्ती 2026"
                    value={formData.titleHindi}
                    onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Organization Name / संस्था का नाम *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sewayojan Uttar Pradesh / UPSSSC"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Post Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Post Name / पद का नाम *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Operator, Junior Clerk"
                    value={formData.postName}
                    onChange={(e) => setFormData({ ...formData, postName: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Total Posts */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Total Posts / कुल पद *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 500 (Set 0 for Admit Cards or Results)"
                    value={formData.totalPosts}
                    onChange={(e) => setFormData({ ...formData, totalPosts: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Eligibility EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Eligibility Criteria (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12th Pass + CCC computer exam qualification"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Eligibility HI */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">अनिवार्य योग्यता (हिन्दी)</label>
                  <input
                    type="text"
                    placeholder="जैसे: 12वीं पास + सीसीसी कंप्यूटर सर्टिफिकेट"
                    value={formData.eligibilityHindi}
                    onChange={(e) => setFormData({ ...formData, eligibilityHindi: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Age Limit EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Age Limit (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 - 40 Years (As on 01/07/2026)"
                    value={formData.ageLimit}
                    onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Age Limit HI */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">आयु सीमा (हिन्दी)</label>
                  <input
                    type="text"
                    placeholder="जैसे: 18 - 40 वर्ष"
                    value={formData.ageLimitHindi}
                    onChange={(e) => setFormData({ ...formData, ageLimitHindi: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Salary EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Salary / Pay Scale (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Rs. 15,400/- per month outsourcing consolidated"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Application Start Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2026-07-18 or 'Available Now'"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Application Last Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026-08-05 or 'Closed'"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Fees EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Application Fee (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. General/OBC: Rs. 0 | SC/ST: Rs. 0"
                    value={formData.applicationFee}
                    onChange={(e) => setFormData({ ...formData, applicationFee: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Fees HI */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">आवेदन शुल्क (हिन्दी)</label>
                  <input
                    type="text"
                    placeholder="जैसे: निःशुल्क (रु. 0/-)"
                    value={formData.applicationFeeHindi}
                    onChange={(e) => setFormData({ ...formData, applicationFeeHindi: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Selection EN */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Selection Process (English)</label>
                  <input
                    type="text"
                    placeholder="e.g. Merit-based shortlisting + Interview"
                    value={formData.selectionProcess}
                    onChange={(e) => setFormData({ ...formData, selectionProcess: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Selection HI */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">चयन प्रक्रिया (हिन्दी)</label>
                  <input
                    type="text"
                    placeholder="जैसे: सेवायोजन मेरिट और साक्षात्कार"
                    value={formData.selectionProcessHindi}
                    onChange={(e) => setFormData({ ...formData, selectionProcessHindi: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600"
                  />
                </div>

                {/* Official Apply URL */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Official Apply Link (आधिकारिक लिंक) *</label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://sewayojan.up.nic.in/"
                    value={formData.applyLink}
                    onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600 text-blue-700"
                  />
                </div>

                {/* Notification URL */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-950 mb-1">Notification Link (अधिसूचना लिंक) *</label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://sewayojan.up.nic.in/"
                    value={formData.notificationLink}
                    onChange={(e) => setFormData({ ...formData, notificationLink: e.target.value })}
                    className="w-full bg-white border-2 border-slate-950 rounded-none p-2 text-xs font-bold focus:outline-hidden focus:border-orange-600 text-blue-700"
                  />
                </div>

                {/* Featured Status checkbox */}
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-orange-600 border-2 border-slate-950 rounded-none focus:ring-0"
                  />
                  <label htmlFor="featured" className="text-xs font-black uppercase tracking-wide text-slate-950 cursor-pointer">
                    Highlight / Pin on Top (महत्वपूर्ण भर्ती)
                  </label>
                </div>

                {/* Submit Panel */}
                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-3 border-t-2 border-slate-950 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingJob(null);
                      setFormData(emptyForm);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black py-2 px-4 rounded-none border-2 border-slate-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    Cancel / साफ करें
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black py-2 px-5 rounded-none border-2 border-slate-950 shadow-[3px_3px_0px_rgba(15,23,42,1)] active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 uppercase"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>{editingJob ? t.editVacancyBtn : t.addVacancyBtn}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. SEARCH ENGINE & FILTERS ROW */}
        <section className="bg-white rounded-none border-3 border-slate-950 p-5 md:p-6 mb-8 shadow-[6px_6px_0px_rgba(15,23,42,1)] print:hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Live Search bar */}
            <div className="lg:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-950 absolute left-3.5 top-1/2 transform -translate-y-1/2 stroke-[3.5]" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-950 rounded-none py-3.5 pl-11 pr-4 text-xs md:text-sm placeholder:text-slate-500 font-bold text-slate-950 focus:outline-hidden focus:border-orange-600 focus:bg-white transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-950 hover:bg-slate-200 font-black text-xs bg-white border-2 border-slate-950 px-2 py-0.5 rounded-none shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Qualification Selectors */}
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-slate-950 font-black flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-orange-600 stroke-[3]" /> {t.filterByQualification}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All', labelHindi: 'सभी' },
                    { id: '10th', label: '10th Pass', labelHindi: '10वीं पास' },
                    { id: '12th', label: '12th Pass', labelHindi: '12वीं पास' },
                    { id: 'graduate', label: 'Graduate', labelHindi: 'स्नातक' },
                    { id: 'diploma', label: 'ITI/Diploma', labelHindi: 'आईटीआई/डिप्लोमा' },
                    { id: 'ccc', label: 'CCC Cert', labelHindi: 'सीसीसी योग्यता' }
                  ].map((qual) => (
                    <button
                      key={qual.id}
                      onClick={() => setSelectedQualification(qual.id)}
                      className={`py-1 px-3.5 rounded-none text-xs font-black uppercase tracking-wider transition-all border-2 ${
                        selectedQualification === qual.id
                          ? 'bg-orange-600 text-white border-slate-950 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
                          : 'bg-white hover:bg-stone-100 text-slate-950 border-slate-950 shadow-[2px_2px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                      }`}
                    >
                      {lang === 'hi' ? qual.labelHindi : lang === 'en' ? qual.label : `${qual.labelHindi}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector toggle Filter */}
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-slate-950 font-black flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-orange-600 stroke-[3]" /> {lang === 'hi' ? 'भर्ती क्षेत्र' : 'Recruitment Sector'}
                </span>
                <div className="grid grid-cols-3 bg-white p-1 border-2 border-slate-950 rounded-none shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  {[
                    { id: 'all', label: 'All', labelHindi: 'सभी' },
                    { id: 'govt', label: 'Govt Only', labelHindi: 'सरकारी' },
                    { id: 'sewayojan', label: 'Sewayojan', labelHindi: 'सेवायोजन' }
                  ].map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSector(sector.id as any)}
                      className={`py-1 px-1.5 text-[11px] font-black rounded-none text-center uppercase tracking-wide transition ${
                        selectedSector === sector.id
                          ? 'bg-slate-950 text-white border-slate-950 border'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'hi' ? sector.labelHindi : sector.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Active Filtering Chips indicators */}
          {(searchQuery || selectedQualification !== 'all' || selectedSector !== 'all') && (
            <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-950 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-950 font-black uppercase tracking-wider">Active Filters:</span>
                {searchQuery && (
                  <span className="bg-orange-100 text-slate-950 text-xs py-1 px-3 border-2 border-slate-950 font-black uppercase flex items-center gap-1.5">
                    Keyword: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="text-orange-600 hover:text-red-800 font-black text-sm">×</button>
                  </span>
                )}
                {selectedQualification !== 'all' && (
                  <span className="bg-blue-100 text-slate-950 text-xs py-1 px-3 border-2 border-slate-950 font-black uppercase flex items-center gap-1.5">
                    Education: {selectedQualification.toUpperCase()}
                    <button onClick={() => setSelectedQualification('all')} className="text-blue-600 hover:text-red-800 font-black text-sm">×</button>
                  </span>
                )}
                {selectedSector !== 'all' && (
                  <span className="bg-amber-100 text-slate-950 text-xs py-1 px-3 border-2 border-slate-950 font-black uppercase flex items-center gap-1.5">
                    Sector: {selectedSector.toUpperCase()}
                    <button onClick={() => setSelectedSector('all')} className="text-amber-600 hover:text-red-800 font-black text-sm">×</button>
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedQualification('all');
                  setSelectedSector('all');
                }}
                className="text-xs font-black text-slate-700 hover:text-orange-600 flex items-center gap-1 transition uppercase tracking-wider bg-white border-2 border-slate-950 py-1 px-3.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
              </button>
            </div>
          )}

        </section>

        {/* 6. TOAST NOTIFICATION BANNER */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 print:hidden"
            >
              <div className="bg-slate-950 text-white font-black py-3 px-5 rounded-none shadow-[4px_4px_0px_0px_rgba(251,146,60,1)] border-2 border-white flex items-center gap-3 max-w-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 stroke-[3]" />
                <span className="text-xs md:text-sm uppercase tracking-wide">{toast.message}</span>
                <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white font-black ml-2 text-base">×</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. REVOLUTIONARY SARKARI RESULT BENTO MULTI-GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: LATEST GOVT JOBS (नवीनतम सरकारी नौकरियां) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(249,115,22,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-orange-500 stroke-[3]" />
                <span>{t.latestJobs}</span>
              </h2>
              <span className="bg-orange-600 text-white font-black text-[10px] tracking-wider py-1 px-2 border border-orange-500 uppercase">
                {getJobsByCategory('latest-jobs').length} Active
              </span>
            </div>
            
            {/* Content List scrollable */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {getJobsByCategory('latest-jobs').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No vacancies found matching current filters.</div>
              ) : (
                getJobsByCategory('latest-jobs').map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-orange-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-orange-600 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      {job.featured && (
                        <span className="bg-red-500 text-white font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide">
                          HOT
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 bg-stone-100 border border-slate-300 py-0.5 px-1.5 text-slate-900 font-mono text-[10px]">
                        <Users className="w-3 h-3 text-slate-950" /> 
                        <strong>{job.totalPosts > 0 ? job.totalPosts.toLocaleString() : 'N/A'} {lang === 'hi' ? 'पद' : 'Posts'}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Calendar className="w-3 h-3 text-slate-950" /> 
                        <span className={`${isJobActive(job) ? 'text-slate-700' : 'text-red-600 font-black'}`}>
                          {lang === 'hi' ? 'अंतिम तिथि' : 'Last Date'}: {job.endDate}
                        </span>
                      </span>
                    </div>

                    {/* Admin control panel in-line */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: SEWAYOJAN & PRIVATE JOBS (सेवायोजन एवं प्राइवेट जॉब्स) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(20,184,166,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-teal-400 stroke-[3]" />
                <span>{t.sewayojanJobs}</span>
              </h2>
              <span className="bg-teal-600 text-white font-black text-[10px] tracking-wider py-1 px-2 border border-teal-500 uppercase">
                {getJobsByCategory('sewayojan-jobs').length} Active
              </span>
            </div>
            
            {/* Content List */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {getJobsByCategory('sewayojan-jobs').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No vacancies found matching current filters.</div>
              ) : (
                getJobsByCategory('sewayojan-jobs').map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-teal-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-teal-700 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      {job.featured && (
                        <span className="bg-teal-500 text-white font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide">
                          OUTSOURCE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 bg-teal-50 border border-teal-200 py-0.5 px-1.5 text-teal-950 font-mono text-[10px]">
                        <Coins className="w-3 h-3 text-teal-900" /> 
                        <strong>{job.salary || 'Competitive'}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Calendar className="w-3 h-3 text-slate-950" /> 
                        <span className={`${isJobActive(job) ? 'text-slate-700' : 'text-red-600 font-black'}`}>
                          {lang === 'hi' ? 'अंतिम तिथि' : 'Last Date'}: {job.endDate}
                        </span>
                      </span>
                    </div>

                    {/* Admin actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 3: ADMIT CARD (प्रवेश पत्र) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(59,130,246,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400 stroke-[3]" />
                <span>{t.admitCard}</span>
              </h2>
              <span className="bg-blue-600 text-white font-black text-[10px] tracking-wider py-1 px-2 border border-blue-500 uppercase">
                {getJobsByCategory('admit-card').length} Released
              </span>
            </div>
            
            {/* Content List */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {getJobsByCategory('admit-card').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No active admit cards found.</div>
              ) : (
                getJobsByCategory('admit-card').map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-blue-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-blue-700 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      <span className="bg-blue-500 text-white font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide">
                        RELEASED
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 bg-blue-50 border border-blue-200 py-0.5 px-1.5 text-blue-950 font-mono text-[10px] uppercase">
                        🏢 {job.organization}
                      </span>
                    </div>

                    {/* Admin actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 4: RESULT (परीक्षा परिणाम) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(168,85,247,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-purple-400 stroke-[3]" />
                <span>{t.result}</span>
              </h2>
              <span className="bg-purple-600 text-white font-black text-[10px] tracking-wider py-1 px-2 border border-purple-500 uppercase">
                {getJobsByCategory('result').length} Declared
              </span>
            </div>
            
            {/* Content List */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {getJobsByCategory('result').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No new results declared yet.</div>
              ) : (
                getJobsByCategory('result').map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-purple-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-purple-700 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      <span className="bg-purple-500 text-white font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide">
                        DECLARED
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 bg-purple-50 border border-purple-200 py-0.5 px-1.5 text-purple-950 font-mono text-[10px]">
                        📅 {lang === 'hi' ? 'घोषित तिथि' : 'Declared'}: {job.startDate}
                      </span>
                    </div>

                    {/* Admin actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 5: ANSWER KEY & ROJGAR MELA (रोजगार मेला एवं उत्तर कुंजी) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(16,185,129,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <SearchCode className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 stroke-[3]" />
                <span>{t.answerKey} / {lang === 'hi' ? 'उत्तर कुंजी' : 'Answer Key'}</span>
              </h2>
              <span className="bg-emerald-600 text-white font-black text-[10px] tracking-wider py-1 px-2 border border-emerald-500 uppercase">
                {getJobsByCategory('answer-key').length} Available
              </span>
            </div>
            
            {/* Content List */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {getJobsByCategory('answer-key').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No answer keys uploaded.</div>
              ) : (
                getJobsByCategory('answer-key').map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-emerald-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-emerald-700 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      <span className="bg-emerald-500 text-white font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide">
                        KEY OUT
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 bg-stone-100 border border-slate-300 py-0.5 px-1.5 text-slate-905 font-mono text-[10px]">
                        📝 {job.organization}
                      </span>
                    </div>

                    {/* Admin actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 6: ROJGAR MELA & SCHOLARSHIP (रोजगार मेला एवं स्कॉलरशिप) */}
          <div className="bg-white rounded-none border-3 border-slate-950 overflow-hidden flex flex-col h-[550px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(245,158,11,1)] transition-all">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b-3 border-slate-950">
              <h2 className="font-black text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
                <Send className="w-4 h-4 md:w-5 md:h-5 text-amber-400 stroke-[3]" />
                <span>{lang === 'hi' ? 'रोजगार मेला व योजनाएं' : 'Rojgar Mela & Schemes'}</span>
              </h2>
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider py-1 px-2 border border-slate-950 uppercase">
                {getJobsByCategory('rojgar-mela').length + getJobsByCategory('scholarship').length} Active
              </span>
            </div>
            
            {/* Content List of mixed mela & scholarship */}
            <div className="overflow-y-auto p-3 space-y-2 flex-1 divide-y-2 divide-dashed divide-stone-200">
              {[...getJobsByCategory('rojgar-mela'), ...getJobsByCategory('scholarship')].length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-black uppercase tracking-wider">No active schemes or mela listings.</div>
              ) : (
                [...getJobsByCategory('rojgar-mela'), ...getJobsByCategory('scholarship')].map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="pt-2.5 first:pt-0 group cursor-pointer hover:bg-amber-50/50 p-2.5 transition duration-150"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="font-black text-xs md:text-sm text-slate-950 group-hover:text-amber-700 transition duration-150 line-clamp-2 leading-snug uppercase tracking-wide">
                        {renderBilingual(job.title, job.titleHindi)}
                      </h3>
                      <span className={`font-black text-[9px] py-0.5 px-1.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0 uppercase tracking-wide ${
                        job.category === 'scholarship' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                      }`}>
                        {job.category === 'scholarship' ? 'SCHOLARSHIP' : 'MELA / SCHEME'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        ⏳ {lang === 'hi' ? 'अंतिम तिथि' : 'Last Date'}: {job.endDate}
                      </span>
                    </div>

                    {/* Admin actions */}
                    {isAdminMode && (
                      <div className="flex gap-2 mt-2 pt-1.5 border-t-2 border-dashed border-slate-950">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(job); }}
                          className="flex items-center gap-1 text-slate-950 hover:bg-slate-950 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="flex items-center gap-1 text-rose-600 hover:bg-rose-600 hover:text-white text-[9px] font-black uppercase bg-white px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* 8. DETAILED VACANCY specifications OVERVIEW POPUP MODAL */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-3 md:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white rounded-none border-4 border-slate-950 w-full max-w-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Modal Header */}
                <div className="bg-slate-950 text-white p-5 flex justify-between items-start shrink-0 border-b-4 border-slate-950">
                  <div>
                    <span className="bg-orange-600 text-white border-2 border-slate-950 text-[10px] md:text-xs font-black py-1 px-3 uppercase tracking-wider shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                      {selectedJob.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <h3 className="text-lg md:text-2xl font-black mt-3 leading-snug uppercase tracking-wide">
                      {selectedJob.titleHindi || selectedJob.title}
                    </h3>
                    {selectedJob.titleHindi && selectedJob.title !== selectedJob.titleHindi && (
                      <p className="text-xs text-orange-400 font-mono italic mt-1.5 uppercase">{selectedJob.title}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-none border-3 border-slate-950 shadow-[2px_2px_0px_rgba(255,255,255,1)] active:translate-x-[1px] active:translate-y-[1px] transition"
                  >
                    <X className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>

                {/* Modal Body Scrollable */}
                <div className="overflow-y-auto p-4 md:p-6 space-y-6">
                  
                  {/* Detailed Table (संस्था नाम, पद, योग्यता, वेतन etc.) */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-950 font-black mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 stroke-[3]" />
                      <span>{t.detailsTitle} / विवरण तालिका</span>
                    </h4>

                    <div className="border-3 border-slate-950 rounded-none overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <table className="w-full text-xs md:text-sm text-left border-collapse">
                        <tbody>
                          
                          {/* 1. Orgnization */}
                          <tr className="border-b-3 border-slate-950 bg-stone-50">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.orgLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Organization)</span>
                            </td>
                            <td className="p-3.5 font-black text-slate-950">
                              {selectedJob.organization}
                            </td>
                          </tr>

                          {/* 2. Post Name */}
                          <tr className="border-b-3 border-slate-950">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.postLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Post Name)</span>
                            </td>
                            <td className="p-3.5 font-black text-orange-600 uppercase tracking-wide">
                              {selectedJob.postName}
                            </td>
                          </tr>

                          {/* 3. Total Posts */}
                          <tr className="border-b-3 border-slate-950 bg-stone-50">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.totalPostsLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Total Vacancies)</span>
                            </td>
                            <td className="p-3.5 font-black text-slate-950 text-sm">
                              {selectedJob.totalPosts > 0 ? (
                                <span className="bg-orange-500 text-white border-2 border-slate-950 shadow-[1px_1px_0px_rgba(0,0,0,1)] py-1 px-3 rounded-none uppercase text-xs">
                                  {selectedJob.totalPosts.toLocaleString()} {lang === 'hi' ? 'पद' : 'Posts'}
                                </span>
                              ) : (
                                <span className="text-slate-600 font-bold font-mono text-xs uppercase">N/A (Admit Card / Result)</span>
                              )}
                            </td>
                          </tr>

                          {/* 4. Eligibility */}
                          <tr className="border-b-3 border-slate-950">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.eligibilityLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Eligibility)</span>
                            </td>
                            <td className="p-3.5 text-slate-950 font-black uppercase tracking-wide">
                              {renderBilingual(selectedJob.eligibility, selectedJob.eligibilityHindi)}
                            </td>
                          </tr>

                          {/* 5. Age Limit */}
                          <tr className="border-b-3 border-slate-950 bg-stone-50">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.ageLimitLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Age Limit)</span>
                            </td>
                            <td className="p-3.5 text-slate-950 font-black font-mono text-xs">
                              {renderBilingual(selectedJob.ageLimit, selectedJob.ageLimitHindi)}
                            </td>
                          </tr>

                          {/* 6. Salary */}
                          <tr className="border-b-3 border-slate-950">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.salaryLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Salary Scale)</span>
                            </td>
                            <td className="p-3.5 font-black text-emerald-600 font-mono text-xs md:text-sm uppercase">
                              {selectedJob.salary || 'Consolidated Outsourcing pay'}
                            </td>
                          </tr>

                          {/* 7. Date Details */}
                          <tr className="border-b-3 border-slate-950 bg-stone-50">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              Important Dates <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(महत्वपूर्ण तिथियां)</span>
                            </td>
                            <td className="p-3.5 text-slate-950 font-bold font-mono text-xs space-y-1">
                              <div>🟢 {t.startDateLabel}: <span className="text-slate-950 font-black">{selectedJob.startDate || 'Declared / Announced'}</span></div>
                              <div className="text-red-600">🔴 {t.endDateLabel}: <span className="font-black underline decoration-2">{selectedJob.endDate || 'No specified deadline'}</span></div>
                            </td>
                          </tr>

                          {/* 8. Fee */}
                          <tr className="border-b-3 border-slate-950">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.feeLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Application Fee)</span>
                            </td>
                            <td className="p-3.5 text-slate-950 font-black">
                              {renderBilingual(selectedJob.applicationFee, selectedJob.applicationFeeHindi)}
                            </td>
                          </tr>

                          {/* 9. Selection */}
                          <tr className="bg-stone-50">
                            <td className="p-3.5 font-black text-slate-950 bg-stone-100/80 w-1/3 border-r-3 border-slate-950 font-mono text-[11px] uppercase tracking-wide">
                              {t.selectionLabel} <br/> <span className="text-[10px] font-bold text-slate-600 font-mono">(Selection Process)</span>
                            </td>
                            <td className="p-3.5 text-slate-950 font-black">
                              {renderBilingual(selectedJob.selectionProcess, selectedJob.selectionProcessHindi)}
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Disclaimer & Information integrity warning */}
                  <div className="bg-amber-100 border-3 border-slate-950 rounded-none p-4 flex gap-3 text-xs text-slate-950 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 stroke-[3]" />
                    <div>
                      <strong className="font-black text-slate-950 block mb-1 uppercase tracking-wide">{t.disclaimerTitle} (अस्वीकरण)</strong>
                      <p className="leading-relaxed font-bold">{t.disclaimerDesc}</p>
                    </div>
                  </div>

                  {/* Extra Notes */}
                  {(selectedJob.importantNote || selectedJob.importantNoteHindi) && (
                    <div className="bg-stone-100 border-3 border-slate-950 rounded-none p-4 text-xs text-slate-950 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                      <strong className="font-black block mb-1 uppercase tracking-wider font-mono">Additional Notes (अतिरिक्त निर्देश):</strong>
                      <p className="font-bold">{renderBilingual(selectedJob.importantNote, selectedJob.importantNoteHindi)}</p>
                    </div>
                  )}

                  {/* Direct Action apply buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-3">
                    
                    <a
                      href={selectedJob.applyLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-center py-4 px-6 rounded-none border-3 border-slate-950 transition duration-150 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                    >
                      <span>{t.applyLabel}</span>
                      <ExternalLink className="w-4.5 h-4.5 stroke-[3]" />
                    </a>

                    <a
                      href={selectedJob.notificationLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 bg-white hover:bg-stone-100 text-slate-950 font-black text-center py-4 px-6 rounded-none border-3 border-slate-950 transition duration-150 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                    >
                      <span>{t.notificationLabel}</span>
                      <FileText className="w-4.5 h-4.5 text-slate-950 stroke-[3]" />
                    </a>

                  </div>

                </div>

                {/* Modal Footer (Sharing, printing) */}
                <div className="bg-stone-100 p-4 border-t-3 border-slate-950 flex flex-wrap justify-between items-center gap-2 shrink-0">
                  <div className="text-[11px] text-slate-950 font-black font-mono uppercase tracking-wide">
                    ID: {selectedJob.id} | Posted: {selectedJob.postedDate}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 bg-white hover:bg-stone-100 text-slate-950 text-xs font-black py-1.5 px-3.5 rounded-none border-2 border-slate-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition uppercase tracking-wide"
                    >
                      <Printer className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{t.printBtn}</span>
                    </button>
                    <button
                      onClick={() => handleShare(selectedJob)}
                      className="flex items-center gap-1.5 bg-blue-400 hover:bg-blue-500 text-slate-950 text-xs font-black py-1.5 px-3.5 rounded-none border-2 border-slate-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition uppercase tracking-wide"
                    >
                      <Share2 className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{t.shareBtn}</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 9. INFORMATION SECTION: ABOUT SEWAYOJAN & HOW IT WORKS */}
        <section className="bg-white rounded-none border-3 border-slate-950 p-6 md:p-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-[6px_6px_0px_rgba(0,0,0,1)] print:hidden">
          
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg md:text-xl font-black text-slate-950 flex items-center gap-2 uppercase tracking-wide">
              <Award className="w-6 h-6 text-orange-600 stroke-[3]" />
              <span>{t.aboutSewayojan} / रोजगार संगम पोर्टल</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-bold">
              {t.aboutSewayojanDesc}
            </p>
            <div className="p-3 bg-stone-100 border-2 border-slate-950 font-mono text-xs text-slate-950 font-black flex items-center gap-2 uppercase tracking-wide shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <MapPin className="w-4 h-4 text-orange-600 stroke-[3]" />
              <span>{t.contactInfo}</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-orange-100 p-5 rounded-none border-3 border-slate-950 space-y-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-950 font-mono">Direct Portal Actions:</h4>
            <div className="space-y-2 text-xs font-black">
              <a href="https://sewayojan.up.nic.in/Sewayojan/Sewayojan_Registration.aspx" target="_blank" referrerPolicy="no-referrer" className="flex items-center justify-between bg-white p-2.5 rounded-none border-2 border-slate-950 text-slate-950 hover:bg-orange-500 transition shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span className="uppercase tracking-wide text-[10px]">1. New Registration (पंजीकरण)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </a>
              <a href="https://sewayojan.up.nic.in/Sewayojan/Sewayojan_Login.aspx" target="_blank" referrerPolicy="no-referrer" className="flex items-center justify-between bg-white p-2.5 rounded-none border-2 border-slate-950 text-slate-950 hover:bg-orange-500 transition shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span className="uppercase tracking-wide text-[10px]">2. Candidate Login (लॉगिन)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </a>
              <a href="https://sewayojan.up.nic.in/" target="_blank" referrerPolicy="no-referrer" className="flex items-center justify-between bg-white p-2.5 rounded-none border-2 border-slate-950 text-slate-950 hover:bg-orange-500 transition shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span className="uppercase tracking-wide text-[10px]">3. Check Outsource Jobs</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </a>
            </div>
          </div>

        </section>

      </main>

      {/* 10. FOOTER BLOCK */}
      <footer className="mt-16 border-t-3 border-slate-950 bg-white py-12 px-4 text-center text-slate-950 text-xs md:text-sm print:hidden">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-black uppercase tracking-wide text-slate-950 text-sm md:text-base">
            {t.copyright}
          </p>
          <p className="text-xs text-slate-700 max-w-2xl mx-auto font-bold leading-relaxed">
            Disclaimer: We are an unofficial update service. All vacancy titles, dates, eligibility details and images belong to their respective government departments. We do not charge money for job alerts.
          </p>
          <div className="pt-2 flex justify-center flex-wrap gap-4 text-xs font-black text-slate-950 font-mono uppercase tracking-wider">
            <a href="https://sewayojan.up.nic.in/" target="_blank" className="hover:text-orange-600 underline decoration-2 underline-offset-2 transition">Sewayojan UP</a>
            <span>•</span>
            <a href="https://uppsc.up.nic.in/" target="_blank" className="hover:text-orange-600 underline decoration-2 underline-offset-2 transition">UPPSC</a>
            <span>•</span>
            <a href="http://upsssc.gov.in/" target="_blank" className="hover:text-orange-600 underline decoration-2 underline-offset-2 transition">UPSSSC</a>
            <span>•</span>
            <a href="https://uppbpb.gov.in/" target="_blank" className="hover:text-orange-600 underline decoration-2 underline-offset-2 transition">UP Police Board</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
