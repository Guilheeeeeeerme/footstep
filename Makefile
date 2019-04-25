

create-network:
	docker network create footstep

#############################
#########	evccollect	#########
#############################
build-evccollect:
	docker build \
		-f evccollect.dockerfile \
		-t footstep/evccollect ./evccollect

stop-evccollect:
	docker container rm -f footstep-evccollect || true

run-evccollect: stop-evccollect
	docker run --network footstep \
		--name footstep-evccollect \
		-d -p 8080:80 \
		footstep/evccollect

run-evccollect-it: stop-evccollect
	docker run --network footstep \
		--name footstep-evccollect \
		-it -p 8080:80 \
		footstep/evccollect


build-events-parser:
	docker build \
		-f events-parser.dockerfile \
		-t footstep/events-parser ./events-parser

stop-events-parser:
	docker container rm -f footstep-events-parser || true

run-events-parser: stop-events-parser
	docker run --network footstep \
		--name footstep-events-parser \
		-d -p 8080:8080 \
		footstep/events-parser

run-events-parser-it: stop-events-parser
	docker run --network footstep \
		--name footstep-events-parser \
		-it -p 8080:8080 \
		footstep/events-parser

run-neo4j: 
	docker run --network footstep \
		--name footstep-neo4j \
		-d --publish=7474:7474 --publish=7687:7687 \
		--volume=$(HOMEPATH)/neo4j/data:/data \
		neo4j


run-neo4j-it: 
	docker run --network footstep \
		--name footstep-neo4j \
		-it --publish=7474:7474 --publish=7687:7687 \
		--volume=$(HOMEPATH)/neo4j/data:/data \
		neo4j

run-dev: run-evccollect run-events-parser
build-dev: build-evccollect build-events-parser

