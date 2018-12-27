import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const status = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class NewSeries extends Component {
    constructor(props){
        super(props)
    
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false
        }

        this.saveSeries = this.saveSeries.bind(this)
    }

    componentDidMount(){
        this.setState({ isLoading: true})
        api.loadGenres()
          .then((res) => {this.setState({
            isLoading: false,
            genres: res.data
        })})
    }

    saveSeries(){
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries)
        .then(() => {
            this.setState({
                redirect: '/series/'+this.refs.genre.value
            })
        })
    }

    render(){
        return(
            <section className="intro-section">
                { this.state.redirect &&
                    <Redirect to={this.state.redirect}/>
                }
                <h1>Nova Série</h1>
                <form>
                    Nome: 
                    <input type="text" ref='name' className="form-control" /><br />
                    Status:
                    <select ref='status'>
                        {
                            Object.keys(status)
                            .map( key => <option key={key} value={key}> {status[key]} </option>)
                        }
                    </select><br /><br />
                    Gênero:
                    <select ref='genre'>
                        {
                            this.state.genres
                            .map( key => <option key={key} value={key}> {key} </option>)
                        }
                    </select><br /><br />
                    Comentários: 
                    <textarea ref='comments' className="form-control" /><br />
                </form>
                <button type="button" onClick={this.saveSeries}>Salvar</button>
            </section>
        )
    }
}

export default NewSeries