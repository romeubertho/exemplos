import axios from 'axios'

const serverAPI = axios.create({
  baseURL: 'http://localhost:8080'
})

export default serverAPI
