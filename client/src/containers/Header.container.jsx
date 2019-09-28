import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { registerAction, loginAction, logoutAction } from '../actions/auth.actions'
import { isAuthSelector } from '../selectors/auth.selector'
import logo from '../../assets/img/logo.png'
import { LoginForm } from './LoginForm.component'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { history } from '../utils/history'

import { Layout, Menu, Button, Icon, Popover } from 'antd'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

class HeaderComponent extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			enterFormShow: false,
			registerFormShow: false,
		}
	}
	componentDidUpdate() {
		if (this.props.user) {
			history.push(FrontUrls.cabinet)
		}
		if (!this.props.user) {
			history.push('/')
		}
	}

	render() {
		const { isAuth, register, login, logout } = this.props
		return (
			<Header className="header">
				<div className="menu">
					<Link to="/cabinet">
						<Col span={24}>
							<img src={logo} className="logo" />
						</Col>
					</Link>
				</div>
				<div className="phone">Горячая линия: 8-800-80-80-800</div>
				{!isAuth && (
					<div>
						<Popover
							placement="bottomLeft"
							trigger="click"
							content={<LoginForm btnTitle="Войти" action={login} />}
						>
							<Button type="link"> Вход</Button>
						</Popover>
						<Popover
							placement="bottomLeft"
							trigger="click"
							content={<LoginForm btnTitle="Зарегистрироваться" action={register} isRegister />}
						>
							<Button type="link" className="register">
								Регистрация
							</Button>
						</Popover>
					</div>
				)}
				{isAuth && (
					<div>
						<Button type="link" onClick={logout}>
							Выход
						</Button>
					</div>
				)}
			</Header>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuth: isAuthSelector(state),
	}
}

const mapDispatchToProps = dispatch => ({
	register: data => dispatch(registerAction(data)),
	login: data => dispatch(loginAction(data)),
	logout: () => dispatch(logoutAction()),
})

export const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent)
