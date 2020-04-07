import React, { Component } from 'react';

import styles from './App.css';
import Header from './Header'


class App extends Component {


constructor(){
  super();

  this.state = {

    users: null,
    total: null,
    per_page: null,
    current_page: 1

  }

}


componentDidMount() {

  this.makeHttpRequestWithPage(1);

}

makeHttpRequestWithPage = async pageNumber => {

  const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {

    method: 'GET',

    headers: {

      'Accept': 'application/json',

      'Content-Type': 'application/json',

    },

  });



  const data = await response.json();



  this.setState({

    users: data.data,

    total: data.total,

    per_page: data.per_page,

    current_page: data.page

  });

}





render() {



  let users, renderPageNumbers;



  if (this.state.users !== null) {

    users = this.state.users.map(user => (

      <tr key={user.id}>

        <td>{user.id}</td>

        <td>{user.first_name}</td>

        <td>{user.last_name}</td>

        <td><img src={`${user.avatar}`} /></td>

        <td>{user.email}</td>

      </tr>

    ));

  }



  const pageNumbers = [];

  if (this.state.total !== null) {

    for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {

      pageNumbers.push(i);

    }

    console.log(pageNumbers);


    renderPageNumbers = pageNumbers.map(number => {

      let classes = this.state.current_page === number ? 'active' : '';

  


      return (

        <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>

      );

    });

  }



  return (

      
     


    <div className='app'>

      <Header />



      <table className='table'>

        <thead>

          <tr>

            <th>S/N</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Avatar</th>

            <th>Email</th>

          </tr>

        </thead>

        <tbody  onClick = {console.log('Happy')}>

          {users}

        </tbody>

      </table>




      <div className='app'>

      <div className='pagination'>

          
      <span onClick={() => this.makeHttpRequestWithPage(1)} >&laquo;</span>

      <span>{renderPageNumbers}</span>

      <span onClick={() => this.makeHttpRequestWithPage(Math.ceil(this.state.total / this.state.per_page))}>&raquo;</span> 

      </div>

      </div>
      
     
    </div>

  );

}



}


export default App;
