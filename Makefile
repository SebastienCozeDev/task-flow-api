include .env
export

DOCKER_COMPOSE_CMD = docker compose

.PHONY: help build up exec stop down logs list-profiles list-services

help: ## Show the help message
	@echo "Syntax: make [target]"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Available targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

list-profiles: ## List the profiles defined in the Docker Compose file
	@echo "Available profiles:"
	@$(DOCKER_COMPOSE_CMD) config --profiles

list-services: ## List the services defined in the Docker Compose file
	@echo "Available services:"
	@$(DOCKER_COMPOSE_CMD) config --services

build: ## Build the Docker images
ifndef PROFILE
	@$(MAKE) list-profiles
	@echo "Please specify the profile: make build PROFILE=<profile_name> [SERVICE=<service_name>]"
else
ifdef SERVICE
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) up $(SERVICE) --build
else
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) up --build
endif
endif

up: ## Start the Docker containers
ifndef PROFILE
	@$(MAKE) list-profiles
	@echo "Please specify the profile: make up PROFILE=<profile_name> [SERVICE=<service_name>]"
else
ifdef SERVICE
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) up -d $(SERVICE)
else
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) up -d
endif
endif

exec: ## Execute a command in the Docker container
ifndef SERVICE
	@$(MAKE) list-services
	@echo "Please specify the service: make exec SERVICE=<service_name>"
else
	$(DOCKER_COMPOSE_CMD) exec $(SERVICE) bash
endif

stop: ## Stop the Docker containers
ifndef PROFILE
	@$(MAKE) list-profiles
	@echo "Please specify the profile: make stop PROFILE=<profile_name> [SERVICE=<service_name>]"
else
ifdef SERVICE
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) stop $(SERVICE)
else
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) stop
endif
endif

down: ## Bring down the Docker containers
ifndef PROFILE
	@$(MAKE) list-profiles
	@echo "Please specify the profile: make down PROFILE=<profile_name> [SERVICE=<service_name>]"
else
ifdef SERVICE
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) down $(SERVICE)
else
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) down
endif
endif

logs: ## Show the logs of the Docker containers
ifndef PROFILE
	@$(MAKE) list-profiles
	@echo "Please specify the profile: make logs PROFILE=<profile_name> [SERVICE=<service_name>]"
else
ifdef SERVICE
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) logs -f $(SERVICE)
else
	$(DOCKER_COMPOSE_CMD) --profile $(PROFILE) logs -f
endif
endif