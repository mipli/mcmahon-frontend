import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PlayerModel from '../../models/Player';
import * as roundsActions from '../../actions/roundsActions';

const mapStateToProps = (state) => {
  return {
    players: state.players,
    tournamentId: state.tournament ? state.tournament._id : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updatePairingResult: roundsActions.updatePairingResult
  }, dispatch);
};

class PairingsPage extends Component {
  static get propTypes() {
    return {
      updatePairingResult: PropTypes.func,
      tournamentId: PropTypes.string,
      players: PropTypes.array,
      round: PropTypes.any
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
    const validResults = ['1', '-1', '0', null];
    const currentResultIndex = validResults.findIndex((r) => r == this.pairings[idx].result);
    const result = currentResultIndex > -1 ? validResults[(currentResultIndex + 1) % validResults.length] : validResults[0];

    this.props.updatePairingResult(this.props.tournamentId, this.props.round._id, this.pairings[idx]._id, result);
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
                  <td>{black ? black.name : ''}</td>
                  <td>{white ? white.name : ''}</td>
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
