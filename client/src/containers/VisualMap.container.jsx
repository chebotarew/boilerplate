import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { AddObjectModalComponent } from './AddObjectModal.component'
import { addObject } from '../actions/root.actions'

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
			pointData: null,
		}
	}
	componentDidMount() {
		const { poligons } = this.props

		this.platform = new window.H.service.Platform({
			app_id: 'UdRH6PlISTlADYsW6mzl',
			app_code: 'lfrrTheP9nBedeJyy1NtIA',
			useHTTPS: true,
		})

		var pixelRatio = window.devicePixelRatio || 1
		var layer = this.platform.createDefaultLayers({
			lg: 'rus',
			tileSize: pixelRatio === 1 ? 256 : 512,
			ppi: pixelRatio === 1 ? undefined : 320,
		})
		var container = document.getElementById('here-map')

		this.map = new window.H.Map(container, layer.normal.map, {
			center: { lat: 55.75843383728601, lng: 37.593343321114844 },
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
			// let data = evt.target.getData()

			// console.log(data)
			this.success(coordinates)
			// this.setState(state => ({
			// 	geo: [...state.geo, coordinates],
			// }))
			// this.drawLine(this.state.geo)
			// console.log(this.state.geo)
		})

		// var bubble;

		// function openSearchBubble(position, text){
		// if(!bubble){
		// bubble = new H.ui.InfoBubble(
		// position,
		// {content: text});
		// ui.addBubble(bubble);
		// } else {
		// bubble.setPosition(position);
		// bubble.setContent(text);
		// bubble.open();
		// }
		// }

		var bubble
		this.map.addEventListener('pointermove', evt => {
			if (evt.target instanceof H.map.Marker || evt.target instanceof H.map.DomMarker) {
				function openSearchBubble() {
					let position = evt.target.getPosition()
					let data = evt.target.getData()

					if (!bubble) {
						bubble = new H.ui.InfoBubble(position, {
							content: `<div> Наименование: ${data.name}</div> <div>Материал: ${data.material}</div> <div>Номер: ${data.id}</div>`,
						})
						ui.addBubble(bubble)
					} else {
						bubble.setPosition(position)
						bubble.setContent(
							`<div> Наименование: ${data.name}</div> <div>Материал: ${data.material}</div> <div>Номер: ${data.id}</div>`
						)
						bubble.open()
					}
				}
				openSearchBubble()
			} else {
				if (!bubble) {
					return null
				}
				bubble.close()
			}
		})

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
		// mapGroup.addObject(polyline)

		this.mapGroup = new window.H.map.Group()
		this.mapGroup.addEventListener('tap', function(evt) {
			// let data = evt.target.getData()
			console.log(evt)
		})
		// this.map.addObject(mapGroup)
		poligons.forEach(poligon => {
			this.addPolygon(poligon.points, poligon.color)
		})
	}

	componentDidUpdate(prevProps) {
		// this.props.markers.forEach(marker => {
		// 	this.drawMarker(marker)
		// })
		// if (this.props.marlers && this.props.marlers.length > 1) {
		// 	const mapGroup = new window.H.map.Group()
		// 	const line = new H.geo.LineString()
		// 	this.props.markers.forEach(marker => {
		// 		line.pushLatLngAlt(marker.coordinates)
		// 	})
		// 	const polyline = new window.H.map.Polyline(line, {
		// 		style: {
		// 			lineWidth: 2,
		// 			strokeColor: '#18de29',
		// 		},
		// 	})
		// 	mapGroup.addObject(polyline)
		// 	map.addObject(mapGroup)
		// }
	}

	drawMarker = data => {
		const svgMarkup = `<svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7 20.065C2.333 13.975 0 9.642 0 7.065C-1.36979e-08 6.14575 0.18106 5.2355 0.532843 4.38622C0.884626 3.53694 1.40024 2.76527 2.05025 2.11526C2.70026 1.46525 3.47194 0.949629 4.32122 0.597846C5.17049 0.246063 6.08075 0.0650024 7 0.0650024C7.91925 0.0650024 8.82951 0.246063 9.67878 0.597846C10.5281 0.949629 11.2997 1.46525 11.9497 2.11526C12.5998 2.76527 13.1154 3.53694 13.4672 4.38622C13.8189 5.2355 14 6.14575 14 7.065C14 9.642 11.667 13.975 7 20.065ZM7 11.065C8.06087 11.065 9.07828 10.6436 9.82843 9.89343C10.5786 9.14328 11 8.12587 11 7.065C11 6.00414 10.5786 4.98672 9.82843 4.23658C9.07828 3.48643 8.06087 3.065 7 3.065C5.93913 3.065 4.92172 3.48643 4.17157 4.23658C3.42143 4.98672 3 6.00414 3 7.065C3 8.12587 3.42143 9.14328 4.17157 9.89343C4.92172 10.6436 5.93913 11.065 7 11.065V11.065Z" fill="#208B78" fill-opacity="0.98"/>
		</svg>
		`,
			dotIcon = new window.H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } })

		const marker = new window.H.map.Marker(
			{
				lat: data.coordinates.lat,
				lng: data.coordinates.lng,
			},
			{ icon: dotIcon }
		)
		marker.setData(data)
		this.mapGroup.addObject(marker)
		this.map.addObject(this.mapGroup)
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

	onClickOk = () => {
		const { pointData, coordinates } = this.state
		const { addMarker, markers } = this.props
		const newMarkers = [...markers, { ...pointData, coordinates }]
		addMarker({ ...pointData, coordinates })
		newMarkers.forEach(marker => {
			this.drawMarker(marker)
		})
		if (this.props.marlers && this.props.marlers.length > 1) {
			const mapGroup = new window.H.map.Group()
			const line = new H.geo.LineString()

			newMarkers.forEach(marker => {
				line.pushLatLngAlt(marker.coordinates)
			})
			const polyline = new window.H.map.Polyline(line, {
				style: {
					lineWidth: 2,
					strokeColor: '#18de29',
				},
			})
			mapGroup.addObject(polyline)
			map.addObject(mapGroup)
		}
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

	setData = key => e => {
		this.setState({ pointData: { ...this.state.pointData, [key]: e.target.value } })
	}

	success = coordinates => {
		this.setState({ coordinates })
		Modal.success({
			title: 'Добавьте объект',
			content: <AddObjectModalComponent coordinates={coordinates} setData={this.setData} />,
			onOk: this.onClickOk,
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

const mapStateToProps = state => {
	return {
		poligons: state.root.poligons,
		markers: state.root.markers,
	}
}

const mapDispatchToProps = dispatch => ({
	addMarker: data => dispatch(addObject(data)),
})

export const VisualMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleHereMap)
