import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Audio, Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

import Player from "./Player";
import { setAudioModeAsync } from "expo-av/build/Audio";

export default function App() {
  const [audio, setarAudio] = useState(null);
  const [musicas, setarMusicas] = useState([
    {
      id: 1,
      nome: "vai vendo",
      artista: "Lucas Lucco",
      playing: false,
      file: require("./assets/vai-vendo.mp3"),
      activeSound: false,
    },
    {
      id: 2,
      nome: "saudade idiota",
      artista: "Lucas Lucco",
      playing: false,
      file: require("./assets/saudade-idiota.mp3"),
      activeSound: false,
    },
    {
      id: 3,
      nome: "Café",
      artista: "Vitão",
      playing: false,
      file: null,
      activeSound: false,
    },
    {
      id: 4,
      nome: "Um pouco de você",
      artista: "Vitão",
      playing: false,
      file: null,
      activeSound: false,
    },
    {
      id: 5,
      nome: "vai vendo",
      artista: "Lucas Lucco",
      playing: false,
      file: require("./assets/vai-vendo.mp3"),
      activeSound: false,
    },
    {
      id: 6,
      nome: "saudade idiota",
      artista: "Lucas Lucco",
      playing: false,
      file: require("./assets/saudade-idiota.mp3"),
      activeSound: false,
    },
    {
      id: 7,
      nome: "Café",
      artista: "Vitão",
      playing: false,
      file: null,
      activeSound: false,
    },
    {
      id: 8,
      nome: "Um pouco de você",
      artista: "Vitão",
      playing: false,
      file: null,
      activeSound: false,
    },
  ]);

  const togglePauseMusic = async (musicaStop) => {
    let changeMusica = musicas[musicas.indexOf(musicaStop)];

    await pauseMusic(changeMusica.activeSound);

    changeMusica.activeSound = !changeMusica.activeSound;
    let newMusicas = musicas;
    setarMusicas(newMusicas);
  };

  const pauseMusic = async (status) => {
    if (!status) {
      await audio.pauseAsync();
    } else {
      await audio.playAsync();
    }
    return true;
  };

  const activeMusic = async (musica) => {
    await desabledAudio();

    let newMusicas = musicas.map((item) => {
      if (musica.id == item.id) {
        changeStatusMusic(item, true);
        changeStatusMusicPause(item, true);
        playMusic(item);
      } else {
        changeStatusMusic(item, false);
      }
      return item;
    });

    setarMusicas(newMusicas);
  };

  const desabledAudio = async () => {
    if (audio != null) {
      await audio.unloadAsync();
      setarAudio(null);
    }
  };

  const changeStatusMusic = (musica, status) => {
    musica.playing = status;
  };

  const changeStatusMusicPause = (musica, status) => {
    musica.activeMusic = status;
    return musica;
  };

  const playMusic = async (musica) => {
    let file = musica.file;
    let playAudio = new Audio.Sound();

    if (file != null) {
      await playAudio.loadAsync(file);
      await playAudio.playAsync();
      setarAudio(playAudio);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" hidden />
        <View style={styles.header}>
          <Text style={styles.headerText}>App Music</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.tableContent}>Música</Text>
          <Text style={styles.tableContent}>Artista</Text>
        </View>
        {musicas.map((musica) => {
          if (musica.playing) {
            return (
              <View style={styles.table} key={musica.id}>
                <TouchableOpacity
                  style={{ width: "100%", flexDirection: "row" }}
                  onPress={() => togglePauseMusic(musica)}
                >
                  <Text style={styles.tableContentPlaylistActive}>
                    <AntDesign name="sound" size={15} /> {musica.nome}
                  </Text>
                  <Text style={styles.tableContentPlaylistActive}>
                    {musica.artista}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.table} key={musica.id}>
                <TouchableOpacity
                  style={{ width: "100%", flexDirection: "row" }}
                  onPress={() => activeMusic(musica)}
                >
                  <Text style={styles.tableContentPlaylist}>
                    {" "}
                    <AntDesign name="play" size={15} /> {musica.nome}
                  </Text>
                  <Text style={styles.tableContentPlaylist}>
                    {musica.artista}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <Player musicas={musicas} activeMusic={activeMusic}></Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    backgroundColor: "#299425",
    width: "100%",
    padding: 26,
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
  },
  table: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 20,
  },
  tableContent: {
    color: "rgb(200,200,200)",
    width: "50%",
  },
  tableContentPlaylist: {
    color: "white",
    width: "50%",
  },
  tableContentPlaylistActive: {
    color: "#299425",
    width: "50%",
  },
});
