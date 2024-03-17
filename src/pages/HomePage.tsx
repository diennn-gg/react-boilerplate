import React, { useEffect } from 'react'
import Layout from '../layout'
import { AuthStore, login } from '../reducers/authentication';
import { useAppDispatch, useAppSelector } from "../state/hooks";


const HomePage = (props: any) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(AuthStore);
  console.log(data, 'userData')

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);
  
  return (
    <Layout {...props}>
      <p>This is Home page</p>
    </Layout>
  )
}

export default HomePage