import React from "react"
import styled, {css, DefaultTheme} from "styled-components";
import { Container, BSGrid, BSCol, CSSGrid } from '../stories/layout/Layout'
import { Card } from '../stories/card/Card'
import { Button } from '../stories/button/Button'
import { SignupForm } from "../features/SignupForm"
import { useTranslation } from 'react-i18next'
import signupImage from './assets/group-236.png'
import {ParagraphProps} from "../stories/typography/Typography";

export interface PageInterface {
  location: string
}

export default function GettingStarted({location}: PageInterface) {
  const { t } = useTranslation();
  // API.me(token).then(redirect).catch(render page)
  return (
		<Container>
      <h2>{t("become-a-tester")}</h2>
			<BSGrid>
				<BSCol size='lg-8'>
					<div style={{marginBottom: '30px'}}>
						<Card>
							<CSSGrid gutter='50px' min='200px' maxWidth='500px'>
								<SignupForm />
								<div className='signup-with-email'>
									<p>{t("signup-with-social")}</p>
									<p>{t("signup-with-social-description")}</p>
									<div className="mb-2">
										<Button type="primary" size="block" flat >{t("facebook")}</Button>
									</div>
									<div className="mb-2">
										<Button type="secondary" size="block" flat>{t("linkedin")}</Button>
									</div>
									<img src={signupImage} />
								</div>
							</CSSGrid>
						</Card>
					</div>
				</BSCol>
			</BSGrid>
		</Container>
	);
}
