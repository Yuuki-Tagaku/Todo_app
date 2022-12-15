initn:
	podman network create docker-network

initv:
	podman volume create db.data

up-db:
	podman-compose -f ./docker-compose.db.yml up -d
	
down-db:
	podman-compose -f ./docker-compose.db.yml down
