import type { Locale } from '@/lib/types';

/**
 * All UI strings live here, separate from components.
 * Add a key to `en` first; TypeScript will then force you to add it to `th`.
 */
const en = {
  skipToContent: 'Skip to content',
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    certificates: 'Certificates',
    experience: 'Experience',
    contact: 'Contact',
    switchLanguage: 'Switch language',
  },
  hero: {
    greeting: 'Hi, I’m',
    viewProjects: 'View Projects',
    downloadCv: 'Download CV (PDF)',
    photoAlt: 'Profile photo of Siriwut Saleephan',
    photoPlaceholderAlt: 'Profile photo placeholder',
    openToWork: 'Open to internships',
  },
  about: {
    eyebrow: 'About',
    title: 'A bit about me',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    viewDetails: 'View details',
    github: 'GitHub',
    demo: 'Demo',
    slide: 'Slide',
    close: 'Close',
    highlights: 'Highlights',
    stack: 'Tech stack',
    mediaPlaceholder: 'Demo image / video coming soon',
    linkSoon: 'Link coming soon',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Tools I work with',
  },
  certificates: {
    eyebrow: 'Certifications',
    title: 'Licenses & Certifications',
    verify: 'Verify badge',
    viewPdf: 'View PDF',
    preview: 'Preview',
    issuedOn: 'Issued',
  },
  experience: {
    eyebrow: 'Experience & Education',
    title: 'Where I’ve been',
    work: 'Experience',
    education: 'Education',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s work together',
    copyEmail: 'Copy email',
    copyPhone: 'Copy phone',
    copyLine: 'Copy Line ID',
    copied: 'Copied!',
    sendEmail: 'Send email',
    callPhone: 'Call',
    lineChat: 'Add Line',
    phoneLabel: 'Phone',
    lineLabel: 'Line ID',
    emailLabel: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
};

type Dictionary = typeof en;

const th: Dictionary = {
  skipToContent: 'ข้ามไปยังเนื้อหา',
  nav: {
    about: 'เกี่ยวกับ',
    projects: 'ผลงาน',
    skills: 'ทักษะ',
    certificates: 'ใบรับรอง',
    experience: 'ประสบการณ์',
    contact: 'ติดต่อ',
    switchLanguage: 'สลับภาษา',
  },
  hero: {
    greeting: 'สวัสดีครับ ผม',
    viewProjects: 'ดูผลงาน',
    downloadCv: 'ดาวน์โหลด CV (PDF)',
    photoAlt: 'รูปโปรไฟล์ของ Siriwut Saleephan',
    photoPlaceholderAlt: 'ตำแหน่งรูปโปรไฟล์',
    openToWork: 'พร้อมสำหรับโอกาสฝึกงาน',
  },
  about: {
    eyebrow: 'เกี่ยวกับ',
    title: 'เกี่ยวกับผม',
  },
  projects: {
    eyebrow: 'ผลงาน',
    title: 'ผลงานที่เลือกมา',
    viewDetails: 'ดูรายละเอียด',
    github: 'GitHub',
    demo: 'Demo',
    slide: 'สไลด์นำเสนอ',
    close: 'ปิด',
    highlights: 'จุดเด่น',
    stack: 'เทคโนโลยีที่ใช้',
    mediaPlaceholder: 'รูป/วิดีโอ demo จะมาเร็ว ๆ นี้',
    linkSoon: 'ลิงก์จะมาเร็ว ๆ นี้',
  },
  skills: {
    eyebrow: 'ทักษะ',
    title: 'เครื่องมือที่ใช้งาน',
  },
  certificates: {
    eyebrow: 'ใบรับรอง',
    title: 'ใบรับรองและเกียรติบัตร',
    verify: 'ตรวจสอบใบรับรอง',
    viewPdf: 'ดูไฟล์ PDF',
    preview: 'ดูรูปภาพ',
    issuedOn: 'ออกเมื่อ',
  },
  experience: {
    eyebrow: 'ประสบการณ์และการศึกษา',
    title: 'เส้นทางของผม',
    work: 'ประสบการณ์',
    education: 'การศึกษา',
  },
  contact: {
    eyebrow: 'ติดต่อ',
    title: 'มาร่วมงานกันครับ',
    copyEmail: 'คัดลอกอีเมล',
    copyPhone: 'คัดลอกเบอร์',
    copyLine: 'คัดลอก Line ID',
    copied: 'คัดลอกแล้ว!',
    sendEmail: 'ส่งอีเมล',
    callPhone: 'โทรออก',
    lineChat: 'แอด Line',
    phoneLabel: 'เบอร์โทรศัพท์',
    lineLabel: 'Line ID',
    emailLabel: 'อีเมล',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    rights: 'สงวนลิขสิทธิ์',
    backToTop: 'กลับขึ้นบน',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, th };
export type { Dictionary };
