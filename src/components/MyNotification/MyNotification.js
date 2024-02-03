import React, {useEffect} from 'react'
import {notification} from 'antd'

export default function MyNotification(notiMsg) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(()=>{
    // if type is valid, open the notification
    if(notiMsg.type){
      api[notiMsg.description]({
        message: 'System notification',
        description: notiMsg.description
      })
    }
  }, [notiMsg])
  return (
    <>
      {contextHolder}
    </>
  )
}