import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Form, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Arahkan pengguna ke dashboard jika sudah login
    }
  }, [navigate]);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Arahkan pengguna ke dashboard setelah login berhasil
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: 'Invalid username or password.',
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Login</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <p>Belum memiliki akun? <a href="/register">Buat Akun</a></p>
      </Form>
    </div>
  );
}

export default LoginPage;
