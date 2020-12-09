/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Platform,
} from "react-native"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import getNews from "./redux/reducers/search/actions"
import Items from "./components/Items"

const App = () => {
  const [query, setQuery] = useState("")

  const dispatch: Dispatch<any> = useDispatch()

  const fetchNews = React.useCallback(
    (val: string, newSearch: boolean) => dispatch(getNews(val, newSearch)),
    [dispatch]
  )

  const handleChange = () => {
    fetchNews(query, true)
  }

  useEffect(() => {
    fetchNews(query, false)
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleChange}
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
        </View>
        <Items
          onEndReached={() => fetchNews(query, false)}
          onRefresh={handleChange}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "rgb(18, 18, 18)",
  },
  searchBox: {
    backgroundColor: "rgb(18, 18, 18)",
    paddingTop: 12,
    paddingLeft: 6,
    paddingRight: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    fontSize: 13,
    borderRadius: 20,
    color: "#000",
    backgroundColor: "#fff",
    padding: 12,
    margin: 0,
    height: Platform.OS === "android" ? 50 : "auto",
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
  },
})

export default App
