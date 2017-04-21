import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

const mapStateToProps = (state) => {
  return {
    tournamentName: state.tournament ? state.tournament.name : ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};



class App extends Component {
  static get propTypes() {
    return {
      children: PropTypes.object,
      tournamentName: PropTypes.string
    };
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">{this.props.tournamentName ? this.props.tournamentName : 'MacMahon Tournament System'}</Link>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/rounds">Rounds</Link></li>
                <li><Link to="/players">Players</Link></li>
                <li><Link to="/help">Help</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
