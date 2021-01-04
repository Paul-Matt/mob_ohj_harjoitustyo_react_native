import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
} from 'native-base';

class Informaatio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nimi: '',
      osoite: '',
      sivut: '',
      puh: '',
      urli: '',
      arvostelu: '',
      ma: '',
      ti: '',
      ke: '',
      to: '',
      pe: '',
      la: '',
      su: '',
      viesti: '',
    };
  }

  componentDidMount = () => {
    //alert(this.props.navigation.state.params.id);
    fetch(
      'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
        this.props.navigation.state.params.id +
        '&language=fi&key=AIzaSyCEtsZuooxDq6axr9Rg72wZNaVomT5SMcA'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          id: responseJson.result.place_id,
          nimi: responseJson.result.name,
          osoite: responseJson.result.formatted_address,
          sivut: responseJson.result.website,
          puh: responseJson.result.international_phone_number,
          urli: responseJson.result.url,
          arvostelu: responseJson.result.rating,
          ma: responseJson.result.opening_hours.weekday_text[0],
          ti: responseJson.result.opening_hours.weekday_text[1],
          ke: responseJson.result.opening_hours.weekday_text[2],
          to: responseJson.result.opening_hours.weekday_text[3],
          pe: responseJson.result.opening_hours.weekday_text[4],
          la: responseJson.result.opening_hours.weekday_text[5],
          su: responseJson.result.opening_hours.weekday_text[6],
        });

        //alert(responseJson.result);
      })
      .catch(error => {
        //snackissa console.login sijaan alert
        //console.error(error);
        //alert.error(error);
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text style={styles.text}>Nimi: {this.state.nimi}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Googlen id: {this.state.id}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Kotisivut: {this.state.sivut}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Osoite: {this.state.osoite}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Puhelin: {this.state.puh}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>
                  Arvostelut: {this.state.arvostelu}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Googlen sivu: {this.state.urli}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.text}>Aukioloajat:</Text>
                <Text style={styles.text}>{this.state.ma}</Text>
                <Text style={styles.text}>{this.state.ti}</Text>
                <Text style={styles.text}>{this.state.ke}</Text>
                <Text style={styles.text}>{this.state.to}</Text>
                <Text style={styles.text}>{this.state.pe}</Text>
                <Text style={styles.text}>{this.state.la}</Text>
                <Text style={styles.text}>{this.state.su}</Text>
              </Body>
            </CardItem>
          </Card>
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
    alignSelf: 'flex-start',
    paddingTop: 5,
  },
});

export default Informaatio;
