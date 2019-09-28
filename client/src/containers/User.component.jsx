import React from 'react'
import { Layout, Menu, Button, Col } from 'antd'

export class User extends React.PureComponent {
	render() {
		const { user } = this.props
		return (
			<div>
				<Col xs={24} xl={5} className="centered-text">
					<Col span={24}>{user ? user.lastName : 'Snow'}</Col>
					<Col span={24}>{user ? user.firstName : 'John'}</Col>
					<Col span={24}>{user ? user.middleName : 'Willson'}</Col>
					<Col span={24}>Администратор ресурса</Col>
				</Col>
			</div>
		)
	}
}
