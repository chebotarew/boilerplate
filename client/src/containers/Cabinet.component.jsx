import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { Line, HorizontalBar } from 'react-chartjs-2'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { Row, Col, Menu } from 'antd'
import { getUserSelector } from '../selectors/auth.selector'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { VisualMapContainer } from './VisualMap.container'

const data3 = {
	labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
	datasets: [
		{
			label: 'Потребление тепловой энергии',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40, 22],
		},
	],
}

const data4 = {
	labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
	datasets: [
		{
			label: 'Потребление интернета',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [11, 23, 12, 54, 56, 55, 40, 76],
		},
	],
}

const data5 = {
	labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
	datasets: [
		{
			label: 'Потребление электричества',
			backgroundColor: 'rgba(189, 118, 255, 0.2)',
			borderColor: 'rgba(189, 118, 255,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(189, 118, 255,0.4)',
			hoverBorderColor: 'rgba(189, 118, 255,1)',
			data: [24, 43, 54, 12, 37, 43, 40, 12],
		},
	],
}

export class Cabinet extends React.PureComponent {
	getGraphicData = data => {
		const values = _.get(data, 'values', [])
		const newData = {
			labels: ['', '', '', '', '', '', ''],
			datasets: [
				{
					label: 'Количество потребления в тыс. куб. м.',
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
			<div>
				<Row>
					<Col xs={24} xl={12}>
						<Col style={{ maxWidth: '300px' }}>
							<Line
								width={50}
								height={30}
								data={this.getGraphicData(data)}
								options={this.getGraphicOptions(data)}
							/>
						</Col>
						<Col style={{ maxWidth: '300px' }}>
							<HorizontalBar
								data={data3}
								width={50}
								height={200}
								options={{
									maintainAspectRatio: false,
								}}
							/>
						</Col>
					</Col>
					<Col xs={24} xl={12}>
						<Col style={{ maxWidth: '300px' }}>
							<Line
								width={50}
								height={30}
								data={this.getGraphicData(data1)}
								options={this.getGraphicOptions(data1)}
							/>
						</Col>
						<Col style={{ maxWidth: '300px' }}>
							<HorizontalBar
								data={data5}
								width={50}
								height={200}
								options={{
									maintainAspectRatio: false,
								}}
							/>
						</Col>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		user: getUserSelector(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export const CabinetComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(Cabinet)
