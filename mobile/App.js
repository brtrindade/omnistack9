import React from 'react';
import {StatusBar, YellowBox} from 'react-native';

import Routes from './src/routes';

StatusBar.setBackgroundColor('#fff');
StatusBar.setBarStyle('dark-content');

// YellowBox é a caixa de aviso que aparece :P
YellowBox.ignoreWarnings(['Unrecognized WebSocket', 'AsyncStorage']);

export default function App() {
  return <Routes />
}
