import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#5a7fec',
      },
      secondary: {
        main: '#795548',
      },
      background: {
        paper: '#efefef',
      },
    },
});

export default theme