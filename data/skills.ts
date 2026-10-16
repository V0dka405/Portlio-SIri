import type { Localized } from '@/lib/types';

export interface SkillGroupData {
  id: string;
  title: Localized<string>;
  items: string[];
}

export const skillGroups: SkillGroupData[] = [
  {
    id: 'languages',
    title: { en: 'Languages', th: 'ภาษาโปรแกรม' },
    items: ['Go', 'TypeScript', 'JavaScript', 'Python', 'C/C++', 'SQL', 'CSS'],
  },
  {
    id: 'frameworks',
    title: { en: 'Frameworks & Libraries', th: 'เฟรมเวิร์กและไลบรารี' },
    items: ['React', 'Next.js', 'Tailwind CSS', 'React Native', 'Expo', 'Express.js'],
  },
  {
    id: 'databases',
    title: { en: 'Databases', th: 'ฐานข้อมูล' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
  },
  {
    id: 'devops-tools',
    title: { en: 'DevOps & Tools', th: 'DevOps และเครื่องมือ' },
    items: ['Docker', 'Git/GitHub', 'Node.js', 'Bun', 'Postman', 'Apache JMeter'],
  },
  {
    id: 'iot-hardware',
    title: { en: 'IoT & Hardware', th: 'IoT และฮาร์ดแวร์' },
    items: ['ESP32', 'Raspberry Pi', 'MQTT', 'PCB Design', 'Sensors & Relays'],
  },
  {
    id: 'ai-data',
    title: { en: 'AI & Data Science', th: 'AI และ Data Science' },
    items: ['Computer Vision', 'Machine Learning', 'face-api.js', 'NumPy', 'Pandas'],
  },
];
