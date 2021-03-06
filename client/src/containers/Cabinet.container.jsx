import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { CabinetComponent } from './Cabinet.component'
import { VisualMapContainer } from './VisualMap.container'
import { User } from './User.component'
import { Row, Col, Tabs, Button } from 'antd'
import { getUserSelector } from '../selectors/auth.selector'
import { history } from '../utils/history'

export class Cabinet extends React.PureComponent {
	getGraphicData = data => {
		const values = _.get(data, 'values', [])
		const newData = {
			labels: ['', '', '', '', '', '', ''],
			datasets: [
				{
					label: 'Количество сделок',
					fill: false,
					borderColor: '#4ac126',
					borderWidth: 1,
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: '#4ac126',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [],
					showLines: false,
				},
			],
		}
		newData.datasets[0].data = values.map(item => item.value)
		newData.labels = Object.values(values).map(() => '')
		return newData
	}

	getGraphicOptions = data => {
		const newOptions = {
			scaleShowLabels: false,
			legend: {
				display: false,
			},
			tooltips: {
				callbacks: {
					label: (tooltipItem, datas) => {
						const labelPeriod = _.get(datas, 'datasets[0]').data[tooltipItem.index]
						const label = `${_.get(datas, 'datasets[0].label')} ${tooltipItem.value}`
						return [labelPeriod, label]
					},
				},
			},
			scales: {
				xAxes: [
					{
						display: false,
					},
					{
						gridLines: {
							display: false,
						},
					},
				],
			},
		}

		newOptions.tooltips.callbacks.label = (tooltipItem, datas) => {
			let labelPeriod
			_.get(data, 'values', []).forEach((item, index) => {
				if (tooltipItem.index === index) {
					labelPeriod = item.key
				}
			})

			const label = `${_.get(datas, 'datasets[0].label')} ${tooltipItem.value}`
			return [labelPeriod, label]
		}
		return newOptions
	}

	hasAccsess = () => {
		const { user } = this.props
		const role = _.get(user, 'role', null)
		return role === 'company' || role === 'city' || role === 'region'
	}

	render() {
		const { user } = this.props

		const data = {
			values: [
				{ key: 'Март', value: 12 },
				{ key: 'Апрель', value: 14 },
				{ key: 'Май', value: 16 },
				{ key: 'Июнь', value: 38 },
			],
		}
		const data1 = {
			values: [
				{ key: 'Март', value: 23 },
				{ key: 'Апрель', value: 11 },
				{ key: 'Май', value: 21 },
				{ key: 'Июнь', value: 25 },
			],
		}
		return (
			<Row className="main-container">
				<User user={user} />
				{!this.hasAccsess() && (
					<div>
						<Col xs={24} xl={19} className="cabinet-block">
							<Tabs defaultActiveKey="1">
								<Tabs.TabPane tab="Аналитика" key="1">
									<CabinetComponent />
								</Tabs.TabPane>
								<Tabs.TabPane tab="Карта ресурсов" key="2">
									<VisualMapContainer />
								</Tabs.TabPane>
							</Tabs>
						</Col>
					</div>
				)}
			</Row>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		user: getUserSelector(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export const CabinetContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Cabinet)
