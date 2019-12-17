import * as React from 'react';
import { connect } from 'react-redux';
import { loadUsers, startRating, endRating, ascSort, descSort } from "../../redux/actions";

class Home extends React.Component {
    state = {
      random: false
    }

    componentDidMount() {
      this.props.loadUsers();
    };

    userRandomizeRating = () => {
      if(this.state.random === false) {
        this.setState({
          random: !this.state.random
        });

        return this.props.startRating();
      } else {
        this.setState({
          random: !this.state.random
        });

        return this.props.endRating();
      }
    }

    usersSort = () => {
      return this.props.ascSort();
    }

    render() {


        if (this.props.loading) {
            return <div>Loading</div>
        }

        if (this.props.error) {
            return <div style={{color: 'red'}}>ERROR: {this.props.error}</div>
        }

        return (
          <div>
            <button onClick={() => this.userRandomizeRating()}>{this.state.random ? 'Stop Random' : 'Start random'}</button>
            <button onClick={() => this.props.ascSort()}>Ascend</button>
            <h1>Home1</h1>
            {this.props.data.map((user, i) => <div className="user-card">
                <h3>{user.surname}</h3>
                <p>{user.rating}</p>
                <p>{user.index}</p>
              </div>)}
          </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    loadUsers,
    startRating,
    endRating,
    ascSort,
    descSort
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
