import React from "react";
import {Container,Grid,Col} from '../stories/layout/Layout';
import {Form,Field} from '../stories/form/Form';
import {Button} from '../stories/button/Button';
import I18n from '../I18n';

export default function GettingStarted() {
  return (
		<Container>
			<Grid>
				<Col size={8}>
					<Grid>
						<Col size={6}>
							<Form>
								<Field type="text" name="Nome" />
								<Field type="text" name="Cognome" />
								<Field type="email" name="Email" />
								<Field type="password" name="Password" />
								<p>La password deve etc</p>
								<Field type="checkbox" name="Accetto di ricevere" />
								<Field type="submit" name="iscriviti adesso" />
								<p>cliccando questo bottone etc</p>
							</Form>
						</Col>
						<Col size={6}>
							<p> Accedi con</p>
							<p> Collega Appq </p>
							<Button type="primary" flat={true}>Facebook</Button>
							<Button type="secondary" flat={true}>Linkedin</Button>
						</Col>
					</Grid>
				</Col>
			</Grid>
		</Container>
	);
}
