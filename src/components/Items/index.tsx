import { isEqual } from "lodash"
import React, { memo, useCallback, useState } from "react"
import {
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  View,
  ActivityIndicator,
  Modal,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import { useSelector } from "react-redux"
import { selectLoader, selectNews } from "../../redux/reducers/search/selectors"
import { news } from "../../redux/reducers/search/types"

const Item: React.FC<{
  img: string
  openPopup: Function
}> = ({ img, openPopup }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => openPopup()}>
    <Image
      source={{ uri: img }}
      resizeMode="cover"
      style={{ width: "100%", height: 120 }}
    />
  </TouchableOpacity>
)

function itemEq(prevItem: {}, nextItem: {}) {
  return isEqual(prevItem, nextItem)
}

const MemoizedItem = memo(Item, itemEq)

const Items: React.FC<{ onRefresh: Function; onEndReached: Function }> = ({
  onRefresh,
  onEndReached,
}) => {
  const defaultVal = {
    id: "",
    title: "",
    preview: "",
    img: "",
  }
  const { width, height } = Dimensions.get("window")

  const [showPopup, setShowPopup] = useState(false)
  const [selected, setSelected] = useState<news>(defaultVal)
  const { ids, data }: any = useSelector(selectNews)
  const loader: boolean = useSelector(selectLoader)

  const openPopup = (id: string) => {
    setShowPopup(true)
    setSelected(data[id])
  }

  const closePopup = () => {
    setShowPopup(false)
    setSelected(defaultVal)
  }

  const renderFooter = () => {
    if (!loader) return null

    return (
      <View
        style={{
          position: "relative",
          width,
          height,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  return (
    <>
      <FlatList
        contentContainerStyle={{
          paddingTop: 12,
          backgroundColor: "rgb(18, 18, 18)",
        }}
        numColumns={2}
        data={ids}
        renderItem={({ item }) => {
          const { img } = data[item] ?? {}
          return <MemoizedItem img={img} openPopup={() => openPopup(item)} />
        }}
        keyExtractor={useCallback((item) => item, [])}
        onEndReached={() => onEndReached()}
        onRefresh={() => onRefresh()}
        onEndReachedThreshold={0.5}
        refreshing={loader}
        ListFooterComponent={renderFooter}
        getItemLayout={useCallback(
          (val, index) => ({
            length: 120,
            offset: 120 * index,
            index,
          }),
          []
        )}
      />
      <Modal
        animationType="slide"
        visible={showPopup}
        onRequestClose={() => closePopup()}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.modelWrapper}>
            {selected?.preview && (
              <>
                <View style={styles.header}>
                  {selected?.title && <Text>{selected?.title}</Text>}
                  <TouchableOpacity
                    onPress={closePopup}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>&times;</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: selected.preview }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modelWrapper: {
    padding: 12,
  },
  closeButton: {
    backgroundColor: "red",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 44,
  },
})

export default Items
