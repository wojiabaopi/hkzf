import React from 'react'
import TabBarList from '../../compontents/tabBar/index'
import { NavBar, Input } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { DownFill, SearchOutline } from 'antd-mobile-icons'
import location from '@/assets/icon/location2.png'
import './index.scss'
function Find() {
  const history = useHistory()
  let curCity = JSON.parse(localStorage.getItem('currentCity')).label
  const right = (
    <div onClick={() => history.push('/mapFindRoom')} className='rightLocation2'>
      <img alt='本地' src={location}></img>
    </div>
  )
  const left = (
    <div onClick={() => history.push('/cityList')} className='leftDiv2'>
      <span>{curCity}</span>
      <DownFill className='cityIcon' />
      <span>|</span>
    </div>
  )
  return (
    <div style={{ paddingTop: '45px' }}>
      <NavBar left={left} right={right} style={{ backgroundColor: '#f4f4f4', marginTop: '-45px' }}
        onBack={() => history.back()}>
        <div  className='centerSearch2'>
          <SearchOutline className='searchIcon' />
          <Input placeholder='请输入小区或地址'></Input>
        </div>
      </NavBar>
      <div className='paddBtm'>
        <TabBarList></TabBarList>
      </div>
    </div>
  )
}
export default React.memo(Find)