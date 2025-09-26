import React from 'react'
import { Card, Form, Input, Button } from 'antd'
import { useAppDispatch } from '../store/hooks'
import { fetchCurrentUser } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFinish = async () => {
    // pretend login then fetch user
    await dispatch(fetchCurrentUser())
    navigate('/')
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f0f2f5'}}>
      <Card title="Đăng nhập" style={{width:360}}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{required:true}]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{required:true}]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Đăng nhập</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
