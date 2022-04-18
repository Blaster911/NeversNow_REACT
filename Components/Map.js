import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions, Platform, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-navigation';
import { Toolbar } from 'react-native-material-ui';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Home from '../Home/Home.js';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonSearchPress: false,
      buttonLeftPressColor: "white",
      inputColorSearch: "white",
      location : null,
      region: null,
      errorMessage: null,
      wifi: [],
      pmr: [],
      wc: [],
      resto: [],
      monu: [],
      smonu: [],
      sresto: [],
      search: ''
    };

    this._getLocationAsync();

    if (this.props.navigation.state.params.wifi && this.state.wifi.length == 0) this._getWifi(); else if (!this.props.navigation.state.params.wifi && this.state.wifi.length != 0) this.setState({wifi: []});

    if (this.props.navigation.state.params.pmr && this.state.pmr.length == 0) this._getPmr(); else if (!this.props.navigation.state.params.pmr && this.state.pmr.length != 0) this.setState({pmr: []});

    if (this.props.navigation.state.params.wc && this.state.wc.length == 0) this._getWc(); else if (!this.props.navigation.state.params.wc && this.state.wc.length != 0) this.setState({wc: []});

    if (this.props.navigation.state.params.resto && this.state.resto.length == 0) this._getResto(); else if (!this.props.navigation.state.params.resto && this.state.resto.length != 0) this.setState({resto: []});

    if (this.props.navigation.state.params.monu && this.state.monu.length == 0) this._getMonu(); else if (!this.props.navigation.state.params.monu && this.state.monu.length != 0) this.setState({monu: []});
  }
  static navigationOptions = {
    drawerLabel: 'Map',
  };

  _getWifi() {
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getWifi', { headers: { "app": "neversNow" }})
      .then((response) => { return response.json() })
      .then((responseJson) => { this.setState({wifi: responseJson}) })
      .catch((error) => { console.error(error) });
  }
  _getPmr() {
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getPmr', { headers: { "app": "neversNow" }})
      .then((response) => { return response.json() })
      .then((responseJson) => { this.setState({pmr: responseJson}) })
      .catch((error) => { console.error(error) });
  }
  _getWc() {
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getWc', { headers: { "app": "neversNow" }})
      .then((response) => { return response.json() })
      .then((responseJson) => { this.setState({wc: responseJson}) })
      .catch((error) => { console.error(error) });
  }
  _getResto() {
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getResto', { headers: { "app": "neversNow" }})
      .then((response) => { return response.json() })
      .then((responseJson) => {
        this.setState({resto: responseJson, sresto: []})
      })
      .catch((error) => { console.error(error) });
  }
  _getMonu() {
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getMonu', { headers: { "app": "neversNow" }})
      .then((response) => { return response.json() })
      .then((responseJson) => {
        this.setState({monu: responseJson, smonu: []});
      })
      .catch((error) => { console.error(error) });
  }

  _searchMonu(){
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getSearchMonu?search=' + this.state.search, { headers: { "app": "neversNow" }})
        .then((response) => { return response.json() })
        .then((responseJson) => { this.setState({smonu: responseJson}) })
        .catch((error) => { console.error(error) });
  }
  _searchResto(){
    return fetch('https://thomasg.promo-29.codeur.online/apiNeversNow/public/getSearchResto?search=' + this.state.search, { headers: { "app": "neversNow" }})
        .then((response) => { return response.json() })
        .then((responseJson) => { this.setState({sresto: responseJson}) })
        .catch((error) => { console.error(error) });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;

    const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    this.setState({ location });
  };

  componentDidUpdate(){
    if (this.props.navigation.state.params.wifi && this.state.wifi.length == 0) this._getWifi(); else if (!this.props.navigation.state.params.wifi && this.state.wifi.length != 0) this.setState({wifi: []});

    if (this.props.navigation.state.params.pmr && this.state.pmr.length == 0) this._getPmr(); else if (!this.props.navigation.state.params.pmr && this.state.pmr.length != 0) this.setState({pmr: []});

    if (this.props.navigation.state.params.wc && this.state.wc.length == 0) this._getWc(); else if (!this.props.navigation.state.params.wc && this.state.wc.length != 0) this.setState({wc: []});

    if (this.props.navigation.state.params.resto && this.state.resto.length == 0) this._getResto(); else if (!this.props.navigation.state.params.resto && this.state.resto.length != 0) this.setState({resto: []});

    if (this.props.navigation.state.params.monu && this.state.monu.length == 0) this._getMonu(); else if (!this.props.navigation.state.params.monu && this.state.monu.length != 0) this.setState({monu: []});
  }

  render() {
    return (
      <View style={styles.container}>
      {Platform.OS === 'ios' &&  <View style={{height: 16, backgroundColor: '#302743'}} />}
         <Toolbar
          navigation={this.props.navigation}
          leftElement="home"
          onLeftElementPress={ () => {this.props.navigation.navigate('Home')}}
          centerElement="Map"
          style={{
            container: { backgroundColor: '#302743', height: 60},
            leftElement: { color: this.state.buttonLeftPressColor },
            titleText: {  color: this.state.inputColorSearch, letterSpacing: 1.6, alignSelf: 'center' },
            rightElement: { color: 'white'}
          }}
          searchable={{
            color: "black",
            autoFocus: true,
            placeholder: 'Rechercher',
            onSubmitEditing:() => {
              this._clean();
              this._searchMonu();
              this._searchResto();
              this.props.navigation.state.params.search();
            },
            onChangeText: (text) => { this.setState({search: text})},
            onSearchClosed: () => {if (this.state.buttonSearchPress == true){
              this.setState({
                buttonLeftPressColor: "white",
                buttonSearchPress: false,
                inputColorSearch: "white",
              });
            }},
            onSearchPressed: () => {if(this.state.buttonSearchPress == false){
              this.setState({
                buttonSearchPress: true,
                buttonLeftPressColor: "lightgrey",
                inputColorSearch: "#302743",
              });
            }}
          }}
        />
        <View style={styles.header}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation
            initialRegion={{
              latitude: 46.9896,
              longitude: 3.159,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >

          { this.state.pmr.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.longitude), longitude: Number(marker.latitude)}} title='PMR' key={marker.id} pinColor={'#00aacd'}/> }) }

          { this.state.wc.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.longitude), longitude: Number(marker.latitude)}} title={marker.rue} key={marker.id} pinColor={'#ef5a27'}/> }) }

          { this.state.wifi.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.longitude), longitude: Number(marker.latitude)}} title={marker.rue} key={marker.id} pinColor={'#5d328f'}/> }) }

          { this.state.resto.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude)}} title={marker.nom} key={marker.id} pinColor={'#ad54a0'}/> }) }

          { this.state.monu.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude)}} title={marker.nom} key={marker.id} pinColor={'#73bf46'}/> }) }

          { this.state.sresto.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude)}} title={marker.nom} key={marker.id} pinColor={'#ad54a0'}/> }) }

          { this.state.smonu.map(marker => { return <MapView.Marker coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude)}} title={marker.nom} key={marker.id} pinColor={'#73bf46'}/> }) }

          </MapView>
          {/*}<ActionButton style={styles.containerButtonFloat} buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#ef5a27' title="Toilettes" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#5d328f' title="Wifi" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>*/}
        </View>
        <TouchableOpacity style={styles.clean} onPress={() => this._clean() }>
          <Image style={styles.image} source={require('../assets/icons/remove-location.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

  _clean() {
    this.props.navigation.state.params.reset();
    this.props.navigation.state.params.wifi = false;
    this.props.navigation.state.params.pmr = false;
    this.props.navigation.state.params.wc = false;
    this.props.navigation.state.params.resto = false;
    this.props.navigation.state.params.monu = false;
    this.setState({ wifi: [], pmr: [], wc: [], resto: [], monu: [], sresto: [], smonu: [] });
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 0,
    paddingTop: 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1
  },
  clean: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'flex-end',
    bottom:0,
    padding: 16
  },
  image: {
    width: 50,
    height: 50
  }
});
