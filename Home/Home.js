import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Toolbar, COLOR } from 'react-native-material-ui';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLeftPressColor: "white",
      inputColorSearch: "white",
      wifi: false,
      pmr: false,
      wc: false,
      resto: false,
      monu: false
    };
  }

  resetAll = () => { this.setState({wifi: false,  pmr: false, wc: false, resto: false, monu: false}) }
  search = () => { this.setState({wifi: false,  pmr: false, wc: false, resto: true, monu: true}) }

  _activeWifi() {
    this.setState({wifi: !this.state.wifi});
    this.props.navigation.navigate('Map', {
      wifi: !this.state.wifi,
      pmr: this.state.pmr,
      wc: this.state.wc,
      resto: this.state.resto,
      monu: this.state.monu,
      reset: this.resetAll.bind(this),
      search: this.search.bind(this)
    });
  }
  _activePmr() {
    this.setState({pmr: !this.state.pmr});
    this.props.navigation.navigate('Map', {
      wifi: this.state.wifi,
      pmr: !this.state.pmr,
      wc: this.state.wc,
      resto: this.state.resto,
      monu: this.state.monu,
      reset: this.resetAll.bind(this),
      search: this.search.bind(this)
    })
  }
  _activeWc() {
    this.setState({wc: !this.state.wc});
    this.props.navigation.navigate('Map', {
      wifi: this.state.wifi,
      pmr: this.state.pmr,
      wc: !this.state.wc,
      resto: this.state.resto,
      monu: this.state.monu,
      reset: this.resetAll.bind(this),
      search: this.search.bind(this)
    })
  }
  _activeResto() {
    this.setState({resto: !this.state.resto});
    this.props.navigation.navigate('Map', {
      wifi: this.state.wifi,
      pmr: this.state.pmr,
      wc: this.state.wc,
      resto: !this.state.resto,
      monu: this.state.monu,
      reset: this.resetAll.bind(this),
      search: this.search.bind(this)
    })
  }
  _activeMonu() {
    this.setState({monu: !this.state.monu});
    this.props.navigation.navigate('Map', {
      wifi: this.state.wifi,
      pmr: this.state.pmr,
      wc: this.state.wc,
      resto: this.state.resto,
      monu: !this.state.monu,
      reset: this.resetAll.bind(this),
      search: this.search.bind(this)
    })
  }

  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
      {Platform.OS === 'ios' &&  <View style={{height: 16, backgroundColor: '#302743'}} />}
          <Toolbar
            leftElement="map"
            onLeftElementPress={ () => {this.props.navigation.navigate('Map', {
              wifi: this.state.wifi,
              pmr: this.state.pmr,
              wc: this.state.wc,
              resto: this.state.resto,
              monu: this.state.monu,
              reset: this.resetAll.bind(this),
              search: this.search.bind(this)
            })}}
            centerElement="Home"
            style={{
                container: { backgroundColor: '#302743' ,height: 60, },
                leftElement: { color: this.state.buttonLeftPressColor },
                titleText: { color: this.state.inputColorSearch, letterSpacing: 1.6, alignSelf: 'center'},
                rightElement: { color: 'white' },
                padding: 0
            }}
            rightElement=<Image
            style={styles.logotop}
              source={require('../assets/icons/logo_white.png')}
            />

          />
        <ScrollView>
          <TouchableOpacity style={styles.containerImg} onPress={() => this.props.navigation.navigate('Map', {
            wifi: this.state.wifi,
            pmr: this.state.pmr,
            wc: this.state.wc,
            resto: this.state.resto,
            monu: this.state.monu,
            reset: this.resetAll.bind(this),
            search: this.search.bind(this)
          })}>
            <Image
              style={styles.imageMap}
              source={require('../assets/icons/map2.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.header} onPress={() => this._activePmr()}>
            <Image
              style={styles.image}
              source={require('../assets/icons/handiaccess.png')}
            />
            <Text style={styles.text}>
               Places de parking PMR
             </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.header} onPress={() => this._activeWc()}>
            <Image
              style={styles.image}
              source={require('../assets/icons/toilettes.png')}
            />
             <Text style={styles.text}>
               Toilettes
             </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.header} onPress={() => this._activeWifi()}>
            <Image
              style={styles.image}
              source={require('../assets/icons/wifi.png')}
            />
             <Text style={styles.text}>
               WIFI publics
             </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.header} onPress={() => this._activeResto()}>
            <Image
              style={styles.image}
              source={require('../assets/icons/restaurant.png')}
            />
             <Text style={styles.text}>
               Restaurants
             </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.header} onPress={() => this._activeMonu()}>
            <Image
              style={styles.image}
              source={require('../assets/icons/monument.png')}
            />
             <Text style={styles.text}>
               Monuments
             </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#f9f9f9"
  },
  image: {
    width: 55,
    height: 55,
    margin: 5,
    marginRight: 15
  },
  text: {
    fontSize: 22,
  },
  imageMap: {
    marginTop: 10,
    width: '100%',
    resizeMode: 'cover',
    height: 60
  },
  logotop: {
    width: 35,
    height: 35,
    marginRight:15
  }
});
