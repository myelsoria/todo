import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from "./components/Todos";
import AppTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import uuid from 'uuid';
import axios from "axios";

import "./App.css";


class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}));
  }

  markComplete = (id) => {
    this.setState({todos: this.state.todos.map( todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }

  delTodo = (id) => {
    //this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  addTodo = (title) => {
    /* const newTodo = {
      id: uuid.v4(),
      title, 
      completed: false
    } 
    this.setState({todos: [...this.state.todos, newTodo]});
    */
    axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({todos: [...this.state.todos, res.data]}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AppTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} 
                delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>    
        </div>
      </Router>
    );
  }
}

export default App;
