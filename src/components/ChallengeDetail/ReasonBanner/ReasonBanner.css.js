import { vars } from '@/styles/tokens.css';
import { recipe } from '@vanilla-extract/recipes';
export const container = recipe({
  base: {
    width: '100%',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: vars.font.weight.semibold,
    borderRadius: '999px',
  },
  variants: {
    color: {
      APPROVED: {
        backgroundColor: '#DFF0FF',
        color: '#4095DE',
      },
      DELETED: {
        backgroundColor: vars.color.gray500,
        color: 'white',
      },

      PENDING: {
        backgroundColor: '#FFFDE7',
        color: '#F2BC00',
      },

      REJECTED: {
        backgroundColor: '#FFF0F0',
        color: '#E54946',
      },
    },
  },
});
