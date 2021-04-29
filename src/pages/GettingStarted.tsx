import React from "react";
import {Container,Grid,Col} from '../stories/layout/Layout';
import {Card} from '../stories/card/Card';
import {Form,Field} from '../stories/form/Form';
import {Button} from '../stories/button/Button';
import I18n from '../I18n';

export interface PageInterface {
  location: string
}


export default function GettingStarted({location}:PageInterface) {
  return (
		<Container>
      <h2><I18n t="become-a-tester" /></h2>
			<Grid>
				<Col size={8}>
        <Card>
					<Grid>
						<Col size={6}>
							<Form>
								<Field type="text" name={I18n.getTranslation(location,"name")} />
								<Field type="text" name={I18n.getTranslation(location,"surname")} />
								<Field type="email" name={I18n.getTranslation(location,"email")} />
								<Field type="password" name={I18n.getTranslation(location,"password")} />
								<p><I18n t="password-requirements" /></p>
								<Field type="checkbox" name={I18n.getTranslation(location,"accept-to-receive-email")} />
								<Field type="submit" name={I18n.getTranslation(location,"signup-now")} />
								<p><I18n t="clicking-button-you-accept-tos" /></p>
							</Form>
						</Col>
						<Col size={6}>
							<p><I18n t="signup-with-social" /></p>
							<p><I18n t="signup-with-social-description" /></p>
							<Button type="primary" flat={true}><I18n t="facebook" /></Button>
							<Button type="secondary" flat={true}><I18n t="linkedin" /></Button>
						</Col>
					</Grid>
          </Card>
				</Col>
			</Grid>
		</Container>
	);
}
