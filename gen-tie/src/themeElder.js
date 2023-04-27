import { createTheme } from '@mui/material/styles';

const themeElder = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#C29572',
        contrastText: 'rgba(255,255,255,0.87)',
      },
      secondary: {
        main: '#F7EEE7',
      },
    },
});

export default themeElder