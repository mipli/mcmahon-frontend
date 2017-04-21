import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import * as PlayerModel from '../../models/Player';

class PlayerForm extends Component {
  static get propTypes() {
    return {
      registerPlayer: PropTypes.func,
      updatePlayer: PropTypes.func,
      deletePlayer: PropTypes.func,
      player: PlayerModel.propType
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.player ? props.player.name : '',
      rank: props.player ? props.player.rank : '',
      _id: props.player ? props.player._id : ''
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.player) {
      const player = newProps.player;
      if (this.state._id !== player._id) {
        this.setState({
          _id: player._id
        });
      }
      if (this.state.name !== player.name) {
        this.setState({
          name: player.name
        });
      }
      if (this.state.rank !== player.rank) {
        this.setState({
          rank: player.rank
        });
      }
    } else {
      this.clearState();
    }
  }

  nameChanged(event) {
    this.setState({
      name: event.target.value
    });
  }

  rankChanged(event) {
    this.setState({
      rank: parseInt(event.target.value)
    });
  }

  deletePlayer(event) {
    event.preventDefault();
    this.props.deletePlayer(this.state);
    this.clearState();
  }

  formSubmit(event) {
    event.preventDefault();
    if (PlayerModel.validate(this.state)) {
      if (this.state._id) {
        this.props.updatePlayer(this.state);
      } else {
        this.props.registerPlayer(this.state);
      }
      this.clearState();
      event.target.reset();
    } else {
      console.error('invalid player model');
    }
  }

  clearState() {
    this.setState({
      _id: '',
      name: '',
      rank: ''
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
        <div className="row">
          <label className="col-sm-2 control-label">Rank: </label>
          <div className="col-sm-10">
            <input
              type="number"
              name="rank"
              className="form-control"
              value={this.state.rank}
              onChange={(event) => this.rankChanged(event)} />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-offset-2 col-sm-6">
            <input type="submit" className="btn btn-default" value="Register/Update Player" />
          </div>
          <div className="col-sm-4">
            <input type="button" className="btn btn-danger pull-right" value="Delete Player" onClick={event => this.deletePlayer(event)}/>
          </div>
        </div>
      </form>
    );
  }
}

export default PlayerForm;
