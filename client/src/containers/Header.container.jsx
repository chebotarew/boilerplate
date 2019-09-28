import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerAction, loginAction } from '../actions/auth.actions'
import { isAuthSelector } from '../selectors/auth.selector'
import logo from '../../assets/img/logo.png'
import { LoginForm } from './LoginForm.component'

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

	render() {
		const { isAuth, register, login } = this.props
		return (
			<Header className="header">
				<div className="menu">
					<img src={logo} className="logo" />
					{isAuth && (
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['2']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">
								<Link to="/second">Second</Link>
							</Menu.Item>
							<Menu.Item key="2">nav 2</Menu.Item>
							<Menu.Item key="3">nav 3</Menu.Item>
						</Menu>
					)}
				</div>
				<div>
					<Popover trigger="click" content={<LoginForm btnTitle="Войти" action={login} />}>
						<Button type="link"> Вход</Button>
					</Popover>
					<Popover
						trigger="click"
						content={<LoginForm btnTitle="Зарегистрироваться" action={register} isRegister />}
					>
						<Button type="link"> Регистрация</Button>
					</Popover>
				</div>
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
	login: ({ login, password }) => dispatch(loginAction({ login, password })),
})

export const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent)
