import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
} from 'native-base';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('treenit.dp');

/*
const treenilista = [
  {
    id: 1,
    harjoitusohjelma: 'Harjoitusohjelma 1',
    paiva: '4.4.2018',
    kyykky_penkille: '15 kg x 12 x 4',
    pystypunnerrus: '5 kg x 12 x 3',
    ylatalja: '20,5 kg + 10 x 12 x 3',
    askelkyykky: '10 kg x 12 x 3',
    punnerrus: 'korotettu navan tasolla x 12 x 3',
    muut: '-',
    fiilis: 'Ei oikein sujunut',
    kuva: 'https://myy.haaga-helia.fi/~a1503323/kuvat/dumbbell.png'
  },
  {
    id: 2,
    harjoitusohjelma: 'Harjoitusohjelma 1',
    paiva: '30.3.2018',
    kyykky_penkille: '12,5 kg x 12 x 4',
    pystypunnerrus: '5 kg x 12 x 3',
    ylatalja: '30,5 x 12 x 3',
    askelkyykky: '10 kg x 12 x 3',
    punnerrus: 'korotettu navan tasolla x 12 x 3',
    muut: '-',
    fiilis: 'Ihan ok',
    kuva: 'https://myy.haaga-helia.fi/~a1503323/kuvat/dumbbell.png'
  },
];
*/
//componendidmountin jälkeen tyhjä taulukko
class TreeniListaus extends Component {
  constructor(props) {
    super(props);
    this.state = { treenit: [] };
  }

  kasittelePoista = id => {
    db.transaction(
      tx => {
        tx.executeSql('DELETE from treeni WHERE id = ?;', [id]);
      },
      null,
      this.componentDidMount,
      this.virhe
    );
  };

  componentDidMount = () => {
    // this.setState({ treenit: treenilista });
    db.transaction(tx => {
      //tietokannan tyhjennys, laita kommentteihin tyhjennettyäsi
      //tx.executeSql('delete from treeni');
      tx.executeSql('select * from treeni', null, this.ok, this.virhe);
    });
  };

  ok = (tx, results) => {
    this.setState({ treenit: results.rows._array });
    //alert("ok");
  };

  virhe = (tx, error) => {
    alert(error);
  };

  renderItem = treeni => {
    return (
      <ListItem avatar>
        <Left><Thumbnail source={{ uri: treeni.kuva }} /></Left>
        <Body>
          <Text>Harjoitusohjelma: {treeni.harjoitusohjelma}</Text>
          <Text>id: {treeni.id}</Text>
          <Text note>Kyykky penkille: {treeni.kyykky_penkille}</Text>
          <Text note>Pystypunnerrus: {treeni.pystypunnerrus}</Text>
          <Text note>Ylätalja: {treeni.ylatalja}</Text>
          <Text note>Askelkyykky: {treeni.askelkyykky}</Text>
          <Text note>Punnerrus: {treeni.punnerrus}</Text>
          <Text note>Muut liikkeet: {treeni.muut}</Text>
          <Text note>Fiilis: {treeni.fiilis}</Text>

          <View style={styles.buttonContainer}>
            <Button
              transparent
              bordered
              warning
              style={styles.button2}
              onPress={() =>
                this.props.navigation.navigate('Muokkaa', { id: treeni.id })}>

              <Icon style={styles.icon} name="create" />
              <Text>Muokkaa</Text>
            </Button>

            <Button
              transparent
              bordered
              danger
              style={styles.button2}
              onPress={() => this.kasittelePoista(treeni.id)}>
              <Icon style={styles.icon} name="close-circle" />
              <Text>Poista</Text>
            </Button>
          </View>
        </Body>

        <Right><Text note>{treeni.paiva}</Text></Right>

      </ListItem>
    );
  };

  //annetaan tilamuuttuja listalle tietolähteeksi
  //dataArray kertoo mikä on dynaamisen listan lähde
  //ottaa yhden rivin tilasta, heittää render item-funktiolle, joka laittaa treeniin
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List dataArray={this.state.treenit} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start', // Ei tottele, syy NativeBase?
  },
  button2: {
    height: 30,
    width: 120,
    marginRight: 3,
    marginTop: 4,
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    marginRight: 1,
  },
});

export default TreeniListaus;
