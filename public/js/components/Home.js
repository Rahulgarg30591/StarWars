import { getJson } from '../helpers/ajaxHelper';
import React, {PropTypes} from 'react';
import Planet from './Planet';
import Spinner from 'react-spinkit';

class Home extends React.Component {

    // API data filtering and processing function.
    static processResultData(data) {
        let searchResult = [];

        for (var i=0; i<data.length; i++) {
            let population = 0;

            if (data[i].population !== 'unknown') {
                population = parseInt(data[i].population);
            }

            searchResult.push({
                name: data[i].name,
                population: population,
            });
        }

        // Sorting.
        searchResult = searchResult.sort(function( a, b ) { return b.population - a.population; });
        return searchResult;
    }

    constructor(props) {
        super(props);

        this.fetchResult = this.fetchResult.bind(this);
        this.searchComplete = this.searchComplete.bind(this);
        this.getOutputComponent = this.getOutputComponent.bind(this);
        this.canFetch = this.canFetch.bind(this);

        this.searchQueue = [];
        this.state = {
            searchTag: '',
            searchResult: [],
            ifResult: false,
            isError: false,
            errorMessage: '',
            loading: false,

            searchQueue: [],
            searchQueueFront: 0,
            searchQueueRear: 0,
        };
    }

    // Checking the user information if not found then send to the Login Page.
    componentWillMount(){
        if (!this.props.user) {
            this.props.history.push("/");
        }
    }

    // Used to fetch the data from API after checking conditions
    // 1.) If user Luke Skywalker then can make multiple calls in a minute else only 15.
    // 2.) Search Tag is empty or not.
    fetchResult(event) {
        if(this.canFetch()) {
            const searchTag = event.target.value;
            if (!searchTag) {
                this.setState({ searchTag: searchTag, searchResult: []});
                return;
            }
            this.setState({ searchTag: searchTag, loading: true, searchResult: [] });

            const searchGetObj = {
                url: `http://localhost:4000/api/search?param=${searchTag}`,
            };

            getJson(searchGetObj, this.searchComplete, (resp) => {
                this.setState({ loading: false, isError: true, errorMessage: resp.status.message});
            });
        } else {
            alert("Sorry only Luke Skywalker can search more than 15 times in a minute.");
        }
    }

    // Implementation of Queue to check API call rate in a minute.
    // If user is Luke Skywalker then can make multiple calls in a minute else only 15.
    canFetch() {
        if (this.props.user.name === 'Luke Skywalker') {
            return true;
        }

        const searchQueue = this.state.searchQueue;
        let searchQueueRear = this.state.searchQueueRear;
        let searchQueueFront = this.state.searchQueueFront;

        if (this.state.searchQueue.length < 15) {
            searchQueue.push(new Date().getTime());
            searchQueueRear++;

            this.setState({ searchQueue, searchQueueRear, searchQueueFront });
            return true;
        } else if (this.state.searchQueue.length === 15) {
            const firstCallTime = searchQueue[searchQueueFront];
            const secondsDiff = (new Date().getTime() - firstCallTime)/1000;

            if (secondsDiff < 60) {
                alert("Only Luke Skywalker can have more than 15 searches in a minute.");
                return false;
            } else {
                searchQueue.splice(searchQueueFront,1);
                searchQueue.push(new Date().getTime());
                return true;
            }
        }
    }

    // Success Function of the API call.
    searchComplete(resp) {
        const { status, data } = resp;

        if (status && status.code === 1000) {

            if (data.length > 0) {
                this.setState({
                    loading: false,
                    searchResult: Home.processResultData(data),
                    ifResult: true,
                    isError: false,
                });
            } else {
                this.setState({
                    loading: false,
                    ifResult: false,
                    isError: false,
                });
            }
        } else {
            this.setState({
                loading: false,
                ifResult: false,
                isError: true,
                errorMessage: status.message,
            });
        }
    }

    // Fetches the right result component on the basis of state flag.
    getOutputComponent() {
        if (!this.state.searchTag || this.state.loading) {
            return null;
        }

        if (this.state.ifResult) {
            return (<Planet planetData={this.state.searchResult} />);
        } else if (!this.state.ifResult && !this.state.isError) {
            return (<h4 className="homeText">No Planet found!!!</h4>);
        } else {
            return (<h4 className="homeText">{this.state.errorMessage}</h4>);
        }
    }

    // Component Render Function.
    render () {
        const outputComponent = this.getOutputComponent();
        let loading = null;
        let userName = '';

        if (this.state.loading) {
            loading = (<Spinner name="circle" fadeIn='none' />);
        }

        if (this.props.user && this.props.user.name) {
            userName = this.props.user.name
        }

        return(
            <div>
                <div className="col-sm-10 mainbody">
                    <h2 className="homeText">Welcome {userName}</h2>
                    <input
                        type="text"
                        onChange={this.fetchResult}
                        value={this.state.searchTag}
                        placeholder="Search"
                        className="form-control"
                    >
                    </input>
                </div>
                <div className="col-sm-10">
                    {outputComponent}
                </div>
                {loading}
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
}

export default Home;
