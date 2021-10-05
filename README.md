# Description

Ceci est un site comparateur de matériel dentaire à destination des dentistes dévellopé par Ethic pour M. Enzo VASCONI.

# Variables d'environnement

* Set to production when deploying to production, and development when being in development
NODE_ENV=development

* root of the project (must be an absolute path, to match the static delivery of file with res.send from express)
PROJECT_ROOT=E:\data\cours\ethic\dentaire\workspace\Ethic\ETIC

* Node.js server configuration for the port
SERVER_PORT=8080

* config directory for the server
NODE_CONFIG_DIR=./config/app

* mongoDB url for connection
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority

Le format des url de connections (pour le local) peux aussi être de la forme : mongodb://mongodb0.example.com:27017, si il n'y a pas d'authentification.

Extrait de la doc pour les mots de passes : (https://docs.mongodb.com/manual/reference/connection-string/)

If the username or password includes the following characters:

: / ? # [ ] @

those characters must be converted using percent encoding

# Commandes

Vous avez besoin de run 'npm install' avant de faire quelque chose d'autre pour avoir les dependances. Toutes les commandes suivantes seront invoquées avec 'npm run' à la racine du projet (exemple : 'npm run build-server-dev').

## Développement

### Build l'application

#### Application serveur

'build-server-dev' pour build l'application serveur dans le dossier 'build_server/'.

#### Application client

'build-client-dev'pour build l'application client dans le dossier 'build/'.

### Build et start

Ces commandes build une partie ou les deux application et lance le serveur. La commande 'start' load le module dotenv directement.

#### Application serveur

'server-dev:start' build l'application serveur et lance le serveur (attention, l'application client doit être build avant).

#### Application client

'client-dev:start' build l'application client et lance le serveur (attention, l'application serveur doit être build avant).

#### Application serveur et client

'dev:start' build les deux applications et lance le serveur. Cette commande peut être lancée aussi avec 'dev'.

### Commande avec nodemon (removed)

Nodemon est un addon qui permet de reload les commandes aux changements de fichiers. Pour faciliter le développement du serveur, on peux donc utiliser la commande 'server-dev'(attention, l'application client doit être build avant).
Cette commande a été enlevée parce que Nodemon ne restart pas completement le serveur et le port utilisé est toujours occupé après.

## Production

Les commandes de productions ne sont pas implémentées.

# Explication des fichiers et dossiers

## Serveur Express

Le code source du serveur est située dans le dossier 'src_server/'. Il est build dans le dossier 'build_server/'. Le code est en typescript et dépends de la configuration 'config/tsconfig_for_server.json'(pour le moment seulement en développement). Pour faciliter le développement, tsint est utilisé. C'est un package qui durcis les régles de syntaxes. Ce module dépends de la config 'config/tslint.json'.

## Front en react

Le code source du front se situs dans le dossier 'src/'. Il est build dans le dossier 'build/'. React n'est pas configurable ('convention over configuration'). 

# Mis en place du serveur sous forme de container (TODO : version propre pour la prod)

doc : https://docs.docker.com/language/nodejs/build-images/

## Procédure
Pour build l'image : "docker build --tag node-docker ." (commande n°3)
avec après l'option --tag le nom de l'image.

Pour tag l'image (donner une version) : "docker tag node-docker:latest node-docker:v1.0.0"

Pour run l'image en mode détaché : "docker run -d -p 8080:8080 --name node --restart unless-stopped --network my-network node-docker"
Pour run l'image : "docker run -p 80:80 --name node --restart unless-stopped --network my-network node-docker" (commande n°4)

Pour acter des changements, il faut enlever l'image et le container :

Pour supprimer le container : "docker container rm -f node" (commande n°1)
Pour supprimer l'image : "docker image rm node-docker" (commande n°2)

## Atention

Attention à la cohérence des variables d'environement du dockerfile par rapport à l'instance mongo et au workspace)

## Mis à jour

Pour mettre à jour un serveur existant, il faut commencer par supprimer le container et l'image (dans cet ordre) node créer auparavant (commande 1 et 2), puis pull le git ("git pull", en démarrant l'agent ssh, cf doc technique). Enfin, il faut publier l'image (commande n°3) et run le container (commande n°4).

## script bash

Un script bash pour publish le serveur et le mettre à jour a été créé. Il utilise les commandes git et docker.
La commande est sous la forme :
./runDocker.sh environnement port detach

Pour plus d'information : [Cliquez ici](./runDocker.sh)
Exemple de commande : ./runDocker.sh development 80 false

# Description du back

Le back est un serveur express gérant la base du données du projet, ainsi que les connections, le traitement et la simplification des requête du front. Il est codé en typescript et dépends donc de dépendances de développement de type correspondant.

## Description des modules

### typescript

Ce module aporte une meilleur gestion des type et des erreurs. Le fichier de configuration n'a pas de nom standard pour éviter les erreurs de compatibilité avec react. Du coup, la commande de compilation est : 'tsc --project nom_config.json'

### dotenv

C'est le module de configuration de base (gestion des variables d'environnement). Il y a un fichier .env.sample (à copier/renommer en .env) pour exemple. Il est load à l'execution avec le parametre -r ('-r dotenv/config').

### config

C'est un module de configuration un peu plus poussé que dotenv. Dotenv ne permet pas des configurations qui ne change pas d'un environnement à l'autre. Les fichiers de configuration au format json sont contenue dans le dossier 'config/app/' et sont load par remplacement en commençant par 'default.json', puis par 'production.json' (si on est en environnement de production).

### cors

Ce module simplifie la gestion des cors et permet la communication entre les deux applications.

### typescript-logging

Ce module permet des log simples. En production, les log sont mis dans le fichier './{configFolder}/{jourActuel}'. {configFolder} est définis dans la configuration default 'log.folder'. {jourActuel} est un jour, un mois et une année. La configuration default 'log.nbFileMax' définis le nombre de jours max sauvegardés.

### mongodb

Ce module est un client mongo.

### safen

Ce module permet de sécuriser les données d'entrée de l'api (https://github.com/wan2land/safen).

### cson

Ce module permet l'édition de fichiers de config facilement lisible. 

## Routes et endpoint

**Une description détaillé des API se trouve sur l'endpoint "/api/descriptor" (uniquement quand l'application est déployée en développement) et [là](./descriptor.md)**

Les endpoints renverront au format JSON les eventuelles erreur sous la forme :

{
    "Error" : {
        "title" : "titreExemple",
        "message" : "Un message court décrivant ce qu'il se passe",
        "code" : "le code http"
    }
}

Toutes les routes commençant par '/api' en post sont les routes de l'API serveur. Toutes les autres renverront sur la page '404 not found'. Les endpoints de l'API serront donc de la forme 'adresse_server:port/api/*' avec * ci-dessous.

### Search

'search' est l'API de recherche.

### Item

'item' est l'API pour un item.