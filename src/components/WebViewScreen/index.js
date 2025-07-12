import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';

const WebViewScreen = ({route, navigation}) => {
  const {url} = route.params;

  return (
    <View style={styles.container}>
      {/* Optional: Add a back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.change}>Back</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{uri: url}}
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  webview: {
    flex: 1,
  },

  change: {
    fontSize: 13,
    fontFamily: Fonts.MEDIUM,
    color: Colors.PRIMARY,
  },
});

export default WebViewScreen;
