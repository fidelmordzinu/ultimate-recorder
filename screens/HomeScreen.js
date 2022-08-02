import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

const HomeScreen = ({ navigation }) => {
  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [RecordedURI, SetRecordedURI] = useState("");
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPausing, SetIsPausing] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);

  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    if (getAudioPerm.granted) {
      console.log("Permision granted");
      SetAudioPermission(getAudioPerm.granted);
    }
  };

  async function startRecording() {
    try {
      if (!IsRecording) {
        if (AudioPermission === true) {
          try {
            // Prepare the Audio Recorder
            await AudioRecorder.current.prepareToRecordAsync(
              Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            // Start recording
            await AudioRecorder.current.startAsync();
            SetIsRecording(true);
          } catch (error) {
            console.log(error);
          }
        } else {
          // If user has not given the permission to record, then ask for permission
          GetPermission();
        }
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function pausingRecording() {
    console.log("Pausing recording..");
    await AudioRecorder.current.pauseAsync();
    SetIsPausing(true);
    console.log(
      "Recording paused",
      await AudioRecorder.current.getStatusAsync()
    );
  }

  async function saveFile(uri) {
    const folder_path = FileSystem.documentDirectory + "UltimateRecorder/";
    const folder_info = await FileSystem.getInfoAsync(folder_path);
    const createFolder = async () => {
      if (!folder_info.exists) {
        try {
          await FileSystem.makeDirectoryAsync(folder_path, {
            intermediates: true,
          });
        } catch (error) {}
      }
    };

    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      createFolder();
      const fileName = uri.split("/")[uri.split("/").length - 1];
      const setTheFile = folder_path + fileName + "/";

      await FileSystem.moveAsync({
        from: uri,
        to: folder_path,
      }).then((i) => {
        setImage(setTheFile);
        handlePickedImage(setTheFile);
      });
      console.log(uri.split("/")[uri.split("/").length - 1]);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) SetRecordedURI(result);
      saveFile(result);
      console.log("Stopped recording..");
      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      SetIsRecording(false);
    } catch (error) {}
  }

  async function cancelRecording() {
    try {
      console.log("Cancel recording..");
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();
      SetRecordedURI("");
      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      SetIsRecording(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const playerStatus = await AudioPlayer.current.getStatusAsync();
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === true) {
          AudioPlayer.current.pauseAsync();
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white ">
        <View className="flex-2 p-5 justify-end w-full flex-row space-x-2">
          <Icon name="more-vert" type="material" color="black" size={30} />
        </View>
        <View className="flex-1 ">
          <View className="flex-1 justify-center items-center">
            <Text>{RecordedURI}</Text>
            <Text className=" text-6xl text-gray-400">00:00:00</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Pressable
              onPress={IsRecording ? pausingRecording : startRecording}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "red" : "#133132d1",
                },
                styles.pressableLarge,
              ]}
            >
              <View className="bg-red-600 flex-1 w-full h-full rounded-full justify-center items-center">
                <Icon
                  name={IsRecording ? "pause" : "microphone"}
                  type="font-awesome"
                  color="white"
                  size={35}
                />
              </View>
            </Pressable>
          </View>
        </View>
        {IsRecording ? (
          <View className="flex-2 flex-row w-full h-20 items-center space-x-12 px-5">
            <Pressable
              onPress={cancelRecording}
              style={({ pressed }) => [{}, styles.pressableSmall2]}
              className="flex-row space-y-1"
            >
              <Icon name="cross" type="entypo" color="red" size={35} />
              <Text className=" text-base">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={stopRecording}
              style={({ pressed }) => [{}, styles.pressableSmall2]}
            >
              <View className=" bg-gray-600 rounded-full p-4">
                <Icon name="checkmark" type="ionicon" color="green" size={25} />
              </View>
            </Pressable>
          </View>
        ) : (
          <View className="flex-2 flex-row w-full h-20 items-center justify-end pr-6">
            <Pressable onPress={() => navigation.navigate("Recordings")}>
              <View className="flex-row space-x-2">
                <Icon
                  name="library-music"
                  type="material"
                  color="black"
                  size={25}
                />
                <Text className="text-black text-lg">Recordings</Text>
              </View>
            </Pressable>
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
    width: 60,
    height: 60,
  },
  pressableSmall2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
});
export default HomeScreen;
