import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import RootStack from './src/navigation';
import { Splash } from './src/screens/Splash';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  return (
    <PaperProvider>
      {isAppReady ? <RootStack /> : <Splash onComplete={setAppReady} />}
    </PaperProvider>
  );
}
