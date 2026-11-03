/**
 * Illustrated portrait avatars, generated as SVG data URIs.
 *
 * These are original illustrations, not photographs of real people. They are
 * deterministic from the seed, so the same name always produces the same face,
 * and they are built at render time so the page needs no external image host.
 */

const SKIN = ['#7B4A2B', '#6A3D22', '#5A331C', '#8A5A34', '#4A2A15', '#93643D', '#5E3A20', '#452715'];
const HAIRC = ['#1B1210', '#241713', '#0F0B0A', '#2E1D16'];
const CLOTH = ['#0A1F44', '#F5C518', '#1B7F4C', '#B4562A', '#2B4C86', '#8A6D00', '#14315F', '#C2410C'];
const BGT = ['#FEF6D6', '#DCF2E3', '#E8EDFA', '#FDEDE6', '#F1EEE7', '#FBE9D7'];

export type PortraitStyle = 'afro' | 'braids' | 'gele';

function hashOf(str: string): number {
  let h = 2166138261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function shade(c: string): string {
  return c.replace(/^#(..)(..)(..)$/, (_m, r: string, g: string, b: string) =>
    '#' + [r, g, b].map((x) => Math.max(0, parseInt(x, 16) - 26).toString(16).padStart(2, '0')).join('')
  );
}

export function portraitSVG(seed: string, style: PortraitStyle = 'afro'): string {
  const h = hashOf(seed);
  const pick = (arr: string[], n: number) => arr[(h >> n) % arr.length];
  const skin = pick(SKIN, 2);
  const hair = pick(HAIRC, 5);
  const cloth = pick(CLOTH, 8);
  const bg = pick(BGT, 11);

  let back = '';
  let front = '';
  if (style === 'gele') {
    back = `<ellipse cx="60" cy="30" rx="34" ry="24" fill="${cloth}"/>`;
    front =
      `<path d="M28 40c0-16 14-26 32-26s32 10 32 26c-8-8-19-12-32-12s-24 4-32 12z" fill="${cloth}"/>` +
      `<ellipse cx="60" cy="22" rx="30" ry="12" fill="${shade(cloth)}" opacity=".45"/>`;
  } else if (style === 'braids') {
    back =
      `<ellipse cx="60" cy="34" rx="27" ry="21" fill="${hair}"/>` +
      `<rect x="30" y="46" width="7" height="34" rx="3.5" fill="${hair}"/>` +
      `<rect x="83" y="46" width="7" height="34" rx="3.5" fill="${hair}"/>`;
    front = `<path d="M34 43c2-13 12-20 26-20s24 7 26 20c-6-7-15-10-26-10s-20 3-26 10z" fill="${hair}"/>`;
  } else {
    back = `<circle cx="60" cy="36" r="32" fill="${hair}"/>`;
    front = `<path d="M32 46c2-17 13-25 28-25s26 8 28 25c-6-9-16-13-28-13S38 37 32 46z" fill="${hair}"/>`;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">` +
    `<rect width="120" height="120" fill="${bg}"/>` +
    `<path d="M60 78c-20 0-34 12-38 30-1 5 0 12 0 12h76s1-7 0-12c-4-18-18-30-38-30z" fill="${cloth}"/>` +
    `<rect x="52" y="66" width="16" height="18" rx="7" fill="${shade(skin)}"/>${back}` +
    `<ellipse cx="60" cy="52" rx="25" ry="29" fill="${skin}"/>` +
    `<ellipse cx="34" cy="55" rx="4.5" ry="6" fill="${skin}"/>` +
    `<ellipse cx="86" cy="55" rx="4.5" ry="6" fill="${skin}"/>${front}` +
    `<path d="M45 48c3-2 7-2 10 0M65 48c3-2 7-2 10 0" stroke="${shade(hair)}" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="50" cy="56" rx="3.1" ry="3.6" fill="#181008"/>` +
    `<ellipse cx="70" cy="56" rx="3.1" ry="3.6" fill="#181008"/>` +
    `<circle cx="51.1" cy="54.8" r="1" fill="#fff" opacity=".85"/>` +
    `<circle cx="71.1" cy="54.8" r="1" fill="#fff" opacity=".85"/>` +
    `<path d="M60 58v6c0 1.6-1.4 2.4-2.8 2.4" stroke="${shade(skin)}" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<path d="M53 71c3.6 3.4 10.4 3.4 14 0" stroke="${shade(skin)}" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
    `</svg>`
  );
}

export function portraitURI(seed: string, style: PortraitStyle = 'afro'): string {
  const svg = portraitSVG(seed, style);
  const b64 = typeof Buffer !== 'undefined'
    ? Buffer.from(svg, 'utf8').toString('base64')
    : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${b64}`;
}
