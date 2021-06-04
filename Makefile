ecr-login: 
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

env-restore:
	cat src/config.json.bak > src/config.json
	rm src/config.json.bak

prod-build:
	docker-compose build
	
devel-build:
	docker-compose -f docker-compose-devel.yml build

devel-push: ecr-login devel-build
	docker-compose -f docker-compose-devel.yml push
	make env-restore
	
push: ecr-login prod-build
	docker-compose push
	make env-restore

devel-pull: ecr-login
	docker-compose -f docker-compose-pull-devel.yml pull 
	
pull: ecr-login
	docker-compose -f docker-compose-pull.yml pull 

devel-deploy: devel-pull
	docker-compose -f docker-compose-pull-devel.yml down && docker-compose -f docker-compose-pull-devel.yml up -d
	
deploy: pull
	docker-compose -f docker-compose-pull.yml down && docker-compose -f docker-compose-pull.yml up -d
