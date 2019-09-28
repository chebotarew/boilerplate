import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { Layout, Menu, Button, Icon, Row, Col, Modal } from 'antd'
import { AddObjectModalComponent } from './AddObjectModal.component'
const e = React.createElement

class SimpleHereMap extends React.Component {
	constructor(props) {
		super(props)
		this.platform = null
		this.map = null
		this.mapGroup = null
		this.eventListener
		this.state = {
			geo: [],
			showAddEl: false,
		}
	}
	componentDidMount() {
		this.platform = new window.H.service.Platform({
			app_id: 'UdRH6PlISTlADYsW6mzl',
			app_code: 'lfrrTheP9nBedeJyy1NtIA',
		})

		var pixelRatio = window.devicePixelRatio || 1
		var layer = this.platform.createDefaultLayers({
			lg: 'rus',
			tileSize: pixelRatio === 1 ? 256 : 512,
			ppi: pixelRatio === 1 ? undefined : 320,
		})
		var container = document.getElementById('here-map')

		this.map = new window.H.Map(container, layer.normal.map, {
			center: { lat: 55.751574, lng: 37.573856 },
			zoom: 15,
		})

		var events = new window.H.mapevents.MapEvents(this.map)
		// eslint-disable-next-line
		var behavior = new window.H.mapevents.Behavior(events)
		// eslint-disable-next-line
		var ui = new window.H.ui.UI.createDefault(this.map, layer)
		this.eventListener = window.addEventListener('resize', () => {
			this.map.getViewPort().resize()
		})
		this.map.addEventListener('tap', evt => {
			const coordinates = this.map.screenToGeo(
				evt.currentPointer.viewportX,
				evt.currentPointer.viewportY
			)
			this.setState(state => ({
				geo: [...state.geo, coordinates],
			}))
			this.drawLine(this.state.geo)
			this.success()
		})
		this.mapGroup = new window.H.map.Group()
		var circle = new H.map.Circle({ lat: 55.751574, lng: 37.573856 }, 200)
		var circle1 = new H.map.Circle({ lat: 55.754574, lng: 37.578856 }, 200, {
			style: { fillColor: 'rgba(170, 212, 119, 0.4)', strokeColor: 'rgba(170, 212, 119, 0.4)' },
		})
		var circle2 = new H.map.Circle({ lat: 55.753574, lng: 37.579856 }, 200, {
			style: { fillColor: 'rgba(212, 63, 167, 0.4)', strokeColor: 'rgba(212, 63, 167, 0.4)' },
		})
		var circle3 = new H.map.Circle({ lat: 55.751574, lng: 37.572456 }, 200, {
			style: { fillColor: 'rgba(235, 222, 80, 0.4)', strokeColor: 'rgba(235, 222, 80, 0.4)' },
		})
		this.mapGroup.addObject(circle)
		this.mapGroup.addObject(circle1)
		this.mapGroup.addObject(circle2)
		this.mapGroup.addObject(circle3)
		this.map.addObject(this.mapGroup)
	}

	drawMarker = data => {
		const svgMarkup = `<svg width="18" height="18"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8"
            fill="#ddd" stroke="#4527a0" stroke-width="1"  />
        </svg>`,
			dotIcon = new window.H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } })

		const marker = new window.H.map.Marker(
			{
				lat: data.latitude,
				lng: data.longitude,
			},
			{ icon: dotIcon }
		)
		marker.setData({ data: data })
		this.mapGroup.addObject(marker)
	}

	drawLine = data => {
		if (!data.length) {
			return null
		}
		this.mapGroup = new window.H.map.Group()

		const line = new window.H.geo.LineString()

		data.forEach(coordinate => {
			line.pushLatLngAlt(coordinate.lat, coordinate.lng)
		})

		const polyline = new window.H.map.Polyline(line, {
			style: {
				lineWidth: 4,
				strokeColor: '#4527a099',
			},
		})

		this.mapGroup.addObject(polyline)
		this.map.addObject(this.mapGroup)
	}

	addPolygon = data => {
		const line = new H.geo.LineString()

		data.coordinates.forEach(coordinate => {
			line.pushLatLngAlt(coordinate.lat, coordinate.lng)
		})
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.eventListener)
	}

	hasAccsess = () => {
		const { user } = this.props
		const role = _.get(user, 'role', null)
		return role === 'company' || role === 'city' || role === 'region'
	}

	showModal = () => this.setState({ showAddEl: true })
	hideModal = () => this.setState({ showAddEl: false })

	success = () => {
		Modal.success({
			title: 'Добавьте объект',
			content: <AddObjectModalComponent />,
		})
	}

	render() {
		const { showAddEl } = this.state
		return (
			<div>
				{/* <Modal
					visible={showAddEl}
					title="Добавьте объект"
					onCancel={this.hideModal}
					content={AddObjectModalComponent}
				></Modal> */}
				<div id="here-map" style={{ width: '100%', height: '100vh', background: 'grey' }} />
			</div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {}
}

const mapDispatchToProps = dispatch => ({})

export const VisualMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleHereMap)
