### Notes du cours de MongoDB et NodeJS

# NodeJS

---

NodeJS est un environnement qui sert à éxecuter du javascript (autre environnement → navigateur web), on peut l’executer en local côté serveur

npm - gestion de paquet

pnpm/yarn comme npm (la diff est l’expérience du dev, la syntaxe et les performances)

nodes_modules - répertoire de destination des dépendances des paquets

Node est équipé du module HTTP et on peut créer tout sans rien installer mais apr contre il va falloir tout recréer etc

Express - Framework web qui utilise ce qui est donné par node

MongoDB - Driver officiel de mongodb pour nodejs

Mongoose - ODM - Mapper les objets js avec les documents/collections - On peut donc gérer les collections et documents depuis le code et l’ODM apporte un cadre et une structure (imposer de bosser avec des schémas et models)

Exam fin de module - Droit aux notes qu’on aura prises

NVM - Avoir plusieurs versions de Node installées et pouvoir switch entre elles

[GitHub - coreybutler/nvm-windows: A node.js version management utility for Windows. Ironically written in Go.](https://github.com/coreybutler/nvm-windows#readme)

Si on ne passe pas de routes ça s’applique à toutes les routes

Si on utilise “use” à la place de “get”, permet d’intéragir avec toutes les requêtes entrantes

Données - [Kaggle: Your Machine Learning and Data Science Community](https://www.kaggle.com/)

Hébergeur de MongoDB - [MongoDB Atlas Database | Multi-Cloud Database Service](https://www.mongodb.com/atlas/database)

ReadMe de ce type : [npm: nodemon](https://www.npmjs.com/package/nodemon)

npm init pour créer un projet - Commande à lancer à l’intérieur d’un nouveau projet

Le fichier app.js contient nos routes :

```jsx
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const usersRoutes = require('./routes/users');

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/users', usersRoutes);
```

Nodemon ⇒ Watcher pour nodeJS / Express JS / Typescript etc

ORM ⇒ Ce qui fait le mapping entres les objets et la base de données

### Base de données

MongoDB est un système de gestion de base de données orientée document

Stockage en BSON - BinarySON - dans le json par exemple on a qu’un seul type pour stocker les chiffres alors qu’en BSON on a du décimal, du int etc

Le schéma est dynamique - On peut avoir plusieurs lignes avec pas les mêmes données à l’intérieur et champs

MongoDB ⇒ Pas de sql/pas de relations

Les données dans mongoDB ne sont pas stockées dans des tables mais dans des “fichiers” proches du json

Concept : Concept de collection et de document / on stock des documents dans des collections (dossier)

Une collection = Groupe de docs MongoDB → équivalent d’une table dans un système de gestion de base de données + les collections n’imposent pas de schéma

Les docs présents au sein d’une même collection peuvent avoir des champs différents mais généralement ils sont similaire ou usage similaire

Document ⇒ Ensemble de clés , valeur comme dans du json

Index - comme une page favoris où on met les données importantes pour se retrouver plus facilement

No sql comme MongoDB

Avantages :

- Pas de schéma
- Une structure claire et simple : objet
- Pas de jointure complexe
- Des requêtes imbriquées et dynamique (presque aussi performant que SQL)
-

docker compose p -d (-d permet de détacher le cmd sinon ça s’arrête direct)

# MongoDB - Requêtes

---

document ou tableau de document ⇒ format bson

Pour créer une collection à l’intérieur d’un document :

```jsx
db.createCollection('employees', {"collation": { "locale": "fr" }})
```

Si jamais on insère des données autre que nom/prénom on aura pas d’erreur car une bdd no sql

```jsx
db.etudiants.insertMany([
{"nom": "HALLOULI", "prenom": "Walid"},
{"nom": "LATTIER", "prenom": "Innocent"}
], {"ordered": false})
```

Fichier mongo.src ⇒ Permet de configurer des options etc

Quelques commandes :

Récupérer toutes les données : elle retourne un curseur (20 documents)

```jsx
 db.personnes.find()
```

De base il va afficher environ ~20 documents, en fonction de combien on en veut on peut le modifier grâce à ça mais ça ne dure que la durée de vie du mongo shell (si on veut le modifier de façon permanente il faut le faire dans les autres bdd) :

```jsx
DBQuery.shellBatchSize = 40
```

On peut formatter le rendu en fonction de ce qu’on veut en chainant les fonctions pour avoir un rendu curseur que l’on veut comme par exemple :

Ici le pretty permets de rendre le curseur plus joli (le rendu)

```jsx
db.personnes.find().limit(1).pretty()
```

## Opérateurs de comparaison

$eq ⇒ equal donc égalité stricte

```jsx
Les deux requêtes ici retournent la même chose
db.personnes.find({"age": 76})
db.personnes.find({"age": {$eq: 76}})
```

On peut passer un second paramètre, ça s’appelle une projection pour avoir le champ prénom qui est présent dans les documents. True/False ou 1/0 permet de dire oui ou non

Id est toujours à true donc si on le veut pas il faut le mettre à false si on ne le veut pas dans le rendu

```jsx
db.personnes.find({"age": {$eq: 76}}, {"prenom": true})

On peut aussi faire ça si on veut plusieurs champs en plus :
db.personnes.find({"age": {$eq: 76}}, {"prenom": true}; {"champ": true})
```

$ne ⇒ Différent de / Not equel

$gt ⇒ Supérieur stricte

$gte ⇒ Supérieur ou égal

$lt ⇒ lower than / Inférieur stricte

$lte ⇒ lower than or equals / Inférieur ou égal

$in ⇒ présence

$nin ⇒ Absence

Plusieurs exemples :

```jsx
Avoir l’age des personnes dont l’âge n’est pas de 76ans

db.personnes.find({"age": {$eq: 76}}, {"_id": false, "prenom": true})
```

```jsx
entre 70 et 80 inclus

db.personnes.find({"age": {$gte: 70, $lte: 80}}, {"_id": false, "prenom": true})
```

```jsx
Permet de voir que la valeur exite
$exists = https://www.mongodb.com/docs/atlas/atlas-search/exists/

db.personnes.find({ 
 "age": { 
   $exists: 1, 
   $nin: [70, 80] 
 } 
}, { 
 "_id": 0, 
 "prenom": 1, 
 "nom": 1 
})
```

### Opérateurs logiques

Énumérer les opérations dans un tableau ⇒ plus lisible

```jsx
Documents pour lesquels l'age est soit égal à 0 soit pas présent
$or
db.personnes.find({ $or: [{ 
    "age": { 
      $exists: 0 
    } 
 }, { 
    "age": 76
 }]  
}, { 
 "_id": 0, 
 "prenom": 1, 
 "nom": 1 
})
```

$where permet d’exucter du code js sous forme de chaine de caractères soit fonction

Le temps de requêtes peut être très long et c’est une fonction dangereuse

obj ou this c’est le document courant

```jsx
$expr permet mettre une expression sous cette forme : { $expr: { <expression> } }
expression est a remplacé par les opérateurs de comparaison
Exemple : db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )
```