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
			zoom: 9,
		})

		var events = new window.H.mapevents.MapEvents(this.map)
		// eslint-disable-next-line
		var behavior = new window.H.mapevents.Behavior(events)
		// eslint-disable-next-line
		var ui = new window.H.ui.UI.createDefault(this.map, layer)
		this.eventListener = window.addEventListener('resize', () => {
			this.map.getViewPort().resize()
		})
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.eventListener)
	}

	render() {
		return <div id="here-map" style={{ width: '100%', height: '100vh', background: 'grey' }} />
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
