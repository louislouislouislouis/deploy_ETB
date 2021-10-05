# this script execute the command to build the docker image and run it
# input  :
#   environnement -> 2 possibles values : development, production
#   port -> a port
#   detach -> 2 possible values : true, false -> launch the container in detach mode or in normal mode

NAME_IMAGE=node-docker
NAME_CONTAINER=node

ENV=$1
PORT=$2
DETACH=$3


deleteDocker(){
    docker container rm -f $NAME_CONTAINER || : # || : -> ignore the error
    docker image rm $NAME_IMAGE || : 
}

if [[ "$ENV" == "development" || "$ENV" == "production" ]]; then
    deleteDocker
    # run the build of the node src
    npm run preprodbuild    
    echo "build the image"
    docker build --tag $NAME_IMAGE --build-arg env=$ENV --build-arg port=$PORT .
    if [ $? -ne 0 ]
    then
        exit
    fi
    echo "build the container"
    if [ $DETACH ]; then
        docker run -d -p $PORT:$PORT --name $NAME_CONTAINER --restart unless-stopped --network my-network $NAME_IMAGE
    else
        docker run -p $PORT:$PORT --name $NAME_CONTAINER --restart unless-stopped --network my-network $NAME_IMAGE
    fi
else
    exit
fi
