import { Location, Permissions } from 'expo';
//tätä kutsuttaessa annetaan funktio callback,joka käsittelee kutsun tuloksen, esim. (Paikanna(this.haeSaa)
export async function Paikanna(callback) {
  let status = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    //ei ole lupaa
    callback(null, null, 500);
  }
  //paikannus laitetaan location-olioon
  let location = await Location.getCurrentPositionAsync({
    //tehdään tarkkaa paikannusta
    enableHighAccuracy: true,
  }); 
  // Annetaan callback funktiolle kordinaatit ja status
  callback(location.coords.latitude, location.coords.longitude, 200);
}
