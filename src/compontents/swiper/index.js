import React, { useContext } from 'react'
import { Swiper, Image } from 'antd-mobile'
import myContextContext from '../../utils/createContext'
function SwiperList() {
  const { imgUrl } = useContext(myContextContext)
  const items = imgUrl.map((item) => (
    <Swiper.Item key={item.id}>
      <Image src={item.imgSrc}></Image>
    </Swiper.Item>
  ))
  return (
    <Swiper indicatorProps={{
      color: 'white',
    }} autoplay>{items}</Swiper>
  )
}
export default SwiperList

