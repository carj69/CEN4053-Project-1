#Reference https://docs.docker.com/compose/

# Create a volume
docker volume create logVolume


# build and start the containers using yaml file.
docker-compose build -d
docker-compose up

# To stop use
# docker-compose down