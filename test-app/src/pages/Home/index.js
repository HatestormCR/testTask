import * as React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { createStructuredSelector } from 'reselect';
import { loadUsers, startRating, endRating, ascSort, descSort } from "../../redux/actions";
import { getData, getLoading, getError } from '../../redux/selectors'
import { Table, Spinner, Button } from 'reactstrap';

class Home extends React.Component {
    state = {
      random: false
    }

    componentDidMount() {
      this.props.loadUsers();
    };

    userRandomizeRating = () => {
      const { random } = this.state;
      const { startRating, endRating } = this.props;

      if(!random) {
        this.setState({
          random: !random
        });

        return startRating();
      } else {
        this.setState({
          random: !random
        });

        return endRating();
      }
    }

    render() {

      const { loading, error, ascSort, descSort, data } = this.props;
      const { random } = this.state;

        if (loading) {
          return <div className="loading"><Spinner color="primary" type="grow" /></div>
        };

        if (error) {
          return <div style={{color: 'red'}}>ERROR: {error}</div>
        };

        return (
          <div className="wrapper">
            <div className="button-container">
              <Button className="button" color="success" onClick={() => this.userRandomizeRating()}>{random ? 'Stop random' : 'Start random'}</Button>
              <Button className="button" color="primary" onClick={() => ascSort()}>Ascending</Button>
              <Button className="button" color="primary" onClick={() => descSort()}>Descending</Button>
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
    };
};

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
