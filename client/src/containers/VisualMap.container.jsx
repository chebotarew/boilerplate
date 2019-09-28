import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { AddObjectModalComponent } from './AddObjectModal.component'

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
const points2 = [
	{ lat: 55.75964113894182, lng: 37.59013563723266 },
	{ lat: 55.759013311945935, lng: 37.590103450724484 },
	{ lat: 55.758802021741445, lng: 37.5907900962323 },
	{ lat: 55.75819832913511, lng: 37.591326538035275 },
	{ lat: 55.757787812824915, lng: 37.59139091105163 },
	{ lat: 55.75746784858662, lng: 37.59143382639587 },
	{ lat: 55.757322958256765, lng: 37.591079774805905 },
	{ lat: 55.75722032728075, lng: 37.59042531580627 },
	{ lat: 55.75725051288995, lng: 37.58965283960998 },
	{ lat: 55.75742558896269, lng: 37.58900910944641 },
	{ lat: 55.75758859011703, lng: 37.5882688197583 },
	{ lat: 55.75770933127359, lng: 37.58746415705383 },
	{ lat: 55.75773347946005, lng: 37.586573663660886 },
	{ lat: 55.75799910852426, lng: 37.586101594874265 },
	{ lat: 55.75845791810107, lng: 37.58617669672668 },
	{ lat: 55.759013311945935, lng: 37.58621961207092 },
	{ lat: 55.75938759464097, lng: 37.58603722185791 },
	{ lat: 55.759749800280424, lng: 37.58628398508728 },
	{ lat: 55.759979195445425, lng: 37.58701354593933 },
	{ lat: 55.760021452302304, lng: 37.58772164911926 },
	{ lat: 55.76005767242894, lng: 37.58888036341369 },
	{ lat: 55.760124075907015, lng: 37.58912712664306 },
	{ lat: 55.760045599057136, lng: 37.58973867029846 },
	{ lat: 55.7598644980316, lng: 37.58992106051147 },
	{ lat: 55.75964113894182, lng: 37.59013563723266 },
]

const points3 = [
	{ lat: 55.757129837238004, lng: 37.5938583052457 },
	{ lat: 55.75751621216808, lng: 37.59376174572117 },
	{ lat: 55.75811991533329, lng: 37.59386903408176 },
	{ lat: 55.75843383728601, lng: 37.593343321114844 },
	{ lat: 55.758614944955475, lng: 37.592560116082495 },
	{ lat: 55.75873568293453, lng: 37.591852012902564 },
	{ lat: 55.758687387787774, lng: 37.591079536706275 },
	{ lat: 55.75849420660261, lng: 37.59061819675571 },
	{ lat: 55.75821650697249, lng: 37.59041434887058 },
	{ lat: 55.75804143445026, lng: 37.590081754952735 },
	{ lat: 55.757757694555565, lng: 37.5894809401334 },
	{ lat: 55.75752828632296, lng: 37.588869396478 },
	{ lat: 55.757280765400665, lng: 37.588794294625586 },
	{ lat: 55.7569789084913, lng: 37.58901960018284 },
	{ lat: 55.75676157006993, lng: 37.589577499657935 },
	{ lat: 55.756459709142156, lng: 37.590307060509986 },
	{ lat: 55.75618803230961, lng: 37.59070402744419 },
	{ lat: 55.75621218143802, lng: 37.591315571099585 },
	{ lat: 55.75633896411687, lng: 37.59224897983677 },
	{ lat: 55.75636915040824, lng: 37.59292489650852 },
	{ lat: 55.756610639898106, lng: 37.59365445736057 },
	{ lat: 55.75704531721182, lng: 37.593836847573584 },
	{ lat: 55.757141911512505, lng: 37.593847576409644 },
]

const linePoints = [
	{ lat: 55.75801721953088, lng: 37.58504993084088 },
	{ lat: 55.7572505128899, lng: 37.587184969216736 },
	{ lat: 55.75679168910852, lng: 37.58831149700299 },
	{ lat: 55.75632078540431, lng: 37.58935219410077 },
	{ lat: 55.75610344331551, lng: 37.58984572055951 },
	{ lat: 55.75543329758394, lng: 37.591422859460266 },
]
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
			this.setState(state => ({
				geo: [...state.geo, coordinates],
			}))
			this.drawLine(this.state.geo)
			this.success()
			// console.log(this.state.geo)
		})

		const mapGroup = new window.H.map.Group()
		const line = new H.geo.LineString()
		linePoints.forEach(coordinate => {
			line.pushLatLngAlt(coordinate.lat, coordinate.lng)
		})
		const polyline = new window.H.map.Polyline(line, {
			style: {
				lineWidth: 2,
				strokeColor: '#18de29',
			},
		})
		mapGroup.addObject(polyline)

		this.mapGroup = new window.H.map.Group()
		this.map.addObject(mapGroup)

		this.addPolygon(points, '#' + Math.floor(Math.random() * 16777215).toString(16) + '85')
		this.addPolygon(points2, '#' + Math.floor(Math.random() * 16777215).toString(16) + '85')
		this.addPolygon(points3, '#' + Math.floor(Math.random() * 16777215).toString(16) + '85')
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
