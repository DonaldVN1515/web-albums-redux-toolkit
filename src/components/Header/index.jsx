import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Col, Row, Button } from 'reactstrap';

function Header(args) {
	return (
		<Container>
			<Row style={{ padding: '10px 0px' }}>
				<Col>
					<NavLink to='/'>DonaldVN</NavLink>
				</Col>

				<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button color='white'>
						<NavLink to='photo/add'>Add New</NavLink>
					</Button>
					<Button color='white'>
						<NavLink to='sign-up'>Sign up</NavLink>
					</Button>
					<Button color='primary'>
						<NavLink to='sign-in'>Sign In</NavLink>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Header;
