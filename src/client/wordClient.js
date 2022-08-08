import axios from 'axios'
const baseUrl = '/api/words'

const getAll = () => {
  return axios.get(baseUrl).then(result => result.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(result => result.data)
}

const remove = deleteId => {
  return axios.delete(baseUrl + '/' +deleteId).then(result => result.data)

}


export default { 
  getAll: getAll, 
  create: create,
  remove: remove
}