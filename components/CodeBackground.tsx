'use client';

import { useEffect, useRef } from 'react';
import { codeSnippets } from '@/data/codeSnippets';
import { tokenize } from '@/lib/highlight';

// Pre-tokenize all cybersecurity snippets once at module load time (0 runtime regex/HTML parsing)
const TOKENIZED_SNIPPETS = codeSnippets.map(tokenize);

interface TypingBlockProps {
  startIndex: number;
  className: string;
  blockRef: React.RefObject<HTMLPreElement | null>;
}

/**
 * Zero-overhead streaming terminal block:
 * Appends characters directly to DOM Text nodes instead of re-parsing innerHTML,
 * achieving smooth real-time typing with ~0% CPU overhead.
 */
function TypingBlock({ startIndex, className, blockRef }: TypingBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const codeEl = codeRef.current;
    if (!codeEl) return;

    let snippetIdx = startIndex % TOKENIZED_SNIPPETS.length;
    let tokenIdx = 0;
    let charIdx = 0;
    let activeTextNode: Text | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const cursorEl = document.createElement('span');
    cursorEl.className = 'code-bg-cursor';

    const resetDom = () => {
      codeEl.textContent = '';
      codeEl.appendChild(cursorEl);
      tokenIdx = 0;
      charIdx = 0;
      activeTextNode = null;
    };

    resetDom();

    const step = () => {
      if (cancelled) return;

      if (document.hidden) {
        timer = setTimeout(step, 400);
        return;
      }

      const tokens = TOKENIZED_SNIPPETS[snippetIdx];
      if (tokenIdx >= tokens.length) {
        // Pause at end of snippet, then clear and stream the next cybersecurity snippet
        timer = setTimeout(() => {
          if (cancelled) return;
          snippetIdx = (snippetIdx + 1) % TOKENIZED_SNIPPETS.length;
          resetDom();
          timer = setTimeout(step, 350);
        }, 2400);
        return;
      }

      const token = tokens[tokenIdx];

      // Create the token's DOM node once when starting a new token
      if (charIdx === 0) {
        activeTextNode = document.createTextNode('');
        if (token.cls) {
          const span = document.createElement('span');
          span.className = token.cls;
          span.appendChild(activeTextNode);
          codeEl.insertBefore(span, cursorEl);
        } else {
          codeEl.insertBefore(activeTextNode, cursorEl);
        }
      }

      // Stream 1–2 chars per tick directly into the Text node (zero HTML parsing)
      const stepChars = token.text.charAt(charIdx) === ' ' ? 2 : 1;
      const slice = token.text.slice(charIdx, charIdx + stepChars);
      if (activeTextNode) {
        activeTextNode.nodeValue += slice;
      }
      charIdx += slice.length;

      const lastChar = slice.charAt(slice.length - 1);
      if (charIdx >= token.text.length) {
        tokenIdx++;
        charIdx = 0;
        activeTextNode = null;
      }

      const delay = lastChar === '\n' ? 140 : 38 + Math.random() * 28;
      timer = setTimeout(step, delay);
    };

    timer = setTimeout(step, startIndex * 450);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [startIndex]);

  return (
    <pre
      ref={blockRef}
      suppressHydrationWarning
      className={`code-bg-block absolute max-w-[min(33rem,90vw)] overflow-hidden whitespace-pre font-mono text-[11px] leading-5 will-change-transform sm:text-xs sm:leading-5 ${className}`}
    >
      <code ref={codeRef} suppressHydrationWarning />
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
  alpha: number;
  pulsePhase: number;
}

const COLORS = ['#4ADE80', '#36F9F6', '#72F1B8', '#FF7EDB', '#FEDE5D'];

/**
 * Interactive Mouse-Reactive Background with Streaming Cybersecurity Code Terminals.
 */
export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const block0Ref = useRef<HTMLPreElement>(null);
  const block1Ref = useRef<HTMLPreElement>(null);
  const block2Ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      radius: 130,
      radiusSq: 130 * 130,
    };

    const parallax = {
      currX: 0,
      currY: 0,
      targetX: 0,
      targetY: 0,
    };

    const particleCount = Math.min(42, Math.max(24, Math.floor((width * height) / 38000)));
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const baseVx = (Math.random() - 0.5) * 0.35;
      const baseVy = -Math.random() * 0.4 - 0.12;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radius: Math.random() * 1.6 + 1.0,
        color: COLORS[i % COLORS.length],
        alpha: Math.random() * 0.45 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    const onPointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      parallax.targetX = (e.clientX / width - 0.5) * 2;
      parallax.targetY = (e.clientY / height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    let animationFrameId = 0;
    let time = 0;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.02;

      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;

      parallax.currX += (parallax.targetX - parallax.currX) * 0.09;
      parallax.currY += (parallax.targetY - parallax.currY) * 0.09;

      const px = parallax.currX;
      const py = parallax.currY;

      if (block0Ref.current) {
        block0Ref.current.style.transform = `translate3d(${(px * -24).toFixed(1)}px, ${(py * -24).toFixed(1)}px, 0)`;
      }
      if (block1Ref.current) {
        block1Ref.current.style.transform = `translate3d(${(px * 30).toFixed(1)}px, ${(py * 30).toFixed(1)}px, 0)`;
      }
      if (block2Ref.current) {
        block2Ref.current.style.transform = `translate3d(${(px * -18).toFixed(1)}px, ${(py * 18).toFixed(1)}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        const spotRadius = 110;
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        glow.addColorStop(0, 'rgba(74, 222, 128, 0.11)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const maxLinkDist = width < 768 ? 70 : 95;
      const maxLinkDistSq = maxLinkDist * maxLinkDist;
      ctx.strokeStyle = '#4ADE80';
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = ((1 - dist / mouse.radius) * 3.8) / dist;
            p.vx += dx * force;
            p.vy += dy * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx = p.vx * 0.93 + p.baseVx * 0.07;
        p.vy = p.vy * 0.93 + p.baseVy * 0.07;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        const pulse = 0.85 + Math.sin(time + p.pulsePhase) * 0.2;
        const currentAlpha = p.alpha * pulse * 0.7;

        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const lDistSq = ldx * ldx + ldy * ldy;

          if (lDistSq < maxLinkDistSq) {
            const ratio = 1 - Math.sqrt(lDistSq) / maxLinkDist;
            ctx.globalAlpha = ratio * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Streaming cybersecurity code terminals with GPU-composited mouse parallax */}
      <div className="code-bg opacity-[0.22]">
        <TypingBlock
          startIndex={0}
          blockRef={block0Ref}
          className="left-4 top-24 sm:left-10"
        />
        <TypingBlock
          startIndex={2}
          blockRef={block1Ref}
          className="right-6 top-[36%] hidden md:block lg:right-16"
        />
        <TypingBlock
          startIndex={4}
          blockRef={block2Ref}
          className="bottom-10 left-[22%] hidden lg:block"
        />
      </div>
    </div>
  );
}
