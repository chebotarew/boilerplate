import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { Layout, Menu, Button, Icon, Row, Col } from 'antd'
;('antd')
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
		})
		// this.mapGroup = new window.H.map.Group()
		// const line = new window.H.geo.LineString()
		// line.pushLatLngAlt(55.751574, 37.573856)
		// line.pushLatLngAlt(55.751584, 37.575556)
		// line.pushLatLngAlt(55.757584, 37.581556)
		// line.pushLatLngAlt(55.758584, 37.583556)
		// this.mapGroup.addObject(
		// 	new window.H.map.Polyline(line, {
		// 		style: {
		// 			fillColor: '#FFFFCC',
		// 			strokeColor: '#829',
		// 			lineWidth: 8,
		// 		},
		// 	})
		// )
		// this.map.addObject(this.mapGroup)

		// this.map.addEventListener('mapviewchange', function() {
		// 	clearTimeout(window.update_timeout);
		// 	window.update_timeout = setTimeout(updateMap(), 2000);
		// });
		// this.map.addEventListener('tap', function(evt) {
		// 	const coordinates = this.map.screenToGeo(
		// 		evt.currentPointer.viewportX,
		// 		evt.currentPointer.viewportY
		// 	)
		// })
		// this.mapGroup.addObject(
		// 	new window.H.map.Polygon(line, {
		// 		style: {
		// 			fillColor: '#FFFFCC',
		// 			strokeColor: '#829',
		// 			lineWidth: 8,
		// 		},
		// 	})
		// )

		// this.drawMarker({ latitude: 55.751574, longitude: 37.573856 })
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

	render() {
		return (
			<div>
				<div id="here-map" style={{ width: '100%', height: '100vh', background: 'grey' }} />
			</div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
	testAction: () => dispatch(testAction(1)),
})

export const VisualMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleHereMap)
