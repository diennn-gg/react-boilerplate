import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

interface IProps {
  children: React.ReactNode
  privateRouter: boolean
  location: {
    pathname: string
  }
}

const Layout = (props: IProps) => {
  const navigator = useNavigate()

  useEffect(() => {
    if (props.privateRouter && !cookie.get('accessToken')) {
      navigator(`/login?redirect=${props.location?.pathname}`)
    }
  }, [props.location?.pathname, navigator, props.privateRouter])
 
  return <>{props.children}</>
}

export default Layout