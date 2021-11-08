import { Badge, TabBar } from 'antd-mobile'
import React, { useState } from 'react'
import {
  useHistory,
  useLocation,
} from 'react-router-dom'
import {
  AppOutline,
  SearchOutline,
  UserOutline,
  ContentOutline,
} from 'antd-mobile-icons'

function TabBarList() {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const setRouteActive = (value) => {
    history.push(value)
  }
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/find',
      title: '找房',
      icon: <SearchOutline />,
      badge: '5',
    },
    {
      key: '/news',
      title: '资讯',
      icon: <ContentOutline/>,
      badge: '99+',
    },
    {
      key: '/mine',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <div className='fixBtm'>
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)} noRenderContent={true}>
          {tabs.map(item => (
            <TabBar.Item  key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
    </div>
  )
}
export default TabBarList