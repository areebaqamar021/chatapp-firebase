import React from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Chat from './components/Chat';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

const { Header, Content } = Layout;

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Layout>
      <Header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Chat App</Typography>
          </Toolbar>
        </AppBar>
      </Header>
      <Content style={{ padding: '50px' }}>
        {user ? <Chat /> : <Auth />}
      </Content>
    </Layout>
  );
};

export default App;
