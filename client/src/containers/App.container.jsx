import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout, Menu, Button, Icon } from 'antd'
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
	render() {
		const { user } = this.props

		return (
			<Layout>
				<HeaderContainer />
				<Content>
					<Layout className="root-layout">
						<Content className="root-content">
							{!user && <StartPageComponent />}
							{user && (
								<Switch>
									<Route path="/" exact component={StartPageComponent} />
									<Route path={FrontUrls.cabinet} exact component={CabinetContainer} />
									<Route path={FrontUrls.analitic} exact component={CabinetContainer} />
									<Route path={FrontUrls.visual} exact component={VisualMapContainer} />
								</Switch>
							)}
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
		user: getUserSelector(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
