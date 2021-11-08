import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 10000;
axios.interceptors.response.use( res => {
  return res.data
}, error => {
  return error
})
export default axios