import type { Localized } from '@/lib/types';

export interface Certificate {
  id: string;
  title: Localized<string>;
  issuer: Localized<string>;
  issueDate: string;
  duration?: Localized<string>;
  summary: Localized<string>;
  image: string;
  pdfUrl?: string;
  verifyUrl: string;
  tags: string[];
}

export const certificates: Certificate[] = [
  {
    id: 'aws-ml-foundations',
    title: {
      en: 'AWS Academy Graduate - Machine Learning Foundations',
      th: 'AWS Academy Graduate - Machine Learning Foundations',
    },
    issuer: {
      en: 'AWS Academy',
      th: 'AWS Academy',
    },
    issueDate: '04/02/2026',
    duration: {
      en: '20 hours',
      th: '20 ชั่วโมง',
    },
    summary: {
      en: 'Official completion training badge from AWS Academy covering fundamental Machine Learning concepts, data pipelines, computer vision, natural language processing, and AWS cloud AI services.',
      th: 'หลักสูตรจาก AWS Academy ครอบคลุมพื้นฐาน Machine Learning, Data Pipeline, Computer Vision, Natural Language Processing และการประยุกต์ใช้บริการ AI บน AWS Cloud',
    },
    image: '/certificates/aws-machine-learning-foundations.png',
    pdfUrl: '/certificates/aws-machine-learning-foundations.pdf',
    verifyUrl: 'https://www.credly.com/go/U34kShkz',
    tags: ['AWS', 'Machine Learning', 'Cloud', 'Python', 'AI'],
  },
];
