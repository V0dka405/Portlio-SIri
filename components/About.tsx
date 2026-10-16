'use client';

import { useLanguage } from './LanguageProvider';
import Section from './Section';
import ProfilePhoto from './ProfilePhoto';
import { profile } from '@/data/profile';
import { DownloadIcon, GithubIcon, MailIcon } from './icons';

export default function About() {
  const { t, locale, pick } = useLanguage();

  return (
    <Section
      id="about"
      eyebrow={t.about.eyebrow}
      title={t.about.title}
      subtitle={
        locale === 'th'
          ? 'นักศึกษาวิศวกรรมคอมพิวเตอร์ (CPE) ที่มุ่งมั่นพัฒนา Web Application, Mobile App และ Backend System ที่มีประสิทธิภาพ พร้อมต่อยอดสู่ระบบ IoT และ AI'
          : 'Computer Engineering (CPE) student focused on building high-performance Web Apps, Mobile Apps, and robust Backend systems with IoT/AI integration.'
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-12 items-start">
        {/* Left Column (5 cols): Profile & Quick Bio Card */}
        <div className="min-w-0 w-full lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-surface/90 p-5 sm:p-7 shadow-lg transition-colors duration-200 hover:border-accent/40">
            {/* Centered Photo */}
            <div className="flex justify-center pb-4 sm:pb-5">
              <ProfilePhoto size="md" />
            </div>

            {/* Profile Info */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-bg/80 px-3 py-1 text-[11px] sm:text-xs text-muted font-mono mb-3 max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-fg/90 leading-snug">{t.hero.openToWork}</span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-fg">
                {profile.name}
              </h3>

              <p className="mt-1 font-display text-base font-semibold text-accent">
                {pick(profile.title)}
              </p>

              <p className="mt-1 text-xs text-muted font-mono">
                Sripatum University · Faculty of Information Technology
              </p>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-6 flex flex-col gap-2.5">
                <a
                  href={profile.cvPath}
                  download
                  className="btn-primary text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl shadow-sm"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download CV</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs font-semibold inline-flex items-center justify-center gap-1.5 py-2 rounded-xl"
                  >
                    <GithubIcon className="h-3.5 w-3.5 text-accent" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-ghost text-xs font-semibold inline-flex items-center justify-center gap-1.5 py-2 rounded-xl"
                  >
                    <MailIcon className="h-3.5 w-3.5 text-accent" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Quick Info Specs — Symmetrical & balanced on both mobile and desktop */}
              <div className="mt-5 sm:mt-6 pt-5 border-t border-line/40 text-left font-mono text-xs space-y-3 text-muted">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted/70 shrink-0">// Location</span>
                  <span className="text-fg font-sans text-right">Bangkok, Thailand</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted/70 shrink-0">// Degree</span>
                  <span className="text-fg font-sans text-right leading-snug">
                    Faculty of Information Technology,
                    <br />
                    Department of Computer Engineering, IoT
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted/70 shrink-0">// Focus</span>
                  <span className="text-accent font-sans text-right">Web · Mobile · IoT · AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Story, Roles, and Tech Stack */}
        <div className="min-w-0 w-full lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* Background & Mindset */}
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-lg transition-colors duration-200 hover:border-accent/40">
            <div className="mb-3.5 sm:mb-4 flex items-center justify-between border-b border-line/40 pb-2.5 sm:pb-3">
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
                // Background & Mindset
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-muted">[full_cycle_developer]</span>
            </div>

            <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base leading-relaxed text-muted font-sans">
              <p className="text-fg/90">
                {locale === 'th'
                  ? 'ผมเป็นนักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์ (CPE) ที่ให้ความสำคัญกับการพัฒนา Web Application, Mobile App และระบบ Backend โดยมุ่งเน้นการออกแบบสถาปัตยกรรมซอฟต์แวร์ที่สะอาด มีระเบียบ (Clean Architecture), ประสิทธิภาพการทำงาน และตอบโจทย์ผู้ใช้งานจริง'
                  : 'I am a Computer Engineering (CPE) student focused on building modern Web Applications, Mobile Apps, and robust Backend systems, with a strong emphasis on clean architecture, performance, and intuitive user experiences.'}
              </p>
              <p>
                {locale === 'th'
                  ? 'มีประสบการณ์ลงมือพัฒนาจริงครอบคลุมทั้ง Frontend และ Mobile ด้วย React, Next.js, Tailwind CSS และ React Native (Expo) ตลอดจนการออกแบบ RESTful API และระบบหลังบ้านด้วย Node.js, Express, Go ร่วมกับฐานข้อมูล PostgreSQL และ MongoDB พร้อมข้อได้เปรียบในการเข้าใจระบบฮาร์ดแวร์ IoT (ESP32, MQTT, Raspberry Pi) และการประยุกต์ใช้ AI / Computer Vision'
                  : 'I bring hands-on experience across the entire development stack — from crafting responsive web interfaces and mobile apps with React, Next.js, Tailwind CSS, and React Native (Expo) to architecting scalable backend APIs with Node.js, Express, Go, PostgreSQL, and MongoDB — backed by a unique edge in IoT hardware integration (ESP32, MQTT, Raspberry Pi) and Computer Vision.'}
              </p>
              <p>
                {locale === 'th'
                  ? 'ปรับตัวได้เร็ว มีวินัยในการทำงาน และชอบร่วมงานกับทีมเพื่อแก้ปัญหาทางวิศวกรรมซอฟต์แวร์ มุ่งมั่นที่จะเติบโตและสร้างคุณค่าในตำแหน่ง Full-Stack Developer, Backend Developer หรือ Mobile Developer'
                  : 'Adaptable, quick to learn, and collaborative. I am eager to apply my full-stack web, mobile, and backend engineering skills to build impactful, production-grade applications.'}
              </p>
            </div>
          </div>

          {/* Target Positions Card — symmetrical 2-col grid on mobile, wrap on desktop */}
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-surface/90 p-5 sm:p-7 shadow-lg transition-colors duration-200 hover:border-accent/40">
            <div className="mb-3 sm:mb-3.5 flex items-center justify-between border-b border-line/40 pb-2.5">
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
                // Target Positions
              </span>
              <span className="font-mono text-[11px] text-emerald-400">Available</span>
            </div>

            <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-1" aria-label="Target roles">
              {[
                'Full-Stack Developer',
                'Backend Developer',
                'Mobile Developer',
                'Frontend Developer',
                'IoT Engineer',
                'AI Engineer',
              ].map((role) => (
                <li
                  key={role}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 rounded-xl border border-accent/30 bg-accent/5 px-2.5 sm:px-3 py-1.5 font-mono text-[11px] sm:text-xs font-medium text-accent transition-colors hover:border-accent hover:bg-accent/15 text-center sm:text-left"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="truncate">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Focus / Tech Stack Card */}
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-surface/90 p-5 sm:p-7 shadow-lg transition-colors duration-200 hover:border-accent/40">
            <div className="mb-3.5 sm:mb-4 flex items-center justify-between border-b border-line/40 pb-2.5">
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
                // What I Work With
              </span>
              <span className="font-mono text-[11px] text-muted">Core Stack</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 font-mono text-xs">
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// Web & Frontend</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">React · Next.js · Tailwind CSS · TypeScript · JavaScript</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// Mobile Development</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">React Native · Expo · Mobile UI · API Integration</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// Backend & APIs</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">Node.js · Express · Go (Golang) · RESTful APIs · JWT</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// Databases</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">PostgreSQL · MySQL · MongoDB · Firebase</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// DevOps & Tools</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">Docker · Git/GitHub · Postman · Bun</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-line/30 bg-bg/40 p-3.5">
                <span className="text-muted/70 block text-[10px] sm:text-[11px] uppercase tracking-wider">// Edge IoT & AI</span>
                <p className="text-fg mt-1 font-sans text-xs sm:text-[13px] leading-relaxed">ESP32 (C/C++) · Raspberry Pi · MQTT · PCB Design · CV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
