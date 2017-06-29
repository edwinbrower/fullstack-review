import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };

  }

  componentDidMount () {
    this.retrieve();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos/import',
      method: 'POST',
      data: {username: term},
      success: (data) => {
        console.log('post successful!', data);  
        this.retrieve();      
      },
      error: (error) => {
        console.error('post failed!');
      }
    });
  }

  retrieve () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      data: {
        repos: ''
      },
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
        this.setState({
          repos: data
        });
      },
      error: (error) => {
        console.error('there was an error in retrieving data!', error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));