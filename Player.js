import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function Player(props) {
  const [activeSong, setarActiveSong] = useState(false);

  const activePlay = () => {
    setarActiveSong(!activeSong);
    let hasSong = false;
    // console.log(props.musicas);
    props.musicas.map((item, index) => {
      if (item.playing) {
        hasSong = true;
        return props.activeMusic(props.musicas[index]);
      }
    });

    if (!hasSong) {
      hasSong = false;
      return props.activeMusic(props.musicas[0]);
    }
  };

  return (
    <View style={styles.player}>
      <TouchableOpacity style={styles.icons}>
        <AntDesign name="banckward" size={35} color="white" />
      </TouchableOpacity>
      {activeSong ? (
        <TouchableOpacity style={styles.icons}>
          <AntDesign
            name="pausecircleo"
            size={35}
            color="white"
            onPress={() => activePlay()}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.icons} onPress={() => activePlay()}>
          <AntDesign name="playcircleo" size={35} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.icons}>
        <AntDesign name="forward" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icons: {
    marginLeft: 20,
    marginRight: 20,
  },
});
