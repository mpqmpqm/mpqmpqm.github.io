import React from 'react';
import './App.css';
import Albums from "./components/Albums"

//Discogs key: tYumlFYEMwUXeeIURptE
//Discogs secret: wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE

const discogsKey = 'tYumlFYEMwUXeeIURptE'
const discogsSecret = 'wDhnGZAYPXjdhQDHWdduAXHQAbAjnCAE'

class App extends React.Component {

	constructor () {
		super ();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loading: false,
			data: {},
			value: '',
			foundData: false,
			artist: [],
			titles: [],
			years: [],
			header: 'Enter a musical act'
		}
	}

	handleChange (event) {
		this.setState ({
			value: event.target.value
		})
	}

	handleSubmit (event) {
		event.preventDefault();

		this.setState ({header: 'Loading...', loading: true})

		fetch (`https://api.discogs.com/database/search?type=artist&q=${this.state.value}&key=${discogsKey}&secret=${discogsSecret}`)
			.then (response => response.json())
				.then (data => {
					this.setState ({data: data})})
						.then (() => 
							{
								if (this.state.data.results.length > 0) {

								// console.log(this.state.data.results[0].id);
								this.setState({header: this.state.data.results[0].title})

									fetch (`https://api.discogs.com/artists/${this.state.data.results[0].id}/releases?year,asc`)
										.then (response => response.json())
											.then (data => {

												let i = 0;
												let titles = []
												let years = []

												for (i; i < data.releases.length; i++) {
													if (i > 2) {
														break
													} else {
														titles.push (data.releases[i].title)
														years.push (data.releases[i].year)
													}
													}
												
												// console.log(years);

												this.setState ({
													// artist: data.releases[0].artist,
													titles: titles,
													years: years,
													foundData: true,
													loading: false
													// header: data.releases[0].artist
												})

												console.log(this.state.years[0]);

											})

									}
											// console.log(data.releases[i].artist, data.releases[i].title, data.releases[i].format);})
					
				
								else {
									this.setState ({foundData: false, header: 'Not found, please try again.'});
								}})

		
		event.target.reset();
		event.target.focus();

  }


	render () {

		return (
			<div className = 'app'>

				<h1>I liked their early stuff better...</h1>

				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange}/>
					<input type="submit" value='Submit'/>
				</form>
				<div className = 'info'>
					{/* <img 
						src = {this.state.foundData ? this.state.data.results[0].thumb : null} 
						alt = 'img' 
						style = {{display: this.state.foundData ? 'block' : 'none'}}
					/> */}

					<h2>{this.state.header}</h2>
					
					<Albums titles={this.state.titles} years = {this.state.years} loading = {this.state.loading} />

				</div>
			</div>
		)
		}

	}
export default App;
