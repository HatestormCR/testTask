import * as React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { createStructuredSelector } from 'reselect';
import { loadUsers, startRating, endRating, ascSort, descSort } from "../../redux/actions";
import { getData, getLoading, getError } from '../../redux/selectors'
import { Table } from 'reactstrap';

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

    render() {

      const { loading, error, ascSort, descSort, data } = this.props;
      const { random } = this.state;

        if (loading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div style={{color: 'red'}}>ERROR: {error}</div>
        }

        return (
          <div className="wrapper">
            <div className="button-container">
              <button className="button" onClick={() => this.userRandomizeRating()}>{random ? 'Stop random' : 'Start random'}</button>
              <button className="button" onClick={() => ascSort()}>Ascending</button>
              <button className="button" onClick={() => descSort()}>Descending</button>
            </div>
            <Table striped size="sm" hover>
              <thead>
                <tr>
                   <th>Lastname</th>
                   <th>Rating</th>
                 </tr>
               </thead>
               <tbody>
               {data.map((user, i) =>
               <tr key={shortid.generate()}>
                  <td>{user.surname}</td>
                  <td>{user.rating}</td>
                </ tr>)}
              </tbody>
            </Table>
          </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    data: getData,
    loading: getLoading,
    error: getError,
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
