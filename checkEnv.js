require('dotenv').config()

const apiURL = process.env.REACT_APP_API_URL
const socketURL = process.env.REACT_APP_SOCKET_URL

if (!apiURL) {
  console.error('tidak ada key REACT_APP_API_URL pada .env, mohon tambahkan dahulu')
  process.exit(1)
}
if (!socketURL) {
  console.error('tidak ada key REACT_APP_SOCKET_URL pada .env, mohon tambahkan dahulu')
  process.exit(1)
}
