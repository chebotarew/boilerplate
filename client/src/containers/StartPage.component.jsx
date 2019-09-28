import React from 'react'
import { Layout, Menu, Row, Col, Button } from 'antd'
import { MapContainer } from './Map.container'
import image1 from '../../assets/img/image_1.png'
import image2 from '../../assets/img/image_2.png'
import image3 from '../../assets/img/image_3.png'

export class StartPageComponent extends React.PureComponent {
	render() {
		const { openLogin } = this.props
		return (
			<div>
				<Row className="centered-text main-content-row" type="flex" align="middle">
					<Col xs={24} xl={12}>
						<h2 className="main-title">Цифровая платформа</h2>
						<p className="main-text">
							Сервис для организации, визуализации и анализа данных городских сетей. Принимайте
							эффективные решения на основе точных данных!
						</p>
						<Button type="primary" onClick={openLogin}>
							Начать работу
						</Button>
					</Col>
					<Col xs={24} xl={12} className="map-container">
						<MapContainer />
					</Col>
					<Col span={24}>
						<h2 className="main-title" style={{ textAlign: 'center' }}>
							Преимущества сервиса
						</h2>
					</Col>
					<Row type="flex" justify="center">
						<Col xs={24} xl={7} className="text-column">
							<img src={image1} className="main-img" />
							<h3 className="main-h3">Для руководителей</h3>
							<ul className="main-ul">
								<li>Полное понимание существующей сетевой инфраструктуры </li>
								<li>
									Учет региональной геоинформационной системы объектов инфраструктуры и уровня их
									изношенности
								</li>
								<li>
									Электронные модели систем тепло-, водо-, газо-, водоснабжения и водоотведения
								</li>
								<li>
									Формирование базы данных учитывающей ремонты, выполненные в течении «жизненного
									цикла» сетей
								</li>
								<li> Обработка и хранение данных об управляющих компаниях</li>
								<li> Обеспечение требуемого уровня информационной безопасности</li>
							</ul>
						</Col>
						<Col xs={24} xl={7} className="text-column">
							<img src={image2} className="main-img" />
							<h3 className="main-h3">Для исполнителей</h3>
							<ul className="main-ul">
								<li>Полное понимание существующего сетевого хозяйства </li>
								<li>Учет системы объектов и уровня их изношенности</li>
								<li> Постоянные актуальные данные о ресурсоснабжении</li>
								<li>
									Формирование базы данных, учитывающей плановые, аварийные, капитальные ремонты
								</li>
								<li>
									Механизм проведения инвентаризации систем тепло-, электро-, газо-, водоснабжения и
									водоотведения Обработка и хранение данных о потребителях
								</li>
								<li> Формирование отчетов в 1 клик</li>
							</ul>
						</Col>
						<Col xs={24} xl={7} className="text-column">
							<img src={image3} className="main-img" />
							<h3 className="main-h3">Для потребителей</h3>
							<ul className="main-ul">
								<li>Прогнозирование и оптимизация затрат на оборудование и эксплуатацию </li>
								<li>Актуальная информация о состоянии водо-, газо-, тепло-, электрооборудования</li>
								<li>
									Формирование базы данных учитывающей ремонты и обслуживание Возможность заказать
									сервисное обслуживание в 1 клик
								</li>
								<li>Оперативное решение аварийных ситуаций</li>
								<li>
									Полные и актуальные данные в режиме реального времени Формирование отчетов в 1
									клик
								</li>
							</ul>
						</Col>
					</Row>
				</Row>
			</div>
		)
	}
}
