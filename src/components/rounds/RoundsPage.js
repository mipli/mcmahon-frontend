import React, {Component}  from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PairingsPage from './PairingPage';
import * as roundsActions from '../../actions/roundsActions';

const mapStateToProps = (state) => {
  return {
    rounds: state.tournament ? state.tournament.rounds : [],
    tournamentId: state.tournament ? state.tournament._id : null,
    hasSelectedTournament: state.tournament ? true : false
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    drawRound: roundsActions.drawRound,
    redrawRound: roundsActions.redrawRound
  }, dispatch);
};

class RoundsPage extends Component {
  static get propTypes() {
    return {
      drawRound: PropTypes.func,
      redrawRound: PropTypes.func,
      hasSelectedTournament: PropTypes.bool,
      tournamentId: PropTypes.string,
      rounds: PropTypes.array
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      currentRound: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rounds && nextProps.rounds.length !== this.props.rounds.length && nextProps.rounds.length > 0) {
      this.selectRound(nextProps.rounds[nextProps.rounds.length - 1].number);
    }
  }

  get currentRound() {
    const round = this.props.rounds.find((round) => round.number === this.state.currentRound);
    return round ? round : {};
  }

  canDrawNextRound() {
    if (this.props.rounds.length === 0) {
      return true;
    }
    return this.props.rounds[this.props.rounds.length - 1].finished;
  }

  canRewdrawRound() {
    if (this.props.rounds.length === 0) {
      return false;
    }
    const lastRound = this.props.rounds[this.props.rounds.length - 1];
    if (this.currentRound.number !== lastRound.number || lastRound.finished) {
      return false;
    }
    return lastRound.pairings.filter((pair) => {
      return pair.result !== null;
    }).length === 0;
  }

  selectRound(roundNumber) {
    this.setState({
      currentRound: roundNumber
    });
  }

  isRoundActive(round) {
    return this.state.currentRound === round.number;
  }

  getDrawRoundButton() {
    if (this.canDrawNextRound()) {
      return <li className="nav-item"><a onClick={event => this.drawRound(event)} className="btn btn-primary">Draw Next</a></li>;
    }
    if (this.canRewdrawRound()) {
      return <li className="nav-item"><a onClick={event => this.redrawRound(event)} className="btn btn-primary">Redraw</a></li>;
    }
    return '';
  }

  drawRound() {
    this.props.drawRound(this.props.tournamentId);
  }

  redrawRound() {
    this.props.redrawRound(this.props.tournamentId);
  }

  renderRounds() {
    return (
      <div>
        <ul className="nav nav-tabs">
          {
            this.props.rounds.map((round, i) => {
              return (<li className={"nav-item " + (this.isRoundActive(round) ? 'active' : '')} key={i}>
                <a onClick={() => this.selectRound(round.number)} className="nav-link" href="#">{round.number}</a>
              </li>);
            })
          }
          {this.getDrawRoundButton()}
        </ul>
        <PairingsPage round={this.currentRound}/>
      </div>
    );
  }

  renderMissingTournamentMessage() {
    return (
      <p>Please select a tournament from the <Link to="/">Home page</Link></p>
    );
  }

  render() {
    return (
      <div className="row">
        <h3>Rounds</h3>
        {this.props.hasSelectedTournament ? this.renderRounds() : null}
        {!this.props.hasSelectedTournament ? this.renderMissingTournamentMessage() : null}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoundsPage);
