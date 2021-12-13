import axios from 'axios'

const api = axios.create({
  baseURL: process.env.backendUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.tokenAuth,
  },
})

export default {
  listPlayers(player) {
    if (player) {
      return api.get(`v1/players?player=${player}`)
    } else {
      return api.get(`v1/players`)
    }
  },
  listPlayersByTeam(team) {
    if (team) {
      return api.get(`v1/team?team=${team}`)
    } else {
      return api.get(`v1/team`)
    }
  },
}
