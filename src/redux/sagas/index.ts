/* eslint-disable no-param-reassign */
import { put, takeLatest, all, select } from "redux-saga/effects"
import { uniq, set, get } from "lodash"
import qs from "qs"
import { ERROR, GET, RECEIVED } from "../reducers/search/actionsType"
import { selectCurrentPage, selectNews } from "../reducers/search/selectors"
import { Entities, Get } from "../reducers/search/types"

function* fetchNews(action: Get) {
  const API_KEY = "v0zFcKCW00lCoAVsC1mVdXpLm8VcmHdZ"
  const {
    payload: { query, newSearch },
  } = action
  const prevData = yield select(selectNews)
  const prevCurrentPage = yield select(selectCurrentPage)
  const params = qs.stringify({
    api_key: API_KEY,
    q: query || "city",
    limit: 50,
    offset: newSearch ? 0 : prevCurrentPage + 50,
    rating: "g",
    lang: "en",
  })

  try {
    const json = yield fetch(
      `https://api.giphy.com/v1/gifs/search?${params}`
    ).then((response) => response.json())
    const currentPage = get(json, "pagination.offset", 0)

    // redux state normalization
    const entities = Object.values(json.data).reduce((obj: any, row: any) => {
      obj.ids = [...(obj.ids || []), row.id]
      set(obj, `data[${row.id}]`, {
        id: row?.id,
        title: row?.title,
        img: row?.images?.preview_gif?.url,
        preview: row?.images?.original?.url,
      })
      return obj
    }, {}) as Entities

    let ids = [...uniq([...prevData.ids, ...entities?.ids])]
    let data = { ...prevData.data, ...entities?.data }
    if (newSearch) {
      ids = [...entities?.ids]
      data = { ...entities?.data }
    }
    yield put({
      type: RECEIVED,
      payload: {
        entities: {
          ids,
          data,
        },
        currentPage,
      },
    })
  } catch (error) {
    yield put({
      type: ERROR,
      payload: error.message,
    })
  }
}

function* actionWatcher() {
  yield takeLatest(GET, fetchNews)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
}
