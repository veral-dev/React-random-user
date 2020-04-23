import React from 'react';
import Header from './components/Header'
import Users from './components/Users'


import UserProvider from './context/Users.context'

import Container from '@material-ui/core/Container'

function App() {
  return (
    <UserProvider>
      <Header />
      <Container style={{ paddingTop: '20px' }}>
        <Users />
      </Container>
    </UserProvider>
  );
}

export default App;
