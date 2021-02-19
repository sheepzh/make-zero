/**
 * @since 1.2.1 
 */
import axios from 'axios'

// create an axios instance
const baseURL = process.env.BASE_URL_API
// console.log(baseURL)
const service = axios.create({
  baseURL,
  timeout: 60000 // request timeout
})

export default service
