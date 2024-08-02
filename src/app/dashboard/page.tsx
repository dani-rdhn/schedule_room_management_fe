import React from 'react'
import Dashboard from '@/components/dashboard';
import {auth} from '@/auth'

const DashboardPage = async () => {
  const session = await auth();

  return (
    <>
        {/* <div>Dashboard</div> */}
        <Dashboard />
        {/* {JSON.stringify(session?.user)} */}
    </>
  )
}

export default DashboardPage;