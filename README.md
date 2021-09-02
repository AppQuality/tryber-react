# First install
- copy generate-devel-token.json.template into generate-devel-token.json


# Comandi disponibili
`npm start` per lo sviluppo
`npm run eslint` mostra gli errori del linter
`npm run test` esegue i test

# Applicazione
`src/App.tsx` contiene l'applicazione principale. se non è presente un token di autenticazione nel localstorage mostra il form di login, altrimenti gestisce il routing tramite `react-router-dom` 

# Storybook
`src/stories` contiene gli elementi. Vengono compilati in uno storybook con `npm run storybook`

# Componenti
`src/components` contiene i componenti. Utilizzano gli elementi nello storybook e contengono la logica

# Pagine
`src/pages` contiene le pagine. Utilizzano i componenti

# CD/CI
Alla creazione di una release su github viene costruita un immagine `template-node`, pushata su ECR con i tag `latest` e il valore del tag a cui la release associata, e viene fatto un rollout restart del deployment corrispondente in EKS

Al push/pull request su master vengono eseguiti i test

# Infrastruttura

La definizione è gestita tramite Terraform in [questo repository](https://bitbucket.org/appqdevel/terraform-crowd-config/src/poc-template/). Questa configurazione contiene diversi moduli per la gestione di EKS e ECR. La configurazione specifica per questa applicazione è contenuta nel file [poc_template.tf](https://bitbucket.org/appqdevel/terraform-crowd-config/src/poc-template/poc_template.tf) e il relativo modulo [_poc-template](https://bitbucket.org/appqdevel/terraform-crowd-config/src/poc-template/modules/_poc-template/)
