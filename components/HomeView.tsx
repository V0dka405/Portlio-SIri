'use client';

import Hero from './Hero';
import { NavLink, type RoutePath } from './PageRouter';
import { useLanguage } from './LanguageProvider';

const EXPLORE_ITEMS: {
  href: RoutePath;
  title: string;
  titleTh: string;
  tag: string;
  desc: string;
  descTh: string;
}[] = [
  {
    href: '/about',
    title: 'About Me',
    titleTh: 'เกี่ยวกับผม',
    tag: 'Background & Core Stack',
    desc: 'Computer Engineering (CPE) student specializing in Web, Mobile, and Backend architectures.',
    descTh: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ (CPE) มุ่งเน้นการพัฒนา Web, Mobile และระบบ Backend',
  },
  {
    href: '/projects',
    title: 'Selected Work',
    titleTh: 'ผลงานที่เลือกมา',
    tag: '3 Featured Projects',
    desc: 'Smart Farm (IoT/ESP32), FaceLocker (Web + Raspberry Pi + MQTT), and KinRaiDee (React Native + Node.js).',
    descTh: 'Smart Farm (IoT/ESP32), FaceLocker (Web + Raspberry Pi + MQTT) และ KinRaiDee (React Native + Node.js)',
  },
  {
    href: '/skills',
    title: 'Skills & Tools',
    titleTh: 'ทักษะและเครื่องมือ',
    tag: 'Full-Stack & Edge',
    desc: 'Go, TypeScript, React, Next.js, React Native, Node.js, PostgreSQL, Docker, and ESP32 firmware.',
    descTh: 'Go, TypeScript, React, Next.js, React Native, Node.js, PostgreSQL, Docker และเฟิร์มแวร์ ESP32',
  },
  {
    href: '/experience',
    title: 'Experience & Education',
    titleTh: 'ประสบการณ์และการศึกษา',
    tag: 'Internship & Degree',
    desc: 'Full-Stack Developer Internship at WHP Global Solution Service and B.Eng. CPE at Sripatum University.',
    descTh: 'ฝึกงาน Full-Stack Developer ที่ WHP Global Solution Service และ ป.ตรี วิศวกรรมคอมพิวเตอร์ ม.ศรีปทุม',
  },
  {
    href: '/certificates',
    title: 'Certifications',
    titleTh: 'ใบรับรองและเกียรติบัตร',
    tag: 'Verified Credentials',
    desc: 'Professional certifications, technical training, and verified achievement badges with PDF previews.',
    descTh: 'เกียรติบัตรและใบรับรองทักษะวิชาชีพ พร้อมลิงก์ตรวจสอบและไฟล์ PDF',
  },
  {
    href: '/contact',
    title: 'Contact',
    titleTh: 'ติดต่อร่วมงาน',
    tag: 'Open to Work',
    desc: 'Open to internships and junior developer roles. Reach out via Email, Phone, or Line.',
    descTh: 'พร้อมสำหรับโอกาสฝึกงานและตำแหน่งงานประจำ ติดต่อผ่านอีเมล เบอร์โทรศัพท์ หรือ Line',
  },
];

export default function HomeView() {
  const { locale } = useLanguage();

  return (
    <div className="pb-20">
      <Hero />

      {/* Explore Section Hub */}
      <section className="container-page pt-4 pb-16">
        <div className="mb-8 border-b border-line/40 pb-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            // Navigation Index
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            {locale === 'th' ? 'สำรวจพอร์ตโฟลิโอ' : 'Explore Portfolio'}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface/90 p-6 transition-all duration-200 hover:border-accent hover:bg-surface hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-accent/5"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-fg transition-colors group-hover:text-accent">
                  {locale === 'th' ? item.titleTh : item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted font-sans">
                  {locale === 'th' ? item.descTh : item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-xs text-muted">
                <span>Navigate</span>
                <span className="text-accent/80 font-medium group-hover:underline">
                  {locale === 'th' ? 'เปิดดูหน้า →' : 'View Page'}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}
