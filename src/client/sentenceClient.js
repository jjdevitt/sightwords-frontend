import axios from 'axios'
const baseUrl = (process.env.NODE_ENV==='development' ? 'http://localhost:3001/sentences' :'/api/sentences')  

const getSentence = word => {
  let request = baseUrl + '/' + word;
  console.log('sending request=>', request)
  return axios.get(request).then(result => result.data.sentence)
}

export default getSentence