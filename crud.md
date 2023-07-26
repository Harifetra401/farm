# Documentation de Flutter pour créer un CRUD avec Node.js et MySQL

## Introduction

Cette documentation vous guidera à travers les étapes nécessaires pour créer un CRUD (Create, Read, Update, Delete) en utilisant Flutter pour le frontend et Node.js avec MySQL pour le backend. Flutter est un framework open-source développé par Google pour créer des applications mobiles multiplateformes. Node.js est une plateforme basée sur le moteur JavaScript V8 de Chrome, permettant de construire des applications réseau rapides et évolutives, tandis que MySQL est un système de gestion de base de données relationnelle populaire.

Nous utiliserons Node.js avec Express pour créer une API RESTful qui gérera les opérations CRUD sur les données côté serveur, tandis que Flutter s'occupera de l'interface utilisateur côté client.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

1. Flutter SDK : [Instructions d'installation de Flutter](https://flutter.dev/docs/get-started/install)
2. Node.js : [Site officiel de Node.js](https://nodejs.org/) (installez la version LTS recommandée)
3. MySQL : [Site officiel de MySQL](https://www.mysql.com/) (installez le serveur MySQL)

## Étapes du CRUD avec Flutter, Node.js et MySQL

### Étape 1 : Créer le backend avec Node.js et MySQL

1. Créez un nouveau répertoire pour votre projet Node.js.
2. Initialisez le projet Node.js en exécutant la commande suivante dans le répertoire :

```bash
npm init
```

3. Installez les dépendances nécessaires pour votre projet, notamment Express (un framework Web pour Node.js), MySQL (un pilote MySQL pour Node.js) et body-parser (pour analyser les données JSON) :

```bash
npm install express mysql body-parser --save
```

4. Créez un fichier `app.js` pour configurer votre application Node.js avec Express, définir les routes pour les opérations CRUD et se connecter à la base de données MySQL.

Exemple de `app.js` :

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Remplacez par le port de votre choix

// Middleware
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur_mysql',
  password: 'votre_mot_de_passe_mysql',
  database: 'votre_base_de_donnees_mysql',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Routes pour les opérations CRUD
// Exemple : Ajouter une nouvelle tâche
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const insertQuery = `INSERT INTO tasks (title, description) VALUES ('${title}', '${description}')`;

  db.query(insertQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Une erreur est survenue lors de l\'ajout de la tâche.');
    } else {
      res.status(200).send('Tâche ajoutée avec succès !');
    }
  });
});

// Ajoutez les autres routes pour les opérations CRUD (GET, PUT, DELETE)

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
});
```

### Étape 2 : Configurer la base de données MySQL

1. Assurez-vous que votre serveur MySQL est en cours d'exécution.
2. Connectez-vous à votre serveur MySQL à l'aide d'un client MySQL (par exemple, MySQL Workbench) et créez une nouvelle base de données nommée `votre_base_de_donnees_mysql`.
3. Créez une table `tasks` dans la base de données avec les colonnes `id`, `title` et `description`. Vous pouvez utiliser la requête SQL suivante :

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);
```

### Étape 3 : Créer le frontend avec Flutter

1. Créez un nouveau projet Flutter en utilisant la commande suivante dans votre terminal :

```bash
flutter create mon_projet_flutter
cd mon_projet_flutter
```

2. Ouvrez le fichier `pubspec.yaml` et ajoutez la dépendance nécessaire pour effectuer des requêtes HTTP vers votre API Node.js :

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^0.13.3 # Remplacez par la version actuelle de http
```

Ensuite, exécutez la commande suivante pour obtenir la dépendance :

```bash
flutter pub get
```

3. Créez des fichiers pour gérer les appels d'API dans Flutter, par exemple `api_service.dart` :

```dart
import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

class ApiService {
  final String apiUrl;

  ApiService({@required this.apiUrl});

  Future<dynamic> createTask(Map<String, dynamic> taskData) async {
    final response = await http.post(Uri.parse(apiUrl + '/tasks'),
        headers: {"Content-Type": "application/json"}, body: jsonEncode(taskData));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Échec de la création de la tâche.');
    }
  }

  // Ajoutez des méthodes pour effectuer les autres opérations CRUD (GET, PUT, DELETE)
}
```

### Étape 4 : Utiliser l'API Node.js avec MySQL dans l'application Flutter

Maintenant que nous avons créé l'API Node.js avec MySQL et le service d'appels d'API dans Flutter, utilisons-les dans notre application Flutter pour effectuer les opérations CRUD.

### Étape 5 : Tester l'application

Testez votre application en ajoutant, mettant à jour, supprimant et récupérant des tâches via l'API Node.js avec MySQL.

## Conclusion

Félicitations ! Vous avez maintenant créé un CRUD en utilisant Flutter pour le frontend et Node.js avec MySQL pour le backend. Vous pouvez étendre cette base pour créer des fonctionnalités plus avancées, ajouter l'authentification utilisateur, etc. N'hésitez pas à explorer et à approfondir vos connaissances en Flutter, Node.js et MySQL pour développer des applications mobiles puissantes et évolutives