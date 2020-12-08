import { GET } from "./actionsType"

const getNews = (query: string = "", newSearch: boolean = false) => ({
  type: GET,
  payload: {
    query,
    newSearch,
  },
})

export default getNews
