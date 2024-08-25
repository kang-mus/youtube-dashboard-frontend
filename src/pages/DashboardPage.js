import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, List, Typography, notification, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

function DashboardPage() {
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState('');
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/channel', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setChannels(response.data);
      } catch (error) {
        notification.error({
          message: 'Failed to Fetch Channels',
          description: 'Could not retrieve channel data.',
        });
      }
    };

    fetchChannels();
  }, []);

  const handleAddChannel = async () => {
    try {
      await axios.post('http://localhost:5000/api/channel/add', { channelId: newChannel }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChannels([...channels, { channelId: newChannel }]);
      setNewChannel('');
      notification.success({
        message: 'Channel Added',
        description: `Channel ${newChannel} added successfully.`,
      });
    } catch (error) {
      notification.error({
        message: 'Failed to Add Channel',
        description: 'An error occurred while adding the channel.',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari local storage
    navigate('/login'); // Arahkan pengguna ke halaman login
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Dashboard</Title>
        <Button onClick={handleLogout} type="default" style={{ marginBottom: '20px' }}>
          Logout
        </Button>
        <Input
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          placeholder="YouTube Channel ID"
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleAddChannel} style={{ marginBottom: '20px' }}>
          Add Channel
        </Button>
        <List
          bordered
          dataSource={channels}
          renderItem={item => (
            <List.Item>
              {item.channelId}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}

export default DashboardPage;
