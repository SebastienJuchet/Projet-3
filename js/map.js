class Map {
  constructor() {
    this.greenIcon = L.icon({iconUrl: 'img/icons-green.png'});
    this.redIcon = L.icon({iconUrl: 'img/icons-red.png'});
    this.orangeIcon = L.icon({iconUrl: 'img/icons-orange.png'});
    this.map = L.map('map').setView([43.6044622, 1.4442469], 17);
    this.initMap();
    this.getStations();
  }

  initMap() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJvd2x5NDAiLCJhIjoiY2s2OTQ1b3AwMGIxcjNrcWo0MXdtZTRseCJ9.goBmMVra4yIQgexoPzL3fw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 16,
      id: 'mapbox/streets-v11',
    }).addTo(this.map);
  }
  
  getStations() {
    ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=7eb8ff18b6ee8c97a35b0dba07a411e1e340bfee', (reponse) => {
      let stations = JSON.parse(reponse);
      stations.forEach( (station) => {
        let infosStation = new Station(
          station.name,
          station.address,
          station.position,
          station.status,// "OPEN" ou "CLOSE"
          station.bike_stands,//nombres total de vélos
          station.available_bikes,//vélos disponibles
          station.available_bike_stands//nombre d'accroches disponibles
        );
        let marker = this.displayMarker(infosStation);
        marker.on('click', () => {
          if (infosStation.status === 'OPEN') {
            document.getElementById('status-station').textContent = 'Ouvert';
          } else if (infosStation.status === 'CLOSED') {
            document.getElementById("status-station").textContent = 'Fermé';
          }
          document.getElementById('name-station').textContent = infosStation.name;
          document.getElementById('address').textContent = infosStation.address;
          document.getElementById('total-bikes').textContent = infosStation.bikeStands;
          document.getElementById('available-bikes').textContent = infosStation.availableBikes;
          document.getElementById('available-bikes-stands').textContent = infosStation.availableBikeStands;
          document.getElementById('infos-station-canvas').innerHTML = `Station : ${infosStation.name}<br>Adresse : ${infosStation.address}`
          document.getElementById('btn-form').style.visibility = 'visible';
          
          if (infosStation.status === 'CLOSED' || infosStation.availableBikes === 0) {
            document.getElementById('btn-form').style.visibility = 'hidden';
          }
        });
       });
    })
  }

  displayMarker(station) {
    let marker;
    if (station.status === 'CLOSED' || station.availableBikes === 0) {
       marker = L.marker(station.position, {icon: this.redIcon}).addTo(this.map)
      .bindPopup(`<strong>Nom de la station : </strong> ${station.name}<br><strong>Adresse : </strong> ${station.address}<br><strong>Nombre Total de vélos : </strong> ${station.bikeStands}<br><strong>Vélos disponible : </strong> ${station.availableBikes}<br><strong>Status : </strong> ${station.status}`);
    } else if (station.availableBikes < station.bikeStands / 2) {
       marker = L.marker(station.position, {icon: this.orangeIcon}).addTo(this.map)
      .bindPopup(`<strong>Nom de la station : </strong> ${station.name}<br><strong>Adresse : </strong> ${station.address}<br><strong>Nombre Total de vélos : </strong> ${station.bikeStands}<br><strong>Vélos disponible : </strong> ${station.availableBikes}<br><strong>Status : </strong> ${station.status}`);
    } else {
      marker = L.marker(station.position, {icon: this.greenIcon})
      .addTo(this.map)
      .bindPopup(`<strong>Nom de la station : </strong> ${station.name}<br><strong>Adresse : </strong> ${station.address}<br><strong>Nombre Total de vélos : </strong> ${station.bikeStands}<br><strong>Vélos disponible : </strong> ${station.availableBikes}<br><strong>Status : </strong> ${station.status}`);
    }
    return marker;
  }

}
