import React, { Component } from 'react';
import Nav from './common/nav'
import Menus from './common/menu'
class App extends Component {
  
  render() {
    return (
      <div className="App" style={{overflow:"hidden",backgroundColor:"#F4F4F4"
      }}>
       <Nav></Nav>
       <Menus></Menus>
      </div>
    )
  }
}

export default App;
