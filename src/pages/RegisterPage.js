import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, Typography, Select, notification } from 'antd';

const { Title } = Typography;

function RegisterPage() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', values);
      window.location.href = '/login';
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: 'An error occurred during registration.',
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Register</Title>
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
