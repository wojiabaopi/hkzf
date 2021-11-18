import React from 'react'
import TabBarList from '../../compontents/tabBar/index'
function Mine() {
  return (
    <div className='paddBtm'>
    <TabBarList></TabBarList>
    <div>我的</div>
    </div>
  )
}
export default React.memo(Mine)