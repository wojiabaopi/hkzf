import React from 'react'
import { useHistory } from 'react-router-dom'
import img1 from '@/assets/icon/img1.png'
import img2 from '@/assets/icon/img2.png'
import img3 from '@/assets/icon/img3.png'
import img4 from '@/assets/icon/img4.png'
function NavGiat() {
  const history = useHistory()
  const setPath = (value) => {
    history.push(value)
  }
  const navArr = [
    {
      title: '整租',
      icon: img1,
      path: '/home/wholeRent'
    },
    {
      title: '合租',
      icon: img2,
      path: '/home/sharing'
    },
    {
      title: '地图找房',
      icon: img3,
      path: '/find'
    },
    {
      title: '去出租',
      icon: img4,
      path: '/home/lease'
    },
  ]
  return (
    <div className='flexStyle1'>
      <div className='flexStyle2'>
        {
          navArr.map((item, index) => (
            <div onClick={ () => setPath(item.path)} className='flexStyle3' key={index}>
              <img alt='图片' className='imgStyle' src={item.icon}></img>
              <h3>{item.title}</h3>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default React.memo(NavGiat)