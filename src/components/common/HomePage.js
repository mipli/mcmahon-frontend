import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import TournamentForm from './TournamentForm';
import * as tournamentActions from '../../actions/tournamentActions';
import * as tournamentsActions from '../../actions/tournamentsActions';

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTournament: tournamentActions.fetchTournament,
    createTournament: tournamentsActions.createTournament,
    fetchTournaments: tournamentsActions.fetchTournaments
  }, dispatch);
};


class HomePage extends Component {
  static get propTypes() {
    return {
      fetchTournament: PropTypes.func,
      createTournament: PropTypes.func,
      fetchTournaments: PropTypes.func,
      tournaments: PropTypes.array
    };
  }

  componentWillMount() {
    this.props.fetchTournaments();
  }

  fetchTournament(tournament) {
    this.props.fetchTournament(tournament);
    browserHistory.push('/rounds');
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <h2>Tournaments</h2>
            <ul>
            {
              this.props.tournaments.map((tournament, i) => {
                return (<li key={i} onClick={() => this.fetchTournament(tournament)}>{tournament.name}</li>);
              })
            }
            </ul>
          </div>
          <div className="col-sm-4">
            <h4>Create Tournament</h4>
            <TournamentForm createTournament={this.props.createTournament} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
