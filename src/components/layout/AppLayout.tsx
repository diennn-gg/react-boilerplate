import React from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './layout.css'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'

const { Header, Sider, Content } = Layout

export default function AppLayout(){
  const [collapsed, setCollapsed] = React.useState(false)
  const { user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { key: 'dashboard', label: <Link to="/">Dashboard</Link> },
    { key: 'admin', label: <Link to="/admin">Admin</Link> }
  ]

  return (
    <Layout className="app-layout" style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={v=>setCollapsed(v)} width={260} style={{background:'#0f2b59'}}>
        <div className="logo">sMartG</div>
        <Menu theme="dark" mode="inline" items={menuItems} style={{background:'transparent', border:'none'}}/>
      </Sider>
      <Layout>
        <Header style={{padding: '0 20px', background: '#fff', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <h2 style={{margin:0}}>Hệ Thống Quản Lý Thiết Bị</h2>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <span>{user?.name}</span>
            <Dropdown menu={{items:[{key:'logout', label:'Logout'}], onClick: ()=> { dispatch(logout()); navigate('/login') }}}>
              <Avatar icon={<UserOutlined/>}/>
            </Dropdown>
          </div>
        </Header>
        <Content style={{margin:'20px'}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
