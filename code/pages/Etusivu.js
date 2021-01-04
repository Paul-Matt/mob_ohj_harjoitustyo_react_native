import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Icon } from 'native-base';

class Etusivu extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={[styles.buttonContainer, { marginTop: 25 }]}>
            <Button
              style={styles.button}
              bordered
              dark
              onPress={() => this.props.navigation.navigate('Lisää')}>
              <Icon name="create" /><Text>Lisää</Text>
            </Button>
            <Button
              style={styles.button}
              bordered
              dark
              onPress={() => this.props.navigation.navigate('Listaa')}>
              <Icon name="list-box" /><Text>Listaa</Text>
            </Button>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              bordered
              dark
              onPress={() => this.props.navigation.navigate('Askeleet')}>
              <Icon name="walk" /><Text>Askeleet</Text>
            </Button>
            <Button
              style={styles.button}
              bordered
              dark
              onPress={() => this.props.navigation.navigate('Kuntosali')}>
              <Icon name="body" /><Text>Kuntosalit</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 125,
    height: 70,
    flexDirection: 'column',
  },
});

export default Etusivu;
