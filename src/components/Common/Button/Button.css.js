import { media, vars } from '@/styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
export const button = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontWeight: vars.font.weight.semibold,
    fontSize: vars.font.size.lg,
    border: '1px solid transparent',
    cursor: 'pointer',

    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: vars.color.gray200,
      color: vars.color.gray500,
    },
  },
  variants: {
    hasIcon: {
      true: { gap: '8px' },
      false: {},
    },
    roundBtn: {
      true: { borderRadius: '999px' },
      false: {},
    },
    fontSize: {
      true: { fontSize: vars.font.size.md },
      false: {}, // 14px
    },
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
      abandon: {
        backgroundColor: '#FFE7E7',
        color: '#F24744',
      },
      opacity: {
        backgroundColor: 'rgba(246, 248, 250, 0.80)',
        color: vars.color.gray700,
      },
    },

    size: {
      sm: {
        height: '32px',
      },
      md: {
        height: '40px',
      },
      lg: {
        height: '48px',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    hasIcon: false,
  },
});
