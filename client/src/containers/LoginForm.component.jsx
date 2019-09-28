import React from 'react'
import { Layout, Menu, Button, Input } from 'antd'
import { HeaderContainer } from './Header.container'
import { MapContainer } from './Map.container'
import Second from './Cabinet.container'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export class LoginForm extends React.PureComponent {
	handleInput = field => event => {
		this.setState({ [field]: event.target.value })
	}

	handleClick = () => {
		const { action } = this.props
		action(this.state)
	}
	render() {
		const { btnTitle = 'Войти', isRegister } = this.props
		return (
			<div className="login-form">
				{isRegister && (
					<div>
						<Input
							className="login-form-input"
							placeholder="Фамилия"
							onChange={this.handleInput('lastName')}
						/>
						<Input
							className="login-form-input"
							placeholder="Имя"
							onChange={this.handleInput('firstName')}
						/>
						<Input
							className="login-form-input"
							placeholder="Отчество"
							onChange={this.handleInput('middleName')}
						/>
					</div>
				)}

				<Input className="login-form-input" onChange={this.handleInput('email')} />
				<Input.Password className="login-form-input" onChange={this.handleInput('password')} />
				<div className="login-form-button-container">
					<Button type="primary" onClick={this.handleClick}>
						{btnTitle}
					</Button>
				</div>
			</div>
		)
	}
}
