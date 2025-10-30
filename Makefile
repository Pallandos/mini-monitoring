IMAGE_NAME=mini-monitoring

.PHONY: build

build:
	docker build -t $(IMAGE_NAME) .