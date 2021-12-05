import React, { useContext } from 'react'
import { Swiper, Image } from 'antd-mobile'
import myContextContext from '@/utils/createContext'
import { DownFill, SearchOutline } from 'antd-mobile-icons'
import location from '@/assets/icon/location.png'
import { useHistory } from 'react-router-dom'
function SwiperList() {
  let { imgUrl } = useContext(myContextContext)
  if (imgUrl.length === 0) {
    imgUrl.push(1)
    imgUrl.push(2)
  }
  const { city } = useContext(myContextContext)
  const history = useHistory()
  const items = imgUrl.map((item, index) => (
    <Swiper.Item key={index}>
      <Image src={item.imgSrc}></Image>
    </Swiper.Item>
    
  ))
  return (
    <div className='swiperOut'>
      <Swiper  indicatorProps={{
        color: 'white',
      }} autoplay>{items}
      </Swiper>
      <div className='searchBox'>
        <div onClick={() => history.push('/cityList')} className='leftCity'>
          <h4>{city}</h4>
          <DownFill className='cityIcon' />
          <span>|</span>
        </div>
        <div onClick={() => history.push('/searchPage')} className='centerSearch'>
          <SearchOutline className='searchIcon' />
          <span>请输入小区或地址</span>
        </div>
        <div onClick={() => history.push('/mapFindRoom')} className='rightLocation'>
          <img alt='本地' src={location}></img>
        </div>
      </div>
    </div>
  )
}
export default React.memo(SwiperList)

