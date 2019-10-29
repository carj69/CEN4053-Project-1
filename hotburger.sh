# Bash script to install and run the hotburger app

docker image build -t hotburger:v0.2 .
docker container run --detach --publish 80:80 --mount type=bind,source="$(pwd)"/logs.txt,target=/log.txt hotburger:v0.2
