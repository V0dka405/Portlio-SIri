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
    items: ['C/C++', 'Python', 'JavaScript', 'TypeScript', 'CSS', 'SQL', 'Go'],
  },
  {
    id: 'frameworks',
    title: { en: 'Frameworks', th: 'เฟรมเวิร์ก' },
    items: ['React', 'Next.js', 'Express.js', 'React Native', 'Expo'],
  },
  {
    id: 'tools',
    title: { en: 'Runtime & Tools', th: 'Runtime และเครื่องมือ' },
    items: ['Node.js', 'Bun', 'Vite', 'Git/GitHub', 'Docker', 'Postman', 'Apache JMeter'],
  },
  {
    id: 'data-ai',
    title: { en: 'Data & AI/ML', th: 'Data & AI/ML' },
    items: ['NumPy', 'Pandas', 'Machine Learning', 'Computer Vision', 'MySQL', 'MongoDB'],
  },
  {
    id: 'iot-services',
    title: { en: 'IoT & Cloud Services', th: 'IoT และบริการคลาวด์' },
    items: ['ESP32', 'Raspberry Pi', 'MQTT', 'Firebase', 'PostgreSQL'],
  },
];
