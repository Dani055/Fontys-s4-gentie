import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#5a7fec',
      },
      secondary: {
        main: 'rgba(43,68,212,0.52)',
      },
      background: {
        default: '#282c34',
        paper: '#292525',
      },
    },
});

export default theme