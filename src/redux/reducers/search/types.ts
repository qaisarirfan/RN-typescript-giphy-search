import { GET, RECEIVED } from "./actionsType"

export interface news {
  id: string
  title: string
  img: string
  preview: string
}

export type Entities = {
  data: {}
  ids: []
}

export type searchState = {
  loading: boolean
  entities: Entities
  currentPage: number
  error: string
}

export type GetPayload = {
  query: string
  newSearch: boolean
}

export type ReceivedPayload = {
  currentPage: number
  entities: Entities
}

export interface Get {
  type: typeof GET
  payload: GetPayload
}

export interface Received {
  type: typeof RECEIVED
  payload: ReceivedPayload
}

export interface ActionTypes {
  type: string
  payload: any
}
