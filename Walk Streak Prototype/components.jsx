// ────────────────────────────────────────────────────────────
// Habuild Walk Everyday — Shared Component Library
// Exports primitives to window so every screen file can use them.
// Follows: Guidelines.md, component-guidelines.md, spacing-token-system.md,
//          motion-guidelines.md, ai-copy-tone-rules.md.
// ────────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

// ── Stage: wraps an iOS frame in a centered, dark backdrop ─
function Stage({ children }) {
  return (
    <div className="stage">
      {children}
    </div>
  );
}

// ── PhoneFrame: iOS device that hosts a Habuild screen ─────
// Hides the iOS nav bar; we render our own headers per screen.
function PhoneFrame({ children, statusBarDark = false }) {
  return (
    <IOSDevice width={390} height={844} dark={false}>
      <div className="app-surface" style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </IOSDevice>
  );
}

// ── ScreenShell: vertical layout with safe padding ─────────
// `bottomNav` controls extra bottom padding so content clears the nav.
function ScreenShell({ children, bottomNav = false, statusBarPad = true, style = {} }) {
  return (
    <div className="fade-up" style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: statusBarPad ? 60 : 0,       // clear status bar / dynamic island
      paddingBottom: bottomNav ? 'calc(var(--nav-h) + 34px + 16px)' : 'calc(34px + 16px)', // home indicator
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── PrimaryButton ───────────────────────────────────────────
function PrimaryButton({ children, onClick, size = 'lg', disabled = false, full = true, leadingIcon, trailingIcon, style = {} }) {
  const height = size === 'lg' ? 'var(--btn-h-lg)' : 'var(--btn-h)';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="pressable"
      style={{
        width: full ? '100%' : 'auto',
        height,
        padding: '0 24px',
        borderRadius: 'var(--radius-pill)',
        background: disabled ? 'var(--color-primary-300)' : 'var(--color-primary)',
        color: 'var(--color-text-onPrimary)',
        fontSize: 'var(--text-label)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        boxShadow: disabled ? 'none' : 'var(--shadow-md)',
        ...style,
      }}>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}

// ── SecondaryButton: white surface, primary text ───────────
function SecondaryButton({ children, onClick, size = 'lg', full = true, style = {} }) {
  const height = size === 'lg' ? 'var(--btn-h-lg)' : 'var(--btn-h)';
  return (
    <button
      onClick={onClick}
      className="pressable"
      style={{
        width: full ? '100%' : 'auto',
        height,
        padding: '0 24px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        color: 'var(--color-primary)',
        fontSize: 'var(--text-label)',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}>
      {children}
    </button>
  );
}

// ── TextLink: inline subtle link ────────────────────────────
function TextLink({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--color-primary)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        cursor: 'pointer',
        padding: '8px 12px',
        ...style,
      }}>
      {children}
    </button>
  );
}

// ── Card: white surface, soft shadow, generous padding ─────
function Card({ children, padding = 20, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={onClick ? 'pressable' : ''}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        padding,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}>
      {children}
    </div>
  );
}

// ── Chip: large pill, optional selected state ──────────────
function Chip({ children, selected = false, onClick, leadingIcon, style = {} }) {
  return (
    <button
      onClick={onClick}
      className="pressable"
      style={{
        minHeight: 48,
        padding: '12px 20px',
        borderRadius: 'var(--radius-pill)',
        background: selected ? 'var(--color-primary-100)' : 'var(--color-surface)',
        color: selected ? 'var(--color-primary-700)' : 'var(--color-text)',
        fontSize: 'var(--text-body)',
        fontWeight: selected ? 600 : 500,
        border: 'none',
        boxShadow: selected ? 'none' : 'var(--shadow-sm)',
        outline: selected ? '2px solid var(--color-primary)' : 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}>
      {leadingIcon}
      {children}
    </button>
  );
}

// ── HabuildMark: small wordmark used in headers ─────────────
function HabuildMark({ size = 'sm', color }) {
  const fontSize = size === 'lg' ? 22 : 15;
  const dot = size === 'lg' ? 8 : 6;
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: color || 'var(--color-primary)',
      fontSize,
      fontWeight: 700,
      letterSpacing: '0.04em',
    }}>
      <span style={{
        width: dot,
        height: dot,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        display: 'inline-block',
      }} />
      <span>Habuild Walk</span>
    </div>
  );
}

// ── HabuildLogo: full wordmark used on Welcome ─────────────
function HabuildLogo() {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--color-primary)',
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '0.06em',
    }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: 'var(--color-accent)',
        boxShadow: '0 0 0 4px rgba(249,168,37,0.18)',
      }} />
      <span>Habuild Walk</span>
    </div>
  );
}

// ── Inclusive avatar dot row (for social proof) ────────────
// Abstract circular avatars — no faked photos. Soft pigments only.
function AvatarStack({ count = 4 }) {
  const palette = ['#D9B38C', '#B58463', '#8B5E3C', '#D2A679', '#A67B5B'];
  return (
    <div style={{ display: 'inline-flex' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 30, height: 30, borderRadius: '50%',
          background: palette[i % palette.length],
          border: '2px solid var(--color-surface)',
          marginLeft: i === 0 ? 0 : -10,
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        }} />
      ))}
    </div>
  );
}

// ── Section title + optional eyebrow ───────────────────────
function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div>
      {eyebrow && (
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: 8,
        }}>{eyebrow}</div>
      )}
      <h1 style={{
        fontSize: 'var(--text-display)',
        lineHeight: 'var(--leading-tight)',
        fontWeight: 700,
        margin: 0,
        color: 'var(--color-text)',
        letterSpacing: '-0.02em',
        textWrap: 'pretty',
      }}>{title}</h1>
      {subtitle && (
        <p style={{
          marginTop: 12,
          fontSize: 'var(--text-body)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--color-text-secondary)',
          textWrap: 'pretty',
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ── Bottom navigation (Home / Walk / Progress / Settings) ──
// Onboarding screens hide this entirely.
function BottomNav({ active = 'home', onNavigate }) {
  const items = [
    { key: 'home',     label: 'Home',     icon: 'home' },
    { key: 'walk',     label: 'Walk',     icon: 'walk' },
    { key: 'progress', label: 'Progress', icon: 'progress' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0, bottom: 0,
      paddingBottom: 30,    // home indicator clearance
      background: 'var(--color-surface)',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      boxShadow: '0 -8px 24px -8px rgba(45,106,79,0.10)',
      zIndex: 30,
    }}>
      <div style={{
        height: 72,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        alignItems: 'center',
        padding: '8px 12px 0',
      }}>
        {items.map(it => {
          const isActive = it.key === active;
          return (
            <button key={it.key}
              onClick={() => onNavigate && onNavigate(it.key)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                fontFamily: 'inherit',
              }}>
              <NavIcon name={it.icon} active={isActive} />
              <span style={{
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
              }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavIcon({ name, active }) {
  const stroke = active ? 'var(--color-primary)' : 'var(--color-text-tertiary)';
  const fill = active ? 'var(--color-primary-100)' : 'none';
  const props = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
                  stroke, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':
      return <svg {...props}>
        <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" fill={fill}/>
      </svg>;
    case 'walk':
      // simple footsteps
      return <svg {...props}>
        <path d="M9 4c1.5 0 2.5 1.2 2.5 3s-1 4-2.5 4-2.5-1.2-2.5-3S7.5 4 9 4z" fill={fill}/>
        <path d="M15 11c1.3 0 2.2 1 2.2 2.4 0 1.6-1 3.6-2.2 3.6s-2.2-1-2.2-2.4c0-1.6 1-3.6 2.2-3.6z" fill={fill}/>
        <path d="M7.5 13c-1.5.4-2.5 1.6-2.5 3.2 0 1.2 1 2 2.3 1.8 1.3-.2 2-1 2-2.2 0-1.2-.5-2.2-1.8-2.8z"/>
        <path d="M16.5 18c1.3.4 2.5-.3 2.5-1.5 0-1-.8-1.6-2-1.4"/>
      </svg>;
    case 'progress':
      return <svg {...props}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>
      </svg>;
    case 'settings':
      return <svg {...props}>
        <circle cx="12" cy="12" r="3" fill={fill}/>
        <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>
      </svg>;
    default: return null;
  }
}

// ── Soft walking-figure illustration (Welcome hero) ────────
// Abstract, flat, rounded forms. No detailed faces.
// Evokes: a calm walk at sunrise in a garden setting.
function WalkingIllustration({ width = 320, height = 260 }) {
  return (
    <svg viewBox="0 0 320 260" width={width} height={height} role="img" aria-label="A calm walk at sunrise">
      {/* soft sky wash */}
      <defs>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE7B5" stopOpacity="1"/>
          <stop offset="100%" stopColor="#FDE7B5" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2ECE7"/>
          <stop offset="100%" stopColor="#CFE0D6"/>
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4D9A4"/>
          <stop offset="100%" stopColor="#E8C68A"/>
        </linearGradient>
      </defs>

      {/* sun glow */}
      <circle cx="220" cy="110" r="120" fill="url(#sun)"/>
      {/* sun */}
      <circle cx="220" cy="100" r="34" fill="#F9A825" opacity="0.85"/>
      <circle cx="220" cy="100" r="46" fill="#F9A825" opacity="0.15"/>

      {/* distant rolling hill */}
      <path d="M0,200 Q80,160 160,180 T320,170 L320,260 L0,260 Z" fill="url(#hill)"/>
      {/* foreground sand path */}
      <path d="M0,225 Q80,200 160,215 T320,210 L320,260 L0,260 Z" fill="url(#hill2)" opacity="0.7"/>

      {/* walking figure — abstract saree silhouette */}
      <g transform="translate(120,120)">
        {/* head */}
        <circle cx="40" cy="14" r="13" fill="#8B5E3C"/>
        {/* hair bun */}
        <circle cx="48" cy="6" r="5" fill="#3D2817"/>
        {/* torso/saree body — soft drape */}
        <path d="M28,28 Q24,50 28,72 Q34,98 30,118 L56,118 Q56,98 60,80 Q66,58 56,30 Z"
              fill="#2D6A4F"/>
        {/* saree pallu drape */}
        <path d="M52,28 Q70,48 64,78 Q60,68 56,58 Q56,42 52,30 Z"
              fill="#F9A825" opacity="0.85"/>
        {/* trailing arm */}
        <path d="M28,42 Q18,58 22,76" stroke="#8B5E3C" strokeWidth="6" strokeLinecap="round" fill="none"/>
        {/* leading arm */}
        <path d="M56,42 Q70,56 66,72" stroke="#8B5E3C" strokeWidth="6" strokeLinecap="round" fill="none"/>
        {/* legs — gentle stride */}
        <path d="M34,118 Q30,135 26,150" stroke="#3D2817" strokeWidth="7" strokeLinecap="round"/>
        <path d="M50,118 Q56,134 62,148" stroke="#3D2817" strokeWidth="7" strokeLinecap="round"/>
      </g>

      {/* floating leaves */}
      <g opacity="0.85">
        <ellipse cx="60" cy="80" rx="14" ry="7" transform="rotate(-30 60 80)" fill="#6B9B85"/>
        <ellipse cx="50" cy="78" rx="6" ry="3" transform="rotate(-30 50 78)" fill="#2D6A4F" opacity="0.4"/>
      </g>
      <g opacity="0.7">
        <ellipse cx="285" cy="180" rx="10" ry="5" transform="rotate(20 285 180)" fill="#6B9B85"/>
      </g>
      <g opacity="0.8">
        <ellipse cx="40" cy="170" rx="12" ry="6" transform="rotate(15 40 170)" fill="#A8C5B5"/>
      </g>
    </svg>
  );
}

Object.assign(window, {
  Stage, PhoneFrame, ScreenShell,
  PrimaryButton, SecondaryButton, TextLink,
  Card, Chip,
  HabuildMark, HabuildLogo, AvatarStack,
  SectionTitle, BottomNav,
  WalkingIllustration,
  OnboardingHeader, SectionLabel, SelectChip,
});

// ── Shared onboarding primitives ────────────────────────────
// Used across Weekly Plan, Daily Intention, Confirm, and any
// other onboarding step. Promoted from per-screen files.

function OnboardingHeader({ step = 1, total = 3, onBack, rightSlot }) {
  return (
    <div style={{
      padding: '56px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <button onClick={onBack} aria-label="Back"
        className="pressable"
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--color-surface)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="var(--color-text)" strokeWidth="2.2"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6"/>
        </svg>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === step - 1;
          const isDone   = i < step - 1;
          return (
            <div key={i} style={{
              width: isActive ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: isActive || isDone ? 'var(--color-primary)' : 'var(--color-primary-100)',
              transition: 'width 200ms var(--ease-out)',
            }} />
          );
        })}
      </div>

      <div style={{ width: 44, display: 'flex', justifyContent: 'flex-end' }}>
        {rightSlot}
      </div>
    </div>
  );
}

function SectionLabel({ children, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--color-text)',
        letterSpacing: '-0.01em',
      }}>{children}</div>
      {hint && (
        <div style={{
          fontSize: 14,
          color: 'var(--color-text-tertiary)',
          marginTop: 2,
        }}>{hint}</div>
      )}
    </div>
  );
}

function SelectChip({ selected, onClick, children, sub, fullWidth = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      className="pressable"
      style={{
        minHeight: 56,
        padding: '10px 14px',
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 'var(--radius-pill)',
        background: selected ? 'var(--color-primary)' : 'var(--color-surface)',
        color: selected ? 'var(--color-text-onPrimary)' : 'var(--color-text)',
        border: 'none',
        boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        cursor: 'pointer',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        fontFamily: 'inherit',
        transition: 'background var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)',
        ...style,
      }}>
      <span style={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>
      {sub && (
        <span style={{
          fontSize: 12,
          color: selected ? 'rgba(255,255,255,0.78)' : 'var(--color-text-tertiary)',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>{sub}</span>
      )}
    </button>
  );
}
