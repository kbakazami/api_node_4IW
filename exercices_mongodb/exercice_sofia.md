### MongoDB Exercice
# Exercice N°1
#### Créez une base de données sample nommée "sample_db" et une collection appelée "employees".
Insérez les documents suivants dans la collection "employees":

````js
{
    name: "John Doe",
    age: 35,
    job: "Manager",
    salary: 80000
}

{
    name: "Jane Doe",
    age: 32,
    job: "Developer",
    salary: 75000
}

{
    name: "Jim Smith",
    age: 40,
    job: "Manager",
    salary: 85000
}
````
Sortie du shell + vue compass :
**Insérer image**

### Écrivez une requête MongoDB pour trouver tous les documents dans la collection "employees".
#### Requête
````js 
db.employees.find()
````
Résultat :

---

### Écrivez une requête pour trouver tous les documents où l'âge est supérieur à 33.
#### Requête
````js 
db.employees.find({"age": {$gt: 33}})
ou
db.employees.find({$expr: {$gt: ["$age", 33]}})
````
Résultat :

---

### Écrivez une requête pour trier les documents dans la collection "employees" par salaire décroissant.
#### Requête
````js 
db.employees.aggregate([
    {$sort: { salary:-1 } }
])
````
Résultat :

---

#### Écrivez une requête pour sélectionner uniquement le nom et le job de chaque document.
- Requête : ``db.employees.find()``
- Résultat :

#### Écrivez une requête pour compter le nombre d'employés par poste.
- Requête : ``db.employees.find()``
- Résultat :

#### Écrivez une requête pour mettre à jour le salaire de tous les développeurs à 80000.
- Requête : ``db.employees.find()``
- Résultat :