import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {

    state = {
        recentDays: [],
        allTime: [],
        flag: true
    }

    getCamperData(url, stateName) {
        axios.get(url)
            .then(({ data }) => {
                this.setState({ [stateName]: data });
            })
    }

    changeSort(value) {
        if(this.state.flag !== value) {
            this.setState({flag: value});
        }
    }

    componentDidMount() {
        this.getCamperData('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'recentDays');
        this.getCamperData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'allTime');
    }

    render() {
        const {recentDays, allTime, flag} = this.state;
        return (
            <div className="App container">
                <Button onClick={(event) => this.changeSort(true)} bsStyle='info'>Recent</Button>
                <Button onClick={(event) => this.changeSort(false)} bsStyle='success'>All Time</Button>
                <Table striped bordered condensed hover className='blackColor'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camper Name</th>
                            <th>Last 30 days points</th>
                            <th>All time points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {flag && (recentDays.map((row, index)=>(
                        <tr key={row.username}>
                            <td>{index + 1}</td>
                            <td><a href={`https://www.freecodecamp.org/${row.username}`}>{row.username}</a></td>
                            <td>{row.recent}</td>
                            <td>{row.alltime}</td>
                        </tr>
                    )))}

                    {flag === false && (allTime.map((row, index)=>(
                        <tr key={row.username}>
                            <td>{index + 1}</td>
                            <td><a href={`https://www.freecodecamp.org/${row.username}`}>{row.username}</a></td>
                            <td>{row.recent}</td>
                            <td>{row.alltime}</td>
                        </tr>
                    )))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;