import React from 'react'
import { Layout, Menu, Button, Col } from 'antd'
import { HeaderContainer } from './Header.container'
import { MapContainer } from './Map.container'
import Second from './Cabinet.container'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export class User extends React.PureComponent {
	render() {
		const { user } = this.props
		return (
			<div>
				<Col span={5} className="centered-text">
					<Col span={24}>{user ? user.lastName : 'Snow'}</Col>
					<Col span={24}>{user ? user.firstName : 'John'}</Col>
					<Col span={24}>{user ? user.middleName : 'Willson'}</Col>
				</Col>
			</div>
		)
	}
}
