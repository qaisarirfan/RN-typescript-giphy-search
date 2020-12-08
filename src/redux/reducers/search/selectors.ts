import { searchState } from "./types"

export const selectNews = (state: searchState) => state.entities
export const selectLoader = (state: searchState) => state.loading
export const selectCurrentPage = (state: searchState) => state.currentPage
export const selectError = (state: searchState) => state.error
