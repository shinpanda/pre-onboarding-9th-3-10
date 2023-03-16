import { Center } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Center width='100%' height='100%' minHeight='100vh' flexDirection='column'>
      {children}
    </Center>
  );
};

export default MainLayout;
