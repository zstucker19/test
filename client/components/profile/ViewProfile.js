import React from 'react';
import { connect } from 'react-redux';
import { viewProfile } from '../../actions/profileActions';
import jwtDecode from 'jwt-decode';


class ViewProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vProfile: {},
        };
    }


    componentWillMount() {
      
        var decoded = jwtDecode(localStorage['jwtToken']);
        viewProfile(this.state, decoded.id)
            .then(res => {
            console.log(res.data);
            this.setState({ vProfile: res.data })
          });
    }

    render() {
        const { vProfile } = this.state;

        return (
            <div>
                <h1>{vProfile.username}</h1>
                <img width="300px" src={vProfile.photo}/>
                <hr />
                <h2>ABOUT</h2>
                {vProfile.about}
                <hr />
                <h2>LOCATION</h2>
                {vProfile.location}
                <hr />
                <h2>LIST OF SERVICES</h2>
                {vProfile.servicesList}
                <hr />
                <h2>MY RATING</h2>
                {vProfile.myRating}
                <hr />
                <h2>MY REVIEWS</h2>
                {vProfile.myReviews}
                <hr />
            </div>

        );
    }
}


ViewProfileForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { viewProfile })(ViewProfileForm);
