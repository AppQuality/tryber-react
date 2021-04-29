import React from "react"
import { Container, Grid, Col } from '../stories/layout/Layout'
import { Card } from '../stories/card/Card'
import { Button } from '../stories/button/Button'
import { SignupForm } from "../features/SignupForm";
import I18n from '../I18n'

export interface PageInterface {
  location: string
}

export default function GettingStarted({location}: PageInterface) {
  return (
		<Container>
      <h2><I18n t="become-a-tester" /></h2>
			<Grid>
				<Col size={8}>
        <Card>
					<Grid gutter={0}>
						<Col size={5}>
							<SignupForm location={location}/>
						</Col>
						<Col size={1}></Col>
						<Col size={5}>
							<p><I18n t="signup-with-social" /></p>
							<p><I18n t="signup-with-social-description" /></p>
							<Button type="primary" size="block" ><I18n t="facebook" /></Button>
							<Button type="secondary" size="block" flat={true}><I18n t="linkedin" /></Button>
						</Col>
					</Grid>
          </Card>
				</Col>
			</Grid>
		</Container>
	);
}
