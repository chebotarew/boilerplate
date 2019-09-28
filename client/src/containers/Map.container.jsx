import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { testAction } from '../actions/root.actions'
import { Layout, Menu, Button, Icon } from 'antd'
const e = React.createElement
const points = [
	{ lat: 55.75847673671506, lng: 37.59200221660737 },
	{ lat: 55.75822922181223, lng: 37.5940246022046 },
	{ lat: 55.758473718250066, lng: 37.594185534745 },
	{ lat: 55.758814803312475, lng: 37.594190899163 },
	{ lat: 55.75912570125726, lng: 37.59393340709809 },
	{ lat: 55.75927058488974, lng: 37.593080464631356 },
	{ lat: 55.75985615075357, lng: 37.59304291370515 },
	{ lat: 55.76015194872359, lng: 37.59192711475495 },
	{ lat: 55.759572175285946, lng: 37.59070569761141 },
	{ lat: 55.75881757297028, lng: 37.5893163133417 },
	{ lat: 55.75787580879802, lng: 37.58954161889895 },
	{ lat: 55.75774299407218, lng: 37.59120995290621 },
	{ lat: 55.758482524861364, lng: 37.59199315793856 },
]

const linePoints = [
	{ lat: 55.75801721953088, lng: 37.58504993084088 },
	{ lat: 55.7572505128899, lng: 37.587184969216736 },
	{ lat: 55.75679168910852, lng: 37.58831149700299 },
	{ lat: 55.75632078540431, lng: 37.58935219410077 },
	{ lat: 55.75610344331551, lng: 37.58984572055951 },
	{ lat: 55.75543329758394, lng: 37.591422859460266 },
]
const linePoints1 = [
	{ lat: 55.7575765159808, lng: 37.58623010280735 },
	{ lat: 55.757322958256765, lng: 37.58597261074192 },
	{ lat: 55.75723843864909, lng: 37.586058441430396 },
	{ lat: 55.75712373317428, lng: 37.5859511530698 },
	{ lat: 55.75705128743743, lng: 37.585811678201026 },
	{ lat: 55.756924507074096, lng: 37.58568293216831 },
	{ lat: 55.75677961472565, lng: 37.585543457299536 },
]

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
			center: { lat: 55.75985615075357, lng: 37.59304291370515 },
			zoom: 14,
		})
		var events = new window.H.mapevents.MapEvents(this.map)
		// eslint-disable-next-line
		var behavior = new window.H.mapevents.Behavior(events)
		// eslint-disable-next-line
		var ui = new window.H.ui.UI.createDefault(this.map, layer)
		this.eventListener = window.addEventListener('resize', () => {
			this.map.getViewPort().resize()
		})
		// this.mapGroup = new window.H.map.Group()
		// this.addPolygon(points, '#' + Math.floor(Math.random() * 16777215).toString(16) + '85')
		// const mapGroup = new window.H.map.Group()
		// const line = new H.geo.LineString()
		// linePoints.forEach(coordinate => {
		// 	line.pushLatLngAlt(coordinate.lat, coordinate.lng)
		// })
		// const polyline = new window.H.map.Polyline(line, {
		// 	style: {
		// 		lineWidth: 2,
		// 		strokeColor: '#18de29',
		// 	},
		// })
		// const mapGroup1 = new window.H.map.Group()
		// const line1 = new H.geo.LineString()
		// linePoints1.forEach(coordinate => {
		// 	line1.pushLatLngAlt(coordinate.lat, coordinate.lng)
		// })
		// const polyline1 = new window.H.map.Polyline(line, {
		// 	style: {
		// 		lineWidth: 2,
		// 		strokeColor: '#18de29',
		// 	},
		// })
		// mapGroup.addObject(polyline)
		// mapGroup1.addObject(polyline1)
		// this.map.addObject(this.mapGroup)
		// this.map.addObject(mapGroup)
		// this.map.addObject(mapGroup1)
	}

	addPolygon = (data, color) => {
		const line = new H.geo.LineString()

		data.forEach(coordinate => {
			line.pushLatLngAlt(coordinate.lat, coordinate.lng)
		})

		this.mapGroup.addObject(
			new H.map.Polygon(line, {
				style: {
					fillColor: color,
					strokeColor: color,
					lineWidth: 3,
				},
			})
		)
		this.map.addObject(this.mapGroup)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.eventListener)
	}

	render() {
		return <div id="here-map" style={{ width: '95%', height: '250px', background: 'grey' }} />
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
