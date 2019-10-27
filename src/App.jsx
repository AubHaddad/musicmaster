import React , { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'
import Profile from './Profile'
import Gallery from './Gallery'

import './App.css'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            query : '',
            artist : null,
            tracks : []
        }

    }
    
    search() {
        const TOKEN = 'Bearer BQBH-oTUYJWecdcrIWx85b3x8sdm6h9W2jfhBgK7ZRxxOQ6YR8uR6QYcvqrhBw3RVwP8u50WDxjA_fQcTWoEXzIQu2CJ4Cvy92uRRe5-t5nYmRJkZyoy5WiAlCzZem_h6Xl2udvbhwtNeSON-zXlxlY6c-CbTgv2hg'
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/'

        fetch(FETCH_URL, { 
            method: 'GET', 
            headers: { 'Authorization': TOKEN} 
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist})
            
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=SE`
            fetch(FETCH_URL, {
                method: 'GET',
                headers: { 'Authorization': TOKEN }
            })
            .then(response => response.json())
            .then(json => {
                const { tracks } = json;
                this.setState({tracks})
                
            })
            
        });
        

    }

    render(){
        return(
            <div className="App">
                <div className='App-title' >Msic master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type='text'
                            placeholder='Search for an artist'
                            query = {this.state.query}
                            onChange={event => {this.setState({query : event.target.value})}}
                            onKeyPress={event => {if(event.key=== 'Enter'){
                                this.search()   
                            } }}
                        />

                        <InputGroup.Append>
                            <Button onClick={ () => this.search()} ><FaSearch /> </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    
                </FormGroup>
                {
                    this.state.artist !==null
                    ?   <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks={this.state.tracks}
                            />
                        </div>
                    : <div></div>
                }
                
            </div>
        )
    }
}

export default App;