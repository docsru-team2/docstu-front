import { style } from "@vanilla-extract/css";

export const grid = style({
  display:'flex',
  flexDirection:'colum',
  gap: '12px'
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '40px 1fr 80px'
})