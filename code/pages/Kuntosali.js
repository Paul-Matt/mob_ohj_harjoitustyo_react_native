import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Text,
  Button,
  Icon,
  Right,
} from 'native-base';
import { Paikanna } from '../api/Paikanna';

class Kuntosali extends Component {
  constructor(props) {
    super(props);
    this.state = { kuntosalit: [], viesti: '' };
  }

  componentDidMount = () => {
    Paikanna(this.haeKuntosalit);
  };

  haeKuntosalit = (lat, lon, status) => {
    if (status === 200) {
      fetch(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
          lat +
          ',' +
          lon +
          '&radius=500' +
          '&type=gym&language=fi&key=AIzaSyCEtsZuooxDq6axr9Rg72wZNaVomT5SMcA'
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.results.length !== 0) {
            this.setState({ kuntosalit: responseJson.results });
          } else {
            this.setState({ viesti: 'Lähellä ei ole yhtään kuntosalia' });
          }
          //console.log(responseJson.results);
        })
        .catch(error => {
          //console.error(error);
          alert(error);
          this.setState({ viesti: 'Kuntosalien haku ei onnistunut' });
        });
    }
  };

  renderItem = item => {
    return (
      <ListItem>
        <Left>
          <Text>{item.name}</Text>
        </Left>
        <Button
          transparent
          info
          onPress={() =>
            this.props.navigation.navigate('Informaatio', {
              id: item.place_id,
            })}>
          <Icon style={styles.icon} name="information-circle" />
        </Button>
        <Body>
          <Text>{item.vicinity}</Text>
          <Text>
            {item.opening_hours && item.opening_hours.open_now ? 'avoinna' : ''}
          </Text>

        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={this.state.kuntosalit} renderRow={this.renderItem} />
          <Text style={styles.text}>{this.state.viesti}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 11,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Kuntosali;
