import type { Localized } from '@/lib/types';

export interface ProjectMedia {
  type: 'image' | 'video' | 'youtube' | 'tiktok';
  /** Path under /public (e.g. "/projects/facelocker.png"). null = show placeholder. */
  src: string | null;
  /** Optional poster image for videos. */
  poster?: string;
  /** Optional YouTube video ID when type is 'youtube'. */
  youtubeId?: string;
  /** Optional TikTok video ID when type is 'tiktok'. */
  tiktokId?: string;
  alt: Localized<string>;
}

export interface Project {
  id: string;
  title: Localized<string>;
  /** Shown on the card. */
  summary: Localized<string>;
  /** Shown in the detail modal. */
  description: Localized<string>;
  highlights: Localized<string[]>;
  tags: string[];
  /** "#" = placeholder, replace with a real URL. Omit a key to hide that button entirely. */
  links: { github?: string; demo?: string; slide?: string };
  media: ProjectMedia;
}

export const projects: Project[] = [
  {
    id: 'smart-farm',
    title: {
      en: 'Smart Farm — Sunflower Sprouts',
      th: 'Smart Farm ต้นอ่อนทานตะวัน',
    },
    summary: {
      en: 'ESP32 reads sensors and drives relays automatically; data is viewable on a dashboard.',
      th: 'เชื่อม sensor กับ ESP32 สั่ง relay ควบคุมอัตโนมัติ และดูข้อมูลผ่าน dashboard',
    },
    description: {
      en: 'An automated growing system for sunflower sprouts. An ESP32 collects sensor readings and switches relays automatically, while a dashboard lets me monitor the data.',
      th: 'ระบบปลูกต้นอ่อนทานตะวันอัตโนมัติ ใช้ ESP32 อ่านค่าจาก sensor และสั่ง relay ควบคุมอุปกรณ์โดยอัตโนมัติ พร้อม dashboard สำหรับดูข้อมูล',
    },
    highlights: {
      en: [
        'ESP32 firmware (C/C++) reading environmental sensors',
        'Automatic relay control based on sensor data',
        'Custom PCB schematic and board layout integration',
        'Dashboard to monitor readings',
      ],
      th: [
        'เขียน firmware ESP32 (C/C++) อ่านค่าจาก sensor',
        'สั่ง relay อัตโนมัติตามค่าที่อ่านได้',
        'ออกแบบ Schematic และ Layout แผงวงจร PCB รวมฮาร์ดแวร์',
        'มี dashboard สำหรับดูข้อมูล',
      ],
    },
    tags: ['ESP32', 'C/C++', 'Sensors', 'Relay', 'PCB Design', 'Dashboard'],
    // No GitHub link: this project isn't on git, so the button is hidden
    links: { demo: 'https://canva.link/yrhoqwqwxi5qx3z' },
    media: {
      type: 'image',
      src: '/projects/smart-farm.jpg',
      alt: {
        en: 'Smart Farm sunflower sprouts cover slide with watercolor birds and flowers',
        th: 'สไลด์ปก Smart Farm ต้นอ่อนทานตะวัน ลายนกและดอกไม้สีน้ำ',
      },
    },
  },
  {
    id: 'facelocker',
    title: { en: 'FaceLocker', th: 'FaceLocker' },
    summary: {
      en: 'Web app to reserve/return lockers with in-browser face verification, Raspberry Pi backend controlling physical locks over MQTT, and PromptPay QR payments.',
      th: 'เว็บแอปจอง/คืนตู้ล็อกเกอร์ ยืนยันตัวตนด้วยสแกนใบหน้าบนเว็บ Backend รันบน Raspberry Pi ควบคุมตู้จริงผ่าน MQTT รองรับ PromptPay QR',
    },
    description: {
      en: 'A smart locker system for reserving and returning lockers. Users verify their identity by scanning their face in the browser, while a Node.js backend running on a Raspberry Pi orchestrates locker operations and triggers physical lock relays over MQTT, integrated with PromptPay QR payments.',
      th: 'ระบบตู้ล็อกเกอร์อัจฉริยะสำหรับจองและคืนตู้ ผู้ใช้ยืนยันตัวตนด้วยการสแกนใบหน้าผ่านเว็บ โดยมีระบบ Backend (Node.js) ติดตั้งและรันอยู่บนเครื่อง Raspberry Pi คอยควบคุมกลอนตู้จริงผ่าน MQTT และรองรับการชำระเงินด้วย PromptPay QR',
    },
    highlights: {
      en: [
        'Reserve and return lockers from the web interface',
        'In-browser face verification using face-api.js',
        'Backend server hosted directly on Raspberry Pi',
        'Controls physical locker hardware over MQTT protocol',
        'PromptPay QR payment integration',
        'Containerized with Docker for seamless deployment',
      ],
      th: [
        'จองและคืนตู้ล็อกเกอร์ผ่านเว็บแอปพลิเคชัน',
        'ยืนยันตัวตนด้วยใบหน้าบนเบราว์เซอร์ด้วย face-api.js',
        'ติดตั้งและรันระบบ Backend บน Raspberry Pi',
        'สั่งเปิด-ปิดกลอนตู้จริงผ่านโปรโตคอล MQTT',
        'รองรับชำระเงินด้วย PromptPay QR',
        'แพ็กเกจระบบด้วย Docker สะดวกต่อการ deploy',
      ],
    },
    tags: ['Raspberry Pi', 'React', 'Node.js', 'MongoDB', 'MQTT', 'face-api.js', 'Docker'],
    links: {
      github: 'https://github.com/V0dka405/Facelocker',
      demo: 'https://youtu.be/lOI6Rm7vBec',
    },
    media: {
      type: 'youtube',
      src: '/projects/facelocker.jpg',
      youtubeId: 'lOI6Rm7vBec',
      alt: {
        en: 'FaceLocker demo video preview',
        th: 'ภาพตัวอย่างวิดีโอสาธิต FaceLocker',
      },
    },
  },
  {
    id: 'kinraidee',
    title: { en: 'KinRaiDee', th: 'KinRaiDee' },
    summary: {
      en: 'Mobile app that picks a random nearby restaurant for you, with distance and price from the Google Places API.',
      th: 'แอปมือถือสุ่มร้านอาหารใกล้ตัว ดึงระยะทางและราคาจาก Google Places API',
    },
    description: {
      en: "A mobile app that helps you decide what to eat by randomly picking a restaurant near you. It fetches each place's distance and price from the Google Places API, with a Node.js/Express and MongoDB backend for accounts, reviews and community content.",
      th: 'แอปมือถือช่วยตัดสินใจว่าจะกินอะไรดี โดยสุ่มร้านอาหารใกล้ตัว และดึงระยะทางกับราคาของแต่ละร้านจาก Google Places API พร้อม backend ด้วย Node.js/Express และ MongoDB สำหรับบัญชีผู้ใช้ รีวิว และคอมมูนิตี้',
    },
    highlights: {
      en: [
        'Random pick from nearby restaurants using the device location and a map view',
        'Distance and price pulled from Google Places API',
        'Cross-platform mobile app built with React Native (Expo) and TypeScript',
        'Express + MongoDB backend with JWT authentication and review history',
        'Community and video-reel features, with media uploads stored on Cloudinary',
      ],
      th: [
        'สุ่มร้านอาหารใกล้ตัวจากตำแหน่งของเครื่อง พร้อมมุมมองแผนที่',
        'ดึงระยะทางและราคาจาก Google Places API',
        'แอปมือถือ cross-platform ด้วย React Native (Expo) และ TypeScript',
        'backend ด้วย Express + MongoDB ใช้ JWT สำหรับยืนยันตัวตน และเก็บประวัติรีวิว',
        'ฟีเจอร์คอมมูนิตี้และวิดีโอ reels โดยเก็บไฟล์มีเดียบน Cloudinary',
      ],
    },
    tags: [
      'React Native',
      'Expo',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Google Places API',
    ],
    links: {
      github: 'https://github.com/SuriChea/KINRAIDEEAPP',
      demo: 'https://www.tiktok.com/@thisforu7/video/7631238192234073365',
      slide: 'https://canva.link/ff8kpy3ph55ww2y',
    },
    media: {
      type: 'tiktok',
      src: '/projects/kinraidee.png',
      tiktokId: '7631238192234073365',
      alt: {
        en: 'KinRaiDee mobile app product demo video on TikTok',
        th: 'วิดีโอสาธิตการใช้งานแอป KinRaiDee บน TikTok',
      },
    },
  },
];
