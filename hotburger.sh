#Reference https://docs.docker.com/compose/

# Create a volume
docker volume create logVolume

# build and start the containers using yaml file.
docker-compose up -d build

# To stop use
# docker-compose down