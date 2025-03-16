import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import { FileProvider } from './context/FileContext';
import Home from './containers/Home';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FileProvider>
        <Home />
      </FileProvider>
    </ThemeProvider>
  );
}

export default App;