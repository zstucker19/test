import React from 'react';
import { connect } from 'react-redux';
import { viewProfile } from '../../actions/profileActions';
import { newMessage } from '../../actions/chatActions';
import jwtDecode from 'jwt-decode';



class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
      user: '',
      photo: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
  }


  componentDidMount() {
      this.handleMessageEvent()
        var decoded = jwtDecode(localStorage['jwtToken']);
        viewProfile(this.state, decoded.id)
            .then(res => {
            console.log(res.data);
            this.setState({ user: res.data.username,
                            photo: res.data.photo })
          });
  }


  handleMessageEvent() {
      socket.on('chat message', (inboundMessage) => {
            
            this.state.messages.push(inboundMessage.message);
            
            this.setState({input: ''})
      })
  }

  onChange(ev) {
      this.setState({input: ev.target.value})
  }

  onSubmit(ev) {
      ev.preventDefault()
      socket.emit('chat message', {message: this.state.input})
      
      this.setState({input: ''})
      
  }

   render() {
     const unmappedMessages = this.state.messages;
     const mappedMessages = unmappedMessages.map((mapMessage, index) => <ul key={index}><img src={this.state.photo} height='50px' width='50px' />   {this.state.user}: {mapMessage}</ul>);

     return ( 

         <div>
            <div>    
              <row className="show-grid">             
                 {mappedMessages}          
              </row>
            </div>
            
            <form id="chatMessages" action="" >
                <input id="msg" autoComplete="off" value={this.state.input} onChange={this.onChange}/>
                <hr/>
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Send</button>
            </form>
        </div>
         

          )
        }
     }

export default ChatContainer;