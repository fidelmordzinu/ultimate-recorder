import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import RecordButton from "../components/RecordButton";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center bg-stone-800 ">
        <View className="flex-2 p-5 items-end justify-end w-full flex-row space-x-2">
          <Icon name="access-time" type="material" color="white" size={30} />
          <Icon name="more-vert" type="material" color="white" size={30} />
        </View>
        <View className="flex-1 ">
          <View className="flex-1 justify-center items-center">
            <Text className=" text-6xl text-gray-300">00:00:00</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <RecordButton />
          </View>
        </View>
        <View className="flex-2 p-5 items-end justify-end flex-row w-full space-x-2">
          <Icon name="library-music" type="material" color="white" size={25} />
          <Text className="text-white text-lg">Recordings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
