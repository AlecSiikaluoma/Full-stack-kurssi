import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

const vote = async (a) => {
	console.log(url + '/' + a.id)
	const response = await axios.put(url + '/' + a.id, { votes: a.votes + 1, content: a.content })
	return response.data
}

export default { getAll, createNew, vote }
