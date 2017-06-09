import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PlayerForm from './PlayerForm';
import * as playerActions from '../../actions/playerActions';
import * as PlayerModel from '../../models/Player';

const mapStateToProps = (state) => {
  return {
    players: state.tournament ? state.tournament.players : [],
    tournamentId: state.tournament ? state.tournament._id : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    registerPlayer: playerActions.registerPlayer,
    updatePlayer: playerActions.updatePlayer,
    deletePlayer: playerActions.deletePlayer
  }, dispatch);
};

class PlayerPage extends Component {
  static get propTypes() {
    return {
      players: PropTypes.arrayOf(PlayerModel.propType),
      tournamentId: PropTypes.string,
      registerPlayer: PropTypes.func,
      updatePlayer: PropTypes.func,
      deletePlayer: PropTypes.func,
      params: PropTypes.shape({
        playerId: PropTypes.string
      })
    };
  }

  constructor(props) {
    super(props);
  }

  get registerPlayer() {
    return (data) => {
      this.props.registerPlayer(this.props.tournamentId, data);
    };
  }

  get updatePlayer() {
    return (data) => {
      this.props.updatePlayer(this.props.tournamentId, data);
    };
  }

  get deletePlayer() {
    return (data) => {
      this.props.deletePlayer(this.props.tournamentId, data);
    };
  }

  get selectedPlayer() {
    if (this.props.params.playerId) {
      if (this.props.params.playerId === 'new') {
        return null;
      }
      return this.props.players.find((player) => {
        return this.props.params.playerId === player._id;
      });
    }
    return null;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h3>Players</h3>
          <ol>
            {
              this.props.players.map((player, i) => {
                return <li key={i}><Link to={`/players/${player._id}`}>{player.firstname} {player.lastname}, {player.rank}</Link></li>;
              })
            }
          </ol>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-8">
              <h3>Player Registration</h3>
            </div>
            <div className="col-md-4">
              <Link to="/players/new"><button type="button" className="btn btn-default pull-right">New</button></Link>
            </div>
          </div>
          <PlayerForm
            registerPlayer={this.registerPlayer}
            updatePlayer={this.updatePlayer}
            deletePlayer={this.deletePlayer}
            player={this.selectedPlayer}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
