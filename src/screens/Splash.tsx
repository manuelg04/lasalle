import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { hideAsync } from 'expo-splash-screen';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  onComplete: (status: boolean) => void;
};
export function Splash({ onComplete }: Props) {
  const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        hideAsync();
      }
      if (status.didJustFinish) {
        onComplete(true);
      }
    }
  }
  return (
    <Video
      resizeMode={ResizeMode.COVER}
      source={require('../../assets/misionMatematica.mp4')}
      shouldPlay
      isLooping={false}
      style={StyleSheet.absoluteFill}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
    />
  );
}
