import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PlayerModel from '../../models/Player';
import * as roundsActions from '../../actions/roundsActions';
import Radium from 'radium';

const mapStateToProps = (state) => {
  return {
    players: state.tournament ? state.tournament.players : null,
    tournamentId: state.tournament ? state.tournament._id : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updatePairingResult: roundsActions.updatePairingResult
  }, dispatch);
};

@Radium
class PairingsPage extends Component {
  static get propTypes() {
    return {
      updatePairingResult: PropTypes.func,
      tournamentId: PropTypes.string,
      players: PropTypes.array,
      round: PropTypes.any
    };
  }

  get styles() {
    return {
      winner: {
        fontWeight: 'bold'
      }
    };
  }

  get isFinished() {
    return this.props.round.finished;
  }

  get pairings() {
    return this.props.round && this.props.round.pairings ? this.props.round.pairings : [];
  }

  changeResult(idx) {
    if (this.isFinished) {
      return;
    }
    if (!this.pairings[idx].black || !this.pairings[idx].white) {
      return;
    }
    const validResults = ['1', '-1', '0', null];
    const currentResultIndex = validResults.findIndex((r) => r == this.pairings[idx].result);
    const result = currentResultIndex > -1 ? validResults[(currentResultIndex + 1) % validResults.length] : validResults[0];

    this.props.updatePairingResult(this.props.tournamentId, this.props.round._id, this.pairings[idx]._id, result);
  }

  isWhiteWinner(result) {
    return result === 1;
  }

  isBlackWinner(result) {
    return result === -1;
  }

  render() {
    return (
      <div className="row">
        <table className="table table-striped table-hover">
          <thead className="thead-default">
            <tr>
              <th>Table</th>
              <th>Black</th>
              <th>White</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {
              this.pairings.map((pair, i) => {
                const black = PlayerModel.getPlayerById(pair.black, this.props.players);
                const white = PlayerModel.getPlayerById(pair.white, this.props.players);
                const result = pair.result;
                return (<tr key={i}>
                  <td>{i}</td>
                  <td style={this.isBlackWinner(result) ? this.styles.winner : null}>{black ? black.firstname + ' ' + black.lastname : ''}</td>
                  <td style={this.isWhiteWinner(result) ? this.styles.winner : null}>{white ? white.firstname + ' ' + white.lastname : ''}</td>
                  <td onClick={() => this.changeResult(i)}>{result}</td>
                </tr>);
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PairingsPage);
