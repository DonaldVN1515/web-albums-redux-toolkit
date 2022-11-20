import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

function Header(args) {
	return (
		<Container>
			<Row style={{ padding: '20px 0px' }}>
				<Col>
					<NavLink to='/'>DonaldVN</NavLink>
				</Col>

				<Col>
					<NavLink to='photo/add'>Add New</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default Header;
