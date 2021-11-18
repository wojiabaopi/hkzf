import React, { useContext} from 'react'
import myContextContext from '@/utils/createContext'
function Newest() {
  const  {newsList}  = useContext(myContextContext)
  console.log(newsList)
  return (
    <>
    <div className='news'>
      <h2 className='font17'>最新资讯</h2>
      {
        newsList.map( item => (
          <div className='newsDiv' key={item.id}>
            <div className='leftDiv'>
              <img src={item.imgSrc}></img>
            </div>
            <div className='rightDiv'>
              <div className='title'>
                {item.title}
              </div>
              <div className='desc'>
                <span>
                  {item.from}
                </span>
                <span>
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    </>
  )
}
export default React.memo(Newest)