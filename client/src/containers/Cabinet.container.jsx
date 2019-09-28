import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

import { Row, Col } from 'antd'
import { getUserSelector } from '../selectors/auth.selector'

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
				<Col span={5} className="centered-text">
					<Col span={24}>{user ? user.lastName : 'Snow'}</Col>
					<Col span={24}>{user ? user.firstName : 'John'}</Col>
					<Col span={24}>{user ? user.middleName : 'Willson'}</Col>
				</Col>
				<Col span={19}>
					<Col span={20}>
						<Line
							width={100}
							height={30}
							data={this.getGraphicData(data)}
							options={this.getGraphicOptions(data)}
						/>
					</Col>

					<Col span={20}>
						<Line
							width={100}
							height={30}
							data={this.getGraphicData(data1)}
							options={this.getGraphicOptions(data1)}
						/>
					</Col>
				</Col>
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
