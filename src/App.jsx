import React , { Component } from 'react';

class App extends Component {

    render(){
        return(
            <div>
                <div className='App-title' >Msic master</div>
                <div >
                    <input placeholder='Search an artist...'/>
                    <button >submit</button>
                </div>
                <div className='profile'>
                    <div>Artist Picture</div>
                    <div>Artiste Name</div>
                </div>
                <div className='gallery'>
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;