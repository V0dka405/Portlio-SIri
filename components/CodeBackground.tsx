'use client';

import { useEffect, useRef } from 'react';
import { codeSnippets } from '@/data/codeSnippets';
import { highlight } from '@/lib/highlight';

interface TypingBlockProps {
  start: number;
  depth: number;
  className: string;
}

const TYPE_DELAY = 38;
const LINE_DELAY = 140;
const HOLD_DELAY = 2800;
const ERASE_DELAY = 600;

/**
 * A typing terminal block that displays neon code snippets.
 * Reacts to mouse movement through 3D parallax depth.
 */
function TypingBlock({ start, depth, className }: TypingBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.innerHTML = highlight(codeSnippets[start % codeSnippets.length]);
      return;
    }

    let snippetIndex = start % codeSnippets.length;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (document.hidden) {
        timer = setTimeout(tick, 500);
        return;
      }

      const snippet = codeSnippets[snippetIndex];

      if (charIndex < snippet.length) {
        charIndex += 1;
        el.innerHTML = highlight(snippet.slice(0, charIndex));
        const justTyped = snippet[charIndex - 1];
        const jitter = Math.random() * 30;
        timer = setTimeout(tick, justTyped === '\n' ? LINE_DELAY : TYPE_DELAY + jitter);
      } else {
        timer = setTimeout(() => {
          el.textContent = '';
          charIndex = 0;
          snippetIndex = (snippetIndex + 1) % codeSnippets.length;
          timer = setTimeout(tick, ERASE_DELAY);
        }, HOLD_DELAY);
      }
    };

    timer = setTimeout(tick, 400 + start * 900);
    return () => clearTimeout(timer);
  }, [start]);

  return (
    <pre
      ref={containerRef}
      data-depth={depth}
      className={`code-bg-block absolute max-w-[min(32rem,90vw)] overflow-hidden whitespace-pre font-mono text-[11px] leading-5 transition-transform duration-100 ease-out sm:text-xs sm:leading-5 ${className}`}
    >
      <code ref={codeRef} />
      <span className="code-bg-cursor" />
    </pre>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  lightColor: string;
  alpha: number;
  pulsePhase: number;
}

/**
 * Antigravity Interactive Canvas Background:
 * 1. Weightless particles floating in zero gravity.
 * 2. Antigravity repulsion force field pushing particles away as the cursor moves (like antigravity.google).
 * 3. Subtle constellation links between close particles.
 * 4. Radial cursor spotlight.
 * 5. Parallax shift on floating code blocks.
 */
function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates with smooth lerping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 80, // compact, nimble repulsion radius (down from 170)
      active: false,
    };

    // Parallax tracking (-1 to 1 normalized)
    const parallax = {
      currX: 0,
      currY: 0,
      targetX: 0,
      targetY: 0,
    };

    const darkColors = ['#4ADE80', '#36F9F6', '#FF7EDB', '#FEDE5D', '#A78BFA'];
    const lightColors = ['#15803D', '#0E7490', '#A21CAF', '#B45309', '#6D28D9'];

    const particleCount = width < 768 ? 32 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorIndex = i % darkColors.length;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.45;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: 1.2 + Math.random() * 2.2,
        color: darkColors[colorIndex],
        lightColor: lightColors[colorIndex],
        alpha: 0.25 + Math.random() * 0.55,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      // Calculate normalized position from center (-1 to 1) for parallax
      parallax.targetX = (e.clientX / width - 0.5) * 2;
      parallax.targetY = (e.clientY / height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    let animationFrameId: number;
    let time = 0;

    const blocks = document.querySelectorAll<HTMLElement>('.code-bg-block');

    const render = () => {
      time += 0.02;

      // Smooth mouse coordinate lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Smooth parallax lerping
      parallax.currX += (parallax.targetX - parallax.currX) * 0.08;
      parallax.currY += (parallax.targetY - parallax.currY) * 0.08;

      // Parallax update on code blocks
      if (!isReducedMotion && blocks.length > 0) {
        blocks.forEach((block) => {
          const depth = parseFloat(block.dataset.depth || '15');
          const offsetX = parallax.currX * depth;
          const offsetY = parallax.currY * depth;
          block.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
        });
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');

      // 1. Draw small, subtle cursor spotlight aura around mouse tip
      if (mouse.active && mouse.x > 0 && mouse.y > 0 && !isReducedMotion) {
        const spotRadius = 55;
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        const glowColor = isLight ? 'rgba(21, 128, 61, 0.08)' : 'rgba(74, 222, 128, 0.1)';
        glow.addColorStop(0, glowColor);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw particles with antigravity physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReducedMotion) {
          // Antigravity mouse repulsion force
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius && dist > 0) {
              // Inverse distance force (pushes weightlessly outward)
              const force = (1 - dist / mouse.radius) * 4.5;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * force;
              p.vy += Math.sin(angle) * force;
            }
          }

          // Gentle ambient zero-g drift
          p.x += p.vx;
          p.y += p.vy;

          // Damping back to base orbital velocity
          p.vx = p.vx * 0.94 + p.baseVx * 0.06;
          p.vy = p.vy * 0.94 + p.baseVy * 0.06;

          // Wrap edges smoothly
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        // Slight breathing pulse
        const pulse = 0.85 + Math.sin(time + p.pulsePhase) * 0.25;
        const currentAlpha = Math.min(1, Math.max(0.05, p.alpha * pulse * (isLight ? 0.35 : 0.65)));

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = isLight ? p.lightColor : p.color;

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Neon halo / glow in dark mode
        if (!isLight && p.radius > 1.8) {
          ctx.globalAlpha = currentAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // 3. Constellation connection lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxLinkDist = width < 768 ? 65 : 85;

          if (dist < maxLinkDist) {
            const lineAlpha = (1 - dist / maxLinkDist) * (isLight ? 0.08 : 0.15);
            ctx.save();
            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = isLight ? '#047857' : '#4ADE80';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none"
      aria-hidden="true"
    />
  );
}

/**
 * Full Interactive Code & Antigravity Particle Background.
 * Combines zero-gravity interactive particles with floating neon VS Code typing terminals.
 */
export default function CodeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      <AntigravityCanvas />

      {/* Floating neon code terminals with distinct parallax depths */}
      <div className="code-bg opacity-[0.24]">
        <TypingBlock start={0} depth={-18} className="left-4 top-24 sm:left-10" />
        <TypingBlock start={1} depth={24} className="right-6 top-[38%] hidden md:block lg:right-16" />
        <TypingBlock start={2} depth={-28} className="bottom-10 left-[26%] hidden lg:block" />
        <TypingBlock start={3} depth={15} className="bottom-24 right-4 sm:hidden" />
      </div>
    </div>
  );
}
