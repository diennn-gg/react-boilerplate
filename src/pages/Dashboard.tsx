import React from 'react'
import { Card, Row, Col } from 'antd'

export default function DashboardPage(){
  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Dashboard">Welcome to the dashboard. Add components here.</Card>
        </Col>
      </Row>
    </div>
  )
}
