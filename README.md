## API Node 4IW

---

Ce projet est une application qui permet de gérer des groupes ainsi que des utilisateurs.

### Installation & Démarrage

---

1. En clonant le projet via github, il suffit de lancer cette commande à la racine du projet pour que toutes les dépendances s'installent
```shell
npm install
```

2. Ajouter le fichier .env à la racine du projet avec les constantes suivantes (*URI_DB correspond au cluster MongoDB que l'on peut créer en allant sur son compte sur MongoDB*)
```dotenv
PORT=
URI_DB=
```

3. Il faut également lancer le serveur grâce à cette commande pour que tout se mette en place
```shell
npm run start
```

### Utilisation

---

Comme il n'y a pas de front, toutes les requêtes se passent via postman avec les données à placer dans le body.

Il est possible de voir les différents endpoints disponible via la doc de swagger en allant sur ``/api-docs`` avec les différentes valeurs à mettre pour faire les tests

Les différents endpoints disponibles :
 
#### Endpoints utilisateurs :

- **GET** - /users - Récupérer tous les utilisateurs
- **POST** - /users - Créer un utilisateur
- **GET** - /users/{username} - Récupérer un utilisateur via son username
- **DELETE** - /users/{username} - Supprimer un utilisateur via son username
- **PUT** - /users/edit/{username} - Modifier un utilisateur via son username

#### Endpoints groups :

- **GET** - /groups - Récupérer tous les groupes
- **POST** - /groups - Créer un groupe
- **GET** - /groups/{name} - Récupérer un groupe via son nom
- **DELETE** - /groups/{name} - Supprimer un groupe via son nom
- **PUT** - /groups/additional-amount/{name} - Ajouter un montant à un groupe
- **PUT** - /groups/reduced-amount/{name} - Retirer un montant à un groupe

#### Endpoints Authentification :

- **POST** - /auth/signin - Se connecter
- **GET** - /auth/signout - Se déconnecter

### Architecture

--- 

Étant donné que nous n'avons que la partie back sur ce projet, cela se découpe de cette façon :

- **/exercices_mongodb/** - Exercices MongoDB ainsi que les notes prisent durant les différents cours
- **/logs/** - Fichiers de logs
- **/build/** - Le build de l'application

#### src/
- **/config/** - Les fichiers de configurations
- **/controllers/** - Les controllers pour nous permettre de gérer les appels à l'API
- **/database/** - Les models de nos entités
- **/interfaces/** - L'interface de nos entités
- **/queries/** - Les fichiers où l'ont fait nos requêtes
- **/routes/** - Les routes de notre API
- **index.ts** - Point d'entrée de notre application
- **swagger.json** - Configuration de la documentation de l'API grâce à Swagger

### Gestion des erreurs

---

S'il ya une erreur lors d'une requête, l'erreur en question sera stockée dans un fichier log dans le dossier ``logs`` et elle sera également affichée dans la console ainsi que sur postman.

Tout cela nous permets de comprendre l'erreur plus facilement et comprendre d'où elle vient pour pouvoir la résoudre.

### Outils utilisés

--- 

✔ [NodeJS](https://nodejs.org/) - Permet le développement de la partie Backend de l'application ainsi que l'API

✔ [Express.js](https://expressjs.com/fr/) - Améliore le développement sur Node

✔ [Typescript](https://www.typescriptlang.org/) - Permet de travailler avec JS dans un environnement strict et plus sécurisé

✔ [MongoDB](https://www.mongodb.com/fr-fr) - Base de donnée

✔ [Swagger](https://swagger.io/) - Permet de générer une doc pour l'API

✔ [Postman](https://www.postman.com/) - Permet de tester les différents endpoints

✔ [Github](https://github.com/) - Versionning

✔ [Winston](https://www.npmjs.com/package/winston) - Gestion des erreurs dans des fichiers logs

✔ [Express validator](https://express-validator.github.io/docs) - Gestion de la validation des données avant l'envoi

### Auteurs

--- 

- **Wivin STRUYS** *alias* [@kbakazami](https://github.com/kbakazami)
- **Sofia CHAUDHRY** *alias* [@AifosXI](https://github.com/AifosXI)
