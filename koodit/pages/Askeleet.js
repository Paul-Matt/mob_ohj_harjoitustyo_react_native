import React from 'react';
import { Text, Container, Card, CardItem, Content } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Pedometer } from 'expo';

class Askeleet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: 'checking',
      pastStepCount: 0,
      currentStepCount: 0,
      askeleetEilen: 0,
      askeleetToissapaivana: 0,
      //tanaan: "",
      //eilen: this.teeEilen(),
      //toissapaiva: this.teeToissapva()
      //eilen: (new Date()-1).getDate()
    };
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    //onko askelmittari saatavilla, vastaus boolean
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    //otetaan kahden päivämäärän välinen askelmäärä
    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    //alert(start);
    //start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );

    const eilenloppu = new Date();
    const eilenalku = new Date();
    eilenalku.setHours(0, 0, 0, 0);
    eilenloppu.setHours(23, 59, 59, 999);
    eilenalku.setDate(eilenloppu.getDate() - 1);
    eilenloppu.setDate(eilenloppu.getDate() - 1);
    //alert(eilenalku);
    //alert(eilenloppu);
    Pedometer.getStepCountAsync(eilenalku, eilenloppu).then(
      result => {
        this.setState({ askeleetEilen: result.steps });
      },
      error => {
        this.setState({
          askeleetEilen: 'Could not get stepCount: ' + error,
        });
      }
    );

    const toissapvaloppu = new Date();
    const toissapvaalku = new Date();
    toissapvaalku.setHours(0, 0, 0, 0);
    toissapvaloppu.setHours(23, 59, 59, 999);
    toissapvaalku.setDate(toissapvaloppu.getDate() - 2);
    toissapvaloppu.setDate(toissapvaloppu.getDate() - 2);
    //alert(toissapvaalku);
    //alert(toissapvaloppu);
    Pedometer.getStepCountAsync(toissapvaalku, toissapvaloppu).then(
      result => {
        this.setState({ askeleetToissapaivana: result.steps });
      },
      error => {
        this.setState({
          askeleetToissapaivana: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  /*teeEilen = () => {
     let tamaPva = new Date();
     let pvm = tamaPva.getDate-1;
     return pvm;
   };
   
    teeToissapva = () => {
     let eilisPva = new Date();
     let tpvm = eilisPva.getDate-2;
     return tpvm;
   };*/

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem>
              <Text>
                Askelmittari on käytössä: {this.state.isPedometerAvailable}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Askeleet tämän päivän aikana: {this.state.pastStepCount}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Askeleet eilisen aikana: {this.state.askeleetEilen}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Askeleet toissapäivän aikana: {this.state.askeleetToissapaivana}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Reaaliaikainen askelseuranta: {this.state.currentStepCount}
              </Text>
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
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    backgroundColor: 'white',
  },
});

export default Askeleet;
