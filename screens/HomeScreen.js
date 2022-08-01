import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { Audio, AVPlaybackStatus } from "expo-av";

const HomeScreen = () => {
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
      <View className="flex-1 justify-center items-center bg-white ">
        <View className="flex-2 p-5 items-end justify-end w-full flex-row space-x-2">
          <Icon name="access-time" type="material" color="white" size={30} />
          <Icon name="more-vert" type="material" color="white" size={30} />
        </View>
        <View className="flex-1 ">
          <View className="flex-1 justify-center items-center">
            <Text className=" text-6xl text-gray-300">00:00:00</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Pressable
              onPress={recording ? stopPausing : startRecording}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "red" : "#133132d1",
                },
                styles.pressableLarge,
              ]}
            >
              <View className="bg-red-600 flex-1 w-full h-full rounded-full justify-center items-center">
                <Icon
                  name={!pausing ? "pause" : "microphone"}
                  type="font-awesome"
                  color="white"
                  size={35}
                />
              </View>
            </Pressable>
            {recording ? (
              <View className="flex-row justify-around w-full">
                <Pressable
                  onPress={stopRecording}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "red" : "#133132d1",
                    },
                    styles.pressableSmall,
                  ]}
                >
                  <Icon
                    name="play"
                    type="font-awesome"
                    color="white"
                    size={24}
                  />
                </Pressable>
                <Pressable
                  onPress={stopRecording}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "red" : "#133132d1",
                    },
                    styles.pressableSmall,
                  ]}
                >
                  <Icon
                    name="square"
                    type="font-awesome"
                    color="white"
                    size={24}
                  />
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>
        {recording ? null : (
          <View className="flex-2 p-5 justify-end flex-row w-full ">
            <View className="flex-row space-x-2">
              <Icon
                name="library-music"
                type="material"
                color="black"
                size={25}
              />
              <Text className="text-black text-lg">Recording</Text>
            </View>
          </View>
        )}
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
