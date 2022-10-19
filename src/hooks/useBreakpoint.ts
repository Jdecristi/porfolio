import { useTheme, useMediaQuery } from '@mui/material';

export default (prop?: any): string | number => {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));

  if (prop) {
    if (typeof prop === 'string' || typeof prop === 'number') return prop;

    let value: string | number = prop.xs;
    if (sm && prop.sm) value = prop.sm;
    if (md && prop.md) value = prop.md;
    if (lg && prop.lg) value = prop.lg;
    if (xl && prop.xl) value = prop.xl;

    return value;
  } else {
    if (xl) return 'xl';
    if (lg) return 'lg';
    if (md) return 'md';
    if (sm) return 'sm';
    return 'xs';
  }
};
