import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function ForbiddenPage(){
  const nav = useNavigate()
  return <Result status="403" title="403" subTitle="You do not have access to this page." extra={<Button onClick={()=>nav(-1)}>Go Back</Button>} />
}
