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
	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
			}
		})
	}
	render() {
		const {
			user,
			form: { getFieldDecorator },
		} = this.props

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item>{getFieldDecorator('name')(<Input placeholder="Наименование" />)}</Form.Item>
					<Form.Item>
						{getFieldDecorator('creted_at')(<DatePicker placeholder="Дата ввода в эксплуатацию" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('garantee_to')(<DatePicker placeholder="Гарантийный срок" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('work_to')(<DatePicker placeholder="Срок службы" />)}
					</Form.Item>
					<Form.Item>{getFieldDecorator('material')(<Input placeholder="Материал" />)}</Form.Item>
					<Form.Item>{getFieldDecorator('length')(<Input placeholder="Длина" />)}</Form.Item>
					<Form.Item>{getFieldDecorator('width')(<Input placeholder="Ширина" />)}</Form.Item>
					<Form.Item>
						{getFieldDecorator('id')(<Input placeholder="Идентификационный номер" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('type')(
							<Select placeholder="Тип оборудования">
								<Select.Option key={1} value="Газовое оборудование">
									Газовое оборудование
								</Select.Option>
								<Select.Option key={2} value="Оборудование водоснабжения">
									Оборудование водоснабжения
								</Select.Option>
								<Select.Option key={3} value="Оборудование теплоснабжения">
									Оборудование теплоснабжения
								</Select.Option>
							</Select>
						)}
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export const AddObjectModalComponent = Form.create({ name: 'add_element' })(Cabinet)
