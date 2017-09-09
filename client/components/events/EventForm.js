import React from 'react';
import { connect } from 'react-redux';
import categories from '../../data/categories';
import map from 'lodash/map';
import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';
import jwtDecode from 'jwt-decode';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category:'',
      Description : '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    var decoded = jwtDecode(localStorage['jwtToken']);
    this.props.createEvent(this.state, decoded.id).then(() => {
      this.context.router.push('/new-event');
    });
  }

  render() {
    const { title, errors, isLoading } = this.state;
    const options = map(categories, (val, key) =>
    <option key={val} value={val}>{key}</option>
  );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Project</h1>

        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />

        <div className={classnames("form-group")}>
            <label className="control-label">Select Category</label>
            <select
              className="form-control"
              name="category"
              onChange={this.onChange}
              value={this.state.category}
            >
              <option value="" disabled>Categories</option>
              {options}
            </select>
            
        </div>

        <div className={classnames("form-group")}>
          <label htmlFor="exampleTextarea">Project Description</label>
          <textarea className="form-control" id="exampleTextarea" rows="3" name="Description" onChange={this.onChange} value={this.state.Description}></textarea>
        </div>


        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired
}

EventForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { createEvent })(EventForm);
