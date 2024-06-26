import React,{useEffect} from 'react'
import {notification} from 'antd'

export default function MyNotification({notiMsg}) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(()=>{
    // if type is valid, open the notification
    if(notiMsg.type){
      api[notiMsg.type]({
        message:'System Notification',
        description:notiMsg.description,
        duration:2,
        placement:'bottomRight'
      })
    }
  },[notiMsg])
  return (
    <>
      {contextHolder}
    </>
  )
}