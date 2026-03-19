import { media, vars } from '@/styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: '1px solid transparent',
    cursor: 'pointer',
    fontWeight: vars.font.weight.semibold,
    fontSize: vars.font.size.md,
    '@media': {
      [media.tablet]: {
        fontSize: vars.font.size.lg,
      },
    },

    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: vars.color.gray200,
      color: vars.color.gray500,
    },
  },
  variants: {
    color: {
      primary: {
        backgroundColor: vars.color.brandDark,
        color: vars.color.white,
      },
      secondary: {
        backgroundColor: vars.color.white,
        color: vars.color.gray800,
        border: `1px solid ${vars.color.gray800}`,
      },
      viewOriginal: {
        backgroundColor: vars.color.brandYellow,
        color: vars.color.brandDark,
        border: `2px solid ${vars.color.brandDark}`,
      },
      warning: {
        backgroundColor: '#FFE7E7',
        color: '#F24744',
      },
      openLink: {
        backgroundColor: 'rgba(246, 248, 250, 0.5)',
        color: vars.color.gray700,
      },
    },
    size: {
      sm: {
        width: '80px',
        height: '32px',
        '@media': {
          [media.tablet]: {
            width: '90px',
            height: '40px',
          },
        },
      },
      md: {
        width: '120px',
        height: '40px',
      },
      lg: {
        width: '153px',
        height: '48px',
      },
      fullWidth: {
        width: '100%',
        height: '40px',
      },
    },
    rounded: {
      md: {
        borderRadius: '10px',
      },
      lg: {
        borderRadius: '12px',
      },
      pill: {
        borderRadius: '999px',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm',
    rounded: 'md',
  },
});
