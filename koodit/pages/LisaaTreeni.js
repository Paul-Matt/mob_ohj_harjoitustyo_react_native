import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { SQLite, ImagePicker } from 'expo';

const db = SQLite.openDatabase('treenit.dp');

class LisaaTreeni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kuva: null,
      harjoitusohjelma: '',
      paiva: this.teePaiva(),
      kyykky_penkille: '',
      pystypunnerrus: '',
      ylatalja: '',
      askelkyykky: '',
      punnerrus: '',
      muut: '',
      fiilis: '',
    };
    this.kasitteleLisaa = this.kasitteleLisaa.bind(this);
    this.kasitteleTyhjenna = this.kasitteleTyhjenna.bind(this);
  }

  componentDidMount = () => {};

  teePaiva = () => {
    let tanaan = new Date();
    let kuukausi = tanaan.getMonth() + 1;
    if (kuukausi < 10) {
      kuukausi = '0' + kuukausi;
    }
    let paiva = tanaan.getDate();
    if (paiva < 10) {
      paiva = '0' + paiva;
    }
    let pvm = paiva + '.' + kuukausi + '.' + tanaan.getFullYear();
    return pvm;
  };

  kasitteleLisaa() {
    db.transaction(tx => {
      //tx.executeSql("drop table treeni");
      let sql =
        'CREATE TABLE if not exists treeni (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'harjoitusohjelma text NOT NULL, ' +
        'paiva date NOT NULL, ' +
        'kyykky_penkille text NOT NULL, ' +
        'pystypunnerrus text NOT NULL, ' +
        'ylatalja text NOT NULL, ' +
        'askelkyykky text NOT NULL, ' +
        'punnerrus text NOT NULL, ' +
        'muut text, ' +
        'kuva blob, ' +
        'fiilis text NOT NULL )';
      tx.executeSql(sql, null, null, this.virhe);

      sql =
        'INSERT INTO treeni (harjoitusohjelma, paiva, kyykky_penkille, pystypunnerrus, ylatalja, askelkyykky, punnerrus, muut, kuva, fiilis) ' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      tx.executeSql(
        sql,
        [
          this.state.harjoitusohjelma,
          this.state.paiva,
          this.state.kyykky_penkille,
          this.state.pystypunnerrus,
          this.state.ylatalja,
          this.state.askelkyykky,
          this.state.punnerrus,
          this.state.muut,
          this.state.kuva,
          this.state.fiilis,
        ],
        this.kasitteleTyhjenna,
        this.virhe
      );
    });

    /*  this.setState({
      harjoitusohjelma: '',
      paiva: this.teePaiva(),
      kyykky_penkille: '',
      pystypunnerrus: '',
      ylatalja: '',
      askelkyykky: '',
      punnerrus: '',
      muut: '',
      fiilis: '',
    });
    */
  }

  virhe = (tx, error) => {
    alert(error);
  };

  kasitteleTyhjenna() {
    this.setState({
      harjoitusohjelma: '',
      paiva: this.teePaiva(),
      kyykky_penkille: '',
      pystypunnerrus: '',
      ylatalja: '',
      askelkyykky: '',
      punnerrus: '',
      muut: '',
      fiilis: '',
    });
  }

  //tapahtuu asynkronisesti, ei tule parametreja
  //64kuvat menee tietokantaan parhaiten
  otaKuva = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ kuva: result.uri });
    }
  };

  haeKuva = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ kuva: result.uri });
    }
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <Content style={styles.container}>
            <Form>
              <View style={styles.buttonContainer}>
                <Button
                  transparent
                  bordered
                  style={styles.button2}
                  onPress={this.otaKuva}>
                  <Icon style={styles.icon} name="camera" />
                  <Text>Ota kuva</Text>
                </Button>
                <Button
                  transparent
                  bordered
                  style={styles.button2}
                  onPress={this.haeKuva}>
                  <Icon style={styles.icon} name="attach" />
                  <Text>Hae kuva</Text>
                </Button>
              </View>
              {this.state.kuva &&
                <Image
                  source={{ uri: this.state.kuva }}
                  style={styles.image}
                />}
              <Item inlineLabel>
                <Label>Harjoitusohjelma:</Label>
                <Input
                  value={this.state.harjoitusohjelma}
                  onChangeText={text =>
                    this.setState({ harjoitusohjelma: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Päivä</Label>
                <Input
                  value={this.state.paiva}
                  onChangeText={text => this.setState({ paiva: text })}
                />
                <DatePicker
                  style={{ width: 200, flex: 1 }}
                  date={this.state.paiva}
                  mode="date"
                  format="DD.MM.YYYY"
                  maxDate={this.teePaiva()}
                  confirmBtnText="OK"
                  cancelBtnText="Peruuta"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 0,
                    },
                    //käytetään nativebasen tekstikenttää, piilotetaan tämä
                    dateInput: {
                      display: 'none',
                    },
                  }}
                  onDateChange={date => {
                    this.setState({ paiva: date });
                  }}
                />
              </Item>

              <Item inlineLabel>
                <Label>Kyykky penkille:</Label>
                <Input
                  value={this.state.kyykky_penkille}
                  onChangeText={text =>
                    this.setState({ kyykky_penkille: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Pystypunnerrus:</Label>
                <Input
                  value={this.state.pystypunnerrus}
                  onChangeText={text => this.setState({ pystypunnerrus: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Ylätalja:</Label>
                <Input
                  value={this.state.ylatalja}
                  onChangeText={text => this.setState({ ylatalja: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Askelkyykky:</Label>
                <Input
                  value={this.state.askelkyykky}
                  onChangeText={text => this.setState({ askelkyykky: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Punnerrus:</Label>
                <Input
                  value={this.state.punnerrus}
                  onChangeText={text => this.setState({ punnerrus: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Muut liikkeet:</Label>
                <Input
                  value={this.state.muut}
                  onChangeText={text => this.setState({ muut: text })}
                />
              </Item>

              <Item inlineLabel>
                <Label>Fiilis:</Label>
                <Input
                  value={this.state.fiilis}
                  onChangeText={text => this.setState({ fiilis: text })}
                />
              </Item>

              <View style={styles.buttonContainer}>
                <Button
                  transparent
                  bordered
                  success
                  style={styles.button}
                  onPress={this.kasitteleLisaa}>
                  <Icon style={styles.icon} name="checkmark-circle" />
                  <Text>Lisää</Text>
                </Button>

                <Button
                  transparent
                  bordered
                  danger
                  style={styles.button}
                  onPress={this.kasitteleTyhjenna}>
                  <Icon style={styles.icon} name="backspace" />
                  <Text>Tyhjennä</Text>
                </Button>
              </View>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row', //sivuttain, muuten tulee allekkain
    justifyContent: 'center',
    alignItems: 'flex-start', // Ei tottele, syy NativeBase?
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    alignSelf: 'center', // Keskittää yksittäisen komponentin
    marginTop: 10,
  },
  button: {
    height: 55,
    width: 140,
    marginRight: 5,
    marginTop: 10,
    justifyContent: 'center', // ikonien vuoksi
  },
  button2: {
    height: 30,
    width: 130,
    marginRight: 5,
    marginTop: 1,
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    marginRight: 1,
  },
});

export default LisaaTreeni;
