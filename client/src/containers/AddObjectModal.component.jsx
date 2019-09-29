import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { FrontUrls } from '../constants/FrontUrls.constant'
import { getUserSelector } from '../selectors/auth.selector'
import {
	Form,
	Input,
	DatePicker,
	Tooltip,
	Icon,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Button,
	AutoComplete,
} from 'antd'

export class Cabinet extends React.PureComponent {
	render() {
		const {
			user,
			form: { getFieldDecorator },
			coordinates,
			setData,
			object,
		} = this.props
		return (
			<div>
				<Form>
					<Form.Item>
						{getFieldDecorator('name', {
							initialValue: _.get(object, 'name', null),
						})(<Input placeholder="Наименование" onChange={setData('name')} />)}
					</Form.Item>
					{/* <Form.Item>
						{getFieldDecorator('creted_at', {
							initialValue: _.get(object, 'creted_at', null),
						})(
							<DatePicker placeholder="Дата ввода в эксплуатацию" onChange={setData('creted_at')} />
						)}
					</Form.Item> */}
					<Form.Item>
						{getFieldDecorator('material', {
							initialValue: _.get(object, 'material', null),
						})(<Input placeholder="Материал" onChange={setData('material')} />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('id', {
							initialValue: _.get(object, 'id', null),
						})(<Input placeholder="Идентификационный номер" onChange={setData('id')} />)}
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export const AddObjectModalComponent = Form.create({ name: 'add_element' })(Cabinet)
