import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { Audio, AVPlaybackStatus } from "expo-av";

const HomeScreen = ({ navigation }) => {
  const [recording, setRecording] = React.useState();
  const [pausing, setPausing] = React.useState(true);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setPausing(false);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopPausing() {
    console.log("Pausing recording..");
    await recording.pauseAsync();
    setPausing(true);
    console.log("Recording paused", await recording.getStatusAsync());
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }
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
