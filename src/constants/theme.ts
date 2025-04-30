/**
 * Theme constants for the Africa Tech LMS
 */
export const THEME = {
  COLORS: {
    PRIMARY: '#E7343A', // Red accent color from the Happenings page
    PRIMARY_DARK: '#C42D32',
    PRIMARY_LIGHT: '#F0686D',
    SECONDARY: '#2D3748', // Dark blue/gray
    BACKGROUND: {
      DARK: '#121212',
      LIGHT: '#FFFFFF',
    },
    TEXT: {
      DARK: '#1A202C',
      LIGHT: '#F7FAFC',
      MUTED: '#718096',
    },
    SUCCESS: '#48BB78',
    WARNING: '#ECC94B',
    ERROR: '#F56565',
    INFO: '#4299E1',
  },
  FONTS: {
    HEADING: 'var(--font-heading)',
    BODY: 'var(--font-body)',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    XXL: '1536px',
  },
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    XXL: '3rem',
  },
  BORDER_RADIUS: {
    SM: '0.25rem',
    MD: '0.375rem',
    LG: '0.5rem',
    FULL: '9999px',
  },
  SHADOWS: {
    SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  TRANSITIONS: {
    DEFAULT: '0.3s ease',
    FAST: '0.15s ease',
    SLOW: '0.5s ease',
  },
} as const;
