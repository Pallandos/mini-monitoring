IMAGE_NAME=mini-monitoring
VERSION ?= latest

.PHONY: build

build:
	docker build -t $(IMAGE_NAME) .

push: build
	docker tag $(IMAGE_NAME) $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)
	docker push $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)