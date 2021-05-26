ecr-login: 
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

devel-build:
	docker-compose -f docker-compose-devel.yml build

devel-push: ecr-login devel-build
	docker-compose -f docker-compose-devel.yml push

devel-pull:
	docker-compose -f docker-compose-pull-devel.yml pull 

devel-deploy: devel-pull
	docker-compose -f docker-compose-pull-devel.yml down && docker-compose -f docker-compose-pull-devel.yml up -d
