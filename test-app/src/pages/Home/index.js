import * as React from 'react';
import { connect } from 'react-redux';
import { loadUsers, userRandomize } from "../../redux/actions";

class Home extends React.Component {
  state = {
    users: []
  }
    componentDidMount() {
        this.props.loadUsers();
    };


    render() {

      // console.log(this.props.data);
      var SortItems = this.props.data.sort(function (a, b) {
        return a.rating - b.rating;
      });

      const items = SortItems.map((user, i) => <div className="user-card">
                <h3>{user.surname}</h3>
                <p>{user.rating}</p>
                <p>{user.index}</p>
              </div>);

      // console.log(qqq, 'asd')

        if (this.props.loading) {
            return <div>Loading</div>
        }

        if (this.props.error) {
            return <div style={{color: 'red'}}>ERROR: {this.props.error}</div>
        }

        return (
            <div>
              <button onClick={() => this.props.userRandomize()}>Random</button>
              <h1>Home</h1>
              {items}
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
    userRandomize
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
