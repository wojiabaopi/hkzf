import React, { useContext } from "react"
import myContextContext from '@/utils/createContext'
function RentGroups() {
  const { rentGroupsList } = useContext(myContextContext)
  return (
    <>
      <div className='rentFather'>
        <div className='rentDiv1'>
          <h2 className='rentGroup'>租房小组</h2>
          <span>更多</span>
        </div>
        <div className='rentDiv2'> {
          rentGroupsList.map((item, index) => (
              <div  key={index} className='rentItem'>
                <div className='leftRent' >
                  <div className='title'>{item.title}</div>
                  <div className='desc'>{item.desc}</div>
                </div>
                <div className='rightRent'>
                  <img alt='图片' className='rentImg' src={item.imgSrc}></img>
                </div>
              </div>
          ))
        } </div>
      </div>
    </>
  )
}

export default React.memo(RentGroups)