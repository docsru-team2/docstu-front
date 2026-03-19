import { vars } from '@/styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: '8px',
  },
  variants: {
    badgeStyle: {
      field: {
        padding: '3px 12px',
        fontSize: vars.font.size.md,
        fontVariantLigatures: 'none',
        borderRadius: vars.font.size.md,
      },
      documentType: {
        padding: '5px 7px',
        fontSize: vars.font.size.sm,
        borderRadius: '8px',
      },
      reviewStatus: {
        padding: '4px 8px',
        fontSize: vars.font.size.sm,
        borderRadius: '4px',
      },
      closedStatus: {
        padding: '8px 12px',
        fontSize: vars.font.size.sm,
        borderRadius: '999px',
      },
    },
    color: {
      primary: {
        backgroundColor: vars.color.white,
        color: vars.color.gray600,
        border: `1px solid ${vars.color.gray300}`,
      },
      nextjs: {
        backgroundColor: '#79E16A',
        color: vars.color.gray600,
      },
      api: {
        backgroundColor: '#FF905E',
        color: vars.color.gray600,
      },
      career: {
        backgroundColor: '#7EB2EE',
        color: vars.color.gray600,
      },
      modernjs: {
        backgroundColor: '#F66E6B',
        color: vars.color.gray600,
      },
      web: {
        backgroundColor: '#F7EA5D',
        color: vars.color.gray600,
      },
      pending: {
        backgroundColor: '#FFFDE7',
        color: '#F2BC00',
      },
      rejected: {
        backgroundColor: '#FFF0F0',
        color: '#E54946',
      },
      approved: {
        backgroundColor: '#DFF0FF',
        color: '#4095DE',
      },
      deleted: {
        backgroundColor: vars.color.gray200,
        color: vars.color.gray500,
      },
      closedExpired: {
        backgroundColor: vars.color.gray800,
        color: vars.color.white,
      },
      closedFull: {
        backgroundColor: vars.color.gray200,
        color: vars.color.gray800,
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    badgeStyle: 'documentType',
  },
});
