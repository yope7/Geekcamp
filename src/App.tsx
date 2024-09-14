import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {IndexPage} from './pages/IndexPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D84315',
    },
    secondary: {
      main: '#FFA000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;