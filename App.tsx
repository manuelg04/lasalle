import 'react-native-gesture-handler';
import React, { useState } from 'react'

import RootStack from './src/navigation';
import { Splash } from './src/screens/Splash';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  return isAppReady ? <RootStack /> : <Splash onComplete={setAppReady} />;
}
