import React from 'react';
import GoBid from './GoBid';

class GoBidPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bidVisible: true,
      Project:null,
      pDetailVisible:false
    }

    this.setProject = this.setProject.bind(this);

  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.Project !== this.state.Project){
      let data = {};
      data.name = this.state.Project.projectName;
      data.id = this.state.Project.id;
      data.category = this.state.Project.category;
      data.description = this.state.Project.description;
      data.userId =this.state.Project.userId;
      console.log(data);
      this.state.pDetailVisible = true;
      
    }
    if(prevState.bidVisible !== this.state.bidVisible){

    }


  }

  setProject(chosenProject){
    this.setState({Project:chosenProject});
    this.setState({bidVisible: false});
    
    
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
        { this.state.bidVisible ? <GoBid bidVisible={this.state.bidVisible}  setProject={this.setProject} /> : 
          <div>
            <h1>Project Name: {this.state.Project.projectName}</h1>
            <h2>Project Category: {this.state.Project.category}</h2>
            <h3>Project Description: {this.state.Project.description}</h3>
          </div> }
        </div>
      </div>
    );
  }
}

export default GoBidPage;