build:
	docker compose -f local.yml up --build -d --remove-orphans

up:
	docker compose -f local.yml up -d

down:
	docker compose -f local.yml down

down-v:
	docker compose -f local.yml down -v

show-logs:
	docker compose -f local.yml logs

show-logs-api:
	docker compose -f local.yml logs api

show-logs-web:
	docker compose -f local.yml logs web

user:
	docker run --rm mern-invoice-api whoami

volume:
	docker volume inspect mern-invoice_mongodb-data
