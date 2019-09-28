import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { testAction } from '../actions/root.actions'
import { Layout, Menu, Button, Icon } from 'antd'
const e = React.createElement

class SimpleHereMap extends React.Component {
	constructor(props) {
		super(props)
		this.platform = null
		this.map = null
		this.eventListener
		this.mapGroup = null
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
			zoom: 12,
		})

		var events = new window.H.mapevents.MapEvents(this.map)
		// eslint-disable-next-line
		var behavior = new window.H.mapevents.Behavior(events)
		// eslint-disable-next-line
		var ui = new window.H.ui.UI.createDefault(this.map, layer)
		this.eventListener = window.addEventListener('resize', () => {
			this.map.getViewPort().resize()
		})
		this.mapGroup = new window.H.map.Group()
		const line = new window.H.geo.LineString()
		line.pushLatLngAlt(55.751574, 37.573856)
		line.pushLatLngAlt(55.751584, 37.575556)
		line.pushLatLngAlt(55.757584, 37.581556)
		line.pushLatLngAlt(55.758584, 37.583556)
		line.pushLatLngAlt(55.768584, 37.603556)
		line.pushLatLngAlt(55.759584, 37.608556)

		const line1 = new window.H.geo.LineString()
		line.pushLatLngAlt(55.251574, 37.473856)
		line.pushLatLngAlt(55.251584, 37.475556)
		line.pushLatLngAlt(55.257584, 37.481556)
		line.pushLatLngAlt(55.258584, 37.483556)
		line.pushLatLngAlt(55.268584, 37.403556)
		line.pushLatLngAlt(55.259584, 37.408556)

		this.mapGroup.addObject(
			new window.H.map.Polyline(line, {
				style: {
					fillColor: '#FFFFCC',
					strokeColor: '#829',
					lineWidth: 3,
				},
			})
		)
		// var circle = new H.map.Circle({ lat: 52.51, lng: 13.4 }, 8000)
		// this.mapGroup.addObject(
		// 	new window.H.map.Circle(circle, {
		// 		style: {
		// 			fillColor: '#cf4e4e',
		// 			strokeColor: '#829',
		// 			lineWidth: 3,
		// 		},
		// 	})
		// )
		// this.map.addObject(circle)
		this.map.addObject(this.mapGroup)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.eventListener)
	}

	render() {
		return <div id="here-map" style={{ width: '90%', height: '250px', background: 'grey' }} />
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
	testAction: () => dispatch(testAction(1)),
})

export const MapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleHereMap)
