import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_URL
axios.defaults.timeout = 10000;
axios.interceptors.response.use( res => {
  return res.data
}, error => {
  return error
})
export default axios