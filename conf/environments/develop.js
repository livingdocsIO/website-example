module.exports = {
  client: {
    url: process.env.client__url || 'http://localhost:3001',
    accessToken: process.env.client__token || 'your access token'
  }
}
