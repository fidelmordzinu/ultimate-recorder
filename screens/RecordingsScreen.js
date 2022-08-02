import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { Audio, AVPlaybackStatus } from "expo-av";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white ">
        <View className="flex-2 p-5 w-full flex-row space-x-2">
          <Pressable
            className="flex-1"
            onPress={() => navigation.navigate("Home")}
          >
            <View className=" flex-row">
              <Icon name="arrow-back" type="material" color="black" size={30} />

              <Text className=" pl-2 text-lg">Ultimate Recorder</Text>
            </View>
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text>No recordings yet</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pressableLarge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 12,
    width: 100,
    height: 100,
  },
  pressableSmall: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    padding: 10,
    width: 60,
    height: 60,
  },
});
export default HomeScreen;
