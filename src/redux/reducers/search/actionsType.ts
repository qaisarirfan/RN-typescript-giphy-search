import { createActionName } from "../../utils"

export const reducerName = "search"

export const GET = createActionName(reducerName, "GET")
export const RECEIVED = createActionName(reducerName, "RECEIVED")
export const ERROR = createActionName(reducerName, "ERROR")
