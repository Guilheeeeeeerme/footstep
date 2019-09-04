

remote:
	chmod 400 guilheeeeeeerme.pem
	ssh -i "guilheeeeeeerme.pem" ubuntu@ec2-13-59-175-92.us-east-2.compute.amazonaws.com

build:
	docker build -t api/footstep .

stop:
	docker stop -f footstep-api || exit 0
	docker rm -f footstep-api || exit 0

run: stop
	docker run \
		--name footstep-api \
		-p 5000:3000 \
		-d api/footstep

run-it: stop
	docker run \
		--name footstep-api \
		-p 5000:3000 \
		-it api/footstep