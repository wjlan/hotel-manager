import React, {useEffect} from 'react'
import {notification} from 'antd'

export default function MyNotification(type='info', message='system notification', description) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(()=>{
    api[type]({
      message,
      description
    })

  }, [])
  return (
    <>
      {contextHolder}
    </>
  )
}