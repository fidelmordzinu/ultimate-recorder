import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text className="text-red-400">
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
