import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import './App.css';
import axios from 'axios';

export class App extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
       userData: [],
       subordinates: [],  
      }
    
  }
  
  componentDidMount() {
    
    axios.get('http://localhost:9000/').then(response => {
      this.setState({
        userData: response.data.users
      });  
    });
    
  }
  
  handleOnChange = (userObject) => {
    this.setState({
      subordinates: []
    });
    if(userObject !== null) {
      axios.get(`http://localhost:9000/subordinates?user_id=${userObject.id}`).then(response => {
        this.setState({
          subordinates: response.data.subordinates
        });  
      });
    }
  };

  render() {
    
    return (
      <div>
        <AppBar className = "mrg" position = "static">
          <Toolbar>
            Users Hierarcy Challenge
          </Toolbar>
        </AppBar>
      
        <Autocomplete 
          className = "pding"
          onChange = {(obj, selectedObject) => this.handleOnChange(selectedObject)}
          options = { this.state.userData }
          getOptionLabel = { option => option.name }
          style = {{'width': '300px'}}
          renderInput = { params =>
            (<TextField { ...params } label = "User" variant = "outlined" fullWidth />)
          }
          />

        <List>
          {this.state.subordinates.map( (user) => { return (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={`Id: ${user.id} Role: ${user.role}`} />
            </ListItem> );
          })}
        </List>
        

  
      </div>);
  }
}

export default App  