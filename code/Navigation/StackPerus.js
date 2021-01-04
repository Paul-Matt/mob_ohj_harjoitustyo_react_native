import Etusivu from '../pages/Etusivu';
import Askeleet from '../pages/Askeleet';
import LisaaTreeni from '../pages/LisaaTreeni';
import TreeniListaus from '../pages/TreeniListaus';
import Kuntosali from '../pages/Kuntosali';
import MuokkaaTreeni from '../pages/MuokkaaTreeni';
import Informaatio from '../pages/Informaatio';
import { StackNavigator} from 'react-navigation';

const StackPerus = StackNavigator({
  Etusivu: {
    screen: Etusivu,
    navigationOptions: { title: 'Mobiiliohjelmoinnin harjoitustyö' },
  },
  Askeleet: {
    screen: Askeleet,
    navigationOptions: { title: 'Askeleet' },
  },
  Lisää: {
    screen: LisaaTreeni,
    navigationOptions: { title: 'Treenin lisääminen' },
  },
  Listaa: {
    screen: TreeniListaus,
    navigationOptions: { title: 'Treenien listaaminen' },
  },
  Kuntosali: {
    screen: Kuntosali,
    navigationOptions: { title: 'Kuntosalit lähellä' },
  },
  Muokkaa: {
    screen: MuokkaaTreeni,
    navigationOptions: { title: 'Muokkaa' },
  },
   Informaatio: {
    screen: Informaatio,
    navigationOptions: { title: 'Informaatio' },
  },
});

export default StackPerus;
