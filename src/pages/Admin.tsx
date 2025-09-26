import React from 'react'
import { Card } from 'antd'

export default function AdminPage(){
  return (
    <Card title="Admin">
      <p>This page is visible to users with the <strong>admin</strong> role.</p>
    </Card>
  )
}
