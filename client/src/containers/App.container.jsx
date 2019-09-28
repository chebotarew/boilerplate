import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout, Menu, Button, Icon, Row, Col } from 'antd'
import { HeaderContainer } from './Header.container'
import { VisualMapContainer } from './VisualMap.container'
import { CabinetContainer } from './Cabinet.container'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { history } from '../utils/history'
import { getUserSelector } from '../selectors/auth.selector'
import { StartPageComponent } from './StartPage.component'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

class App extends React.PureComponent {
	state = {
		isOpen: false,
	}

	openLogin = () => this.setState({ isOpen: true })
	hideLogin = () => this.setState({ isOpen: false })

	render() {
		const { user } = this.props
		const { isOpen } = this.state

		return (
			<Layout>
				<HeaderContainer openLogin={this.openLogin} hideLogin={this.hideLogin} isOpen={isOpen} />
				<Content>
					<Layout className="root-layout">
						<Content className="root-content">
							{!user && <StartPageComponent openLogin={this.openLogin} />}
							{user && (
								<Switch>
									<Route
										path="/"
										exact
										component={() => <StartPageComponent openLogin={this.openLogin} />}
									/>
									<Route path={FrontUrls.cabinet} exact component={CabinetContainer} />
									{/* <Route path={FrontUrls.analitic} exact component={CabinetContainer} /> */}
									<Route path={FrontUrls.visual} exact component={VisualMapContainer} />
								</Switch>
							)}
						</Content>
					</Layout>
				</Content>
				<Footer className="root-footer">
					<Row type="flex" justify="space-between">
						<Col xs={24} xl={4}>
							info@digicom.ru
						</Col>
						<Col xs={24} xl={6}>
							<p className="footer-text">ООО "Цифровые коммуникации"</p>
							<p className="footer-text">ОГРН 5178171073340</p>
						</Col>
						<Col xs={24} xl={4}>
							8-800-80-80-800
						</Col>
					</Row>
				</Footer>
			</Layout>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		user: getUserSelector(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
