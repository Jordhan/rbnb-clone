import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Flat from './components/flat';
import Marker from './components/marker';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          allFlats: data,
          flats: data,
          selectedFlat: data[0]
        })
      })
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    })
  }

  render() {
    let center = {
      lat: 48.8566, lng: 2.3522
    };
    if (this.state.selectedFlat) {
      center = { lat: this.state.selectedFlat.lat, lng: this.state.selectedFlat.lng }
    }
    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <input type="text" placeholder="Search..." value={this.state.search}
              onChange={this.handleSearch} />
          </div>
          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat key={flat.name} flat={flat} selectFlat={this.selectFlat} />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
            zoom={14}>
            {this.state.flats.map((flat) => {
              return <Marker {...flat} selected={flat === this.state.selectedFlat} />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;

//https://github.com/ssaunier/airbnb-clone/blob/master/src/App.js

// import React, { Component } from 'react';
// // import logo from './logo.svg';
// import './App.css';
// import Flat from './components/flat';
// import GoogleMapReact from 'google-map-react';
// import Marker from './components/marker';

// class App extends Component{

//   constructor(props) {
//     super(props);
//     this.state = {
//       flats: [],
//       allFlats: [],
//       selectFlat: null
//       //search: ""
//     };
//   }

//   componentDidMount(){
//     // console.log('Se montó');
//     const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
//     fetch(url)
//       .then(response => response.json())
//       .then( (data) => {
//           this.setState({
//             flats: data,
//             allFlats: data,
//             selectFlat: data[0]
//           })
//           //console.log(data);
//       })
//   }

//   selectFlat = (flat) => {
//     // console.log(flat);
//     this.setState({
//       selectFlat: flat
//     });
//   }

//   handleSearch = (event) => {
//     //console.log(event);
//      //debugger
//      this.setState({
//        search: event.target.value,
//        flats: this.state.allFlats.filter( (flat) => new RegExp(event.target.value, "i").exec(flat.name))

//     });
//   }

  
//   render(){

//     let center = {
//       lat:48.8566,
//       lng:2.3522
//     };

//     if (this.state.selectFlat){
//       center = {
//         lat: this.state.selectFlat.lat,
//         lng: this.state.selectFlat.lng
//       }
//     }
    

//     return (
//       <div className="app">
//         <div className="main">
//           <div className="search">
//             <input
//               type ="text"
//               placeholder="Search..."
//               value={this.state.search}
//               onChange={this.hadleSearch}
//             />
//           </div>
//           <div className="flats">
//             { this.state.flats.map((flat) =>{
//               return <Flat 
//                 key={flat.name} 
//                 flat={flat}
//                 selectFlat={this.selectFlat}

//               />
//             })}
//           </div>
//         </div>
//         <div className="map">
//         <GoogleMapReact
//           center={center}
//           zoom={11}>
//             { this.state.flats.map((flat) =>{
//               return <Marker 
//                 {...flat} selected={this.selectFlat}
//                 // key={flat.name} 
//                 // lat={flat.lat} 
//                 // lng={flat.lng} 
//                 // text={flat.price}
//                 />
//         })}
//         </GoogleMapReact>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
