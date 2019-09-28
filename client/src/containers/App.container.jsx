import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout, Menu, Button, Icon } from 'antd'
import { HeaderContainer } from './Header.container'
import { MapContainer } from './Map.container'
import { CabinetContainer } from './Cabinet.container'
import { FrontUrls } from '../constants/FrontUrls.constant'

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
							<Switch>
								<Route path="/" exact component={MapContainer} />
								<Route path={FrontUrls.cabinet} exact component={CabinetContainer} />
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
