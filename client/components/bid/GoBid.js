import React from 'react';
import { connect } from 'react-redux';
import categories from '../../data/categories';
import map from 'lodash/map';
import { bidCategory } from '../../actions/bidActions';
import classnames from 'classnames';
import jwtDecode from 'jwt-decode';



class GoBid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      loading: false,
      isLoading: false,
      invalid: false,
      chosenProject:null,
      results: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  componentDidUpdate(prevProps, prevState){
    if(prevState.chosenProject !== this.state.chosenProject){
      this.props.setProject(this.state.chosenProject);
      let data = {};
      data.name = this.state.chosenProject.projectName;
      data.id = this.state.chosenProject.id;
      data.category = this.state.chosenProject.category;
      data.description = this.state.chosenProject.description;
      data.userId =this.state.chosenProject.userId;
      
    }


  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }


  onSubmit(e) {
    e.preventDefault();
    var decoded = jwtDecode(localStorage['jwtToken']);
    this.props.bidCategory(this.state, decoded.id).then((jobs) => {
      this.context.router.push('/bid');

      this.setState({ results: jobs.data.projects });

    });


  }

  handleClick(e) {
    
    this.setState({ chosenProject: e});
    


  }



  render() {

    const options = map(categories, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );








    return (
      <div>
        <form onSubmit={this.onSubmit}>

          <div className={classnames("form-group")}>
            <label className="control-label">Select Category</label>
            <select
              className="form-control"
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
            >
              <option value="" disabled>Categories</option>
              {options}
            </select>

          </div>



          <div className="form-group">
            <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
              Select
            </button>
          </div>
        </form>
        {
          map(this.state.results, (project, i) =>

            <div key={i} className="alert alert-info" role="alert"><h3 className='articleHeadline'><span className="label label-danger">{++i}</span>
            <strong> {project.projectName} </strong><span className="badge">
            <button onClick={() => this.handleClick(project)} type="submit" className="btn-right btn-danger navbar-btn" formMethod="post">View Project</button></span></h3>        
            
            </div>

          )
        }
      </div>

    );
  }
}



GoBid.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(null, { bidCategory })(GoBid);
