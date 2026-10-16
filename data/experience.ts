import type { Localized } from '@/lib/types';

export interface TimelineEntry {
  id: string;
  kind: 'work' | 'education';
  role: Localized<string>;
  org: Localized<string>;
  period: Localized<string>;
  /** Optional bullet points. Leave arrays empty to hide the list. */
  points: Localized<string[]>;
}

/** Newest first. */
export const timeline: TimelineEntry[] = [
  {
    id: 'whp-internship',
    kind: 'work',
    role: { en: 'Full-Stack Internship', th: 'ฝึกงาน Full-Stack' },
    org: {
      en: 'WHP Global Solution Service Co., Ltd.',
      th: 'WHP Global Solution Service Co., Ltd.',
    },
    period: { en: '05/2026 – 06/2026', th: '05/2026 – 06/2026' },
    points: {
      en: [
        'Gathered and analyzed system requirements to design solutions meeting user and business needs',
        'Architected and evaluated the tech stack for both frontend and backend development',
        'Collaborated across the development lifecycle to build and deliver full-stack features',
      ],
      th: [
        'วิเคราะห์และออกแบบ Requirements ของระบบเพื่อวางโครงสร้างการทำงานที่ตอบโจทย์',
        'วางสถาปัตยกรรมและเลือก Tech Stack ที่เหมาะสมสำหรับทั้งส่วน Frontend และ Backend',
        'ร่วมพัฒนาระบบ Full-Stack และเชื่อมต่อส่วนประกอบต่าง ๆ ให้พร้อมใช้งานจริง',
      ],
    },
  },
  {
    id: 'sripatum-beng',
    kind: 'education',
    role: {
      en: 'B.Eng. Computer Engineering (CPE)',
      th: 'วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์ (CPE)',
    },
    org: {
      en: 'Faculty of Information Technology, Sripatum University',
      th: 'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม',
    },
    period: { en: '2023 – 2027', th: '2023 – 2027' },
    points: {
      en: [],
      th: [],
    },
  },
];
