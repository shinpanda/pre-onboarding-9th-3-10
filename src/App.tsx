import { ChakraProvider, theme } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
