import React,{Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';
import {connect} from 'react-redux';
import {setSearchField,robotRequest} from './action';

const mapStateToProps=state=>{
    return {
        searchField: state.searchRobot.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(robotRequest())
    }
}



class App extends Component{

    componentDidMount(){

        this.props.onRequestRobots();
    }
    
    render(){
        const {searchField,onSearchChange,robots}=this.props;
        const filteredrobots = robots.filter(robots => {
        return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
    return(

        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
            <ErrorBoundary>
            <CardList robots={filteredrobots}/>
            </ErrorBoundary>
            </Scroll>
        </div>

         );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);