import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { COLORS } from './src/theme';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
