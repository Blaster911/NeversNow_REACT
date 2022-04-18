import * as React from 'react';
import { StyleSheet } from 'react-native';
import Nav from './navigation/Navigation.js';
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("./assets/fonts/Roboto.ttf"),
      Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    console.disableYellowBox = true;
    if (this.state.loading) {
      return <ActivityIndicator style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }}/>;
    }
    return (
      <Nav />
    );
  }
}

const styles = StyleSheet.create({
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { padding: 15, paddingTop: 22 },
});
