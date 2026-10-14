import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

// Generated once at build time (works with `output: 'export'`).
export const dynamic = 'force-static';
export const alt = `${profile.name} — ${profile.title.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#2B2B2B',
          color: '#F5F5F4',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#4ADE80', marginBottom: 24 }}>
          Portfolio
        </div>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ display: 'flex', fontSize: 38, color: '#B5AFAB', marginTop: 24 }}>
          {profile.title.en}
        </div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 48, color: '#4ADE80' }}>
          Full-Stack · IoT · AI
        </div>
      </div>
    ),
    size,
  );
}
