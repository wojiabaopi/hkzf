import React from 'react'
import TabBarList from '@/compontents/tabBar/index'
function News() {
  return (
    <div className='paddBtm'>
    <TabBarList></TabBarList>
    <div>资讯</div>
    </div>
  )
}
export default React.memo(News)