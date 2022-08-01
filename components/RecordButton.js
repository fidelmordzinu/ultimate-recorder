import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const RecordButton = () => {
  return (
    <View>
      <Pressable
        onPress={() => console.log("hello")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "red" : "#133132d1",
          },
          styles.wrapperCustom,
        ]}
      >
        <View className="bg-red-600 flex-1 w-full h-full rounded-full justify-center items-center">
          <Icon name="microphone" type="font-awesome" color="white" size={35} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperCustom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 12,
    width: 100,
    height: 100,
  },
});
export default RecordButton;
