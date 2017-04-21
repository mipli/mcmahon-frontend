import React, {Component}  from 'react';
import PropTypes from 'prop-types';

class TournamentForm extends Component {
  static get propTypes() {
    return {
      createTournament: PropTypes.func,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  nameChanged(event) {
    this.setState({
      name: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    if (this.state.name.trim() !== '') {
      this.props.createTournament(this.state.name);
    }
    this.clearState();
    event.target.reset();
  }

  clearState() {
    this.setState({
      name: ''
    });
  }

  render() {
    return (
      <form onSubmit={(event) => this.formSubmit(event)}
        className="form-horizontal">
        <div className="row">
          <label className="col-sm-2 control-label">Name: </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.nameChanged(event)} />
          </div>
        </div>
        <br />
        <div className="col-sm-offset-2 col-sm-6">
          <input type="submit" className="btn btn-default" value="Create" />
        </div>

      </form>
    );
  }
}
export default TournamentForm;
