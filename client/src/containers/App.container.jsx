import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout, Menu, Button, Icon } from 'antd'
import { HeaderContainer } from './Header.container'
import { MapContainer } from './Map.container'
import Second from './Second.container'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

class App extends React.PureComponent {
	render() {
		return (
			<Layout>
				<HeaderContainer />
				<Content>
					<Layout className="root-layout">
						<Content className="root-content">
							<MapContainer />
							<Switch>
								<Route path="/second" exact component={Second} />
							</Switch>
						</Content>
					</Layout>
				</Content>
				<Footer className="root-footer">Лучший сайт по ЖКХ</Footer>
			</Layout>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		count: state.count,
	}
}

const mapDispatchToProps = dispatch => ({
	testAction: () => dispatch(testAction(1)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
