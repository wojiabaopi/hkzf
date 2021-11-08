import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Home from '../pages/home'
import Find from '../pages/find/index'
import News from '../pages/news/index'
import Mine from '../pages/mine/index'
import WholeRent from '../pages/home/child/wholeRent'
import Sharing from '../pages/home/child/sharing'
import Lease from '../pages/home/child/lease'
function Routers() {
  return (
    <>
    <Router>
      <Route path='/home' exact component={Home}></Route>
      <Route path='/find' exact component={Find}></Route>
      <Route path='/news' exact component={News}></Route>
      <Route path='/mine' exact component={Mine}></Route>
      <Redirect from='/*' to='/home'></Redirect>
      <Route path='/home/wholeRent' exact component={WholeRent}></Route>
      <Route path='/home/sharing' exact component={Sharing}></Route>
      <Route path='/home/lease' exact component={Lease}></Route>
    </Router>
    
    </>
  )
}
export default Routers