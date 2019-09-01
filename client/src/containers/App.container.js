import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../assets/styles/App.css'
import { testAction } from '../actions/root.actions'

class App extends React.PureComponent {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <p>{this.props.count}</p>
                    <button onClick={this.props.testAction}>Click me</button>
                    <Link to="/second"> На вторую страницу</Link>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = dispatch => ({
    testAction: () => dispatch(testAction(1))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
