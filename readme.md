# Gestion Stock Pixecurity

- Application qui **gère** l’inventaire du stock Pixecurity.
- Avoir une belle interface **intuitive** et **réactive**.
- **Stock** dans une base de données en ligne pour **la visu en temps réel**.

---

## Updates Notes

### Update 1.1.0

- Les catégories affichent maintenant les produits associés
- Ajout d'un menu contextuel pour les catégories afin de choisir une action (clique droit sur une catégorie)
- Redesign UI Recherche (drawer du formulaire de recherche)

### Update 1.0.1

- Ajout onglet pour la recherche (Par nom ou par code)
- Exclusion des produits sans fournisseur en recherche

---

## Techno

### Première vision perso

- Veille

  Pour créer une **belle interface** **intuitive** et **réactive**, il est recommandé d'utiliser un framework de développement d'interface utilisateur tel que `React`, `Angular` ou `Vue.js`. Ces frameworks permettent de créer des interfaces utilisateur interactives et réactives avec une grande facilité. Il est également possible d'utiliser des **bibliothèques de composants** pour faciliter la création de l'interface utilisateur.  

Étant donné que j’ai déjà des connaissance en **React** et en **Angular** je pense que je vais me diriger vers ces deux solutions. Pour ce qui est bibliothèque de composant, en React, il y a possibilité d’aller sur du `Next.js`, en Angular, le framework `Ionic` ou `Angular Material`.

Ayant plus d’expérience en Angular, je pense me diriger vers ce dernier.

### BDD

`Firebase` est un excellent choix pour stocker les données de votre application en ligne. Il est **gratuit** pour une utilisation limitée, ce qui est parfait pour une petite entreprise. Firebase offre une base de données en temps réel, une authentification utilisateur, un hébergement Web, ce qui est parfait pour les applications Web modernes.

Je suis très familier avec **Firebase** et _pour le peu de données qui sera utilisé_, son utilisation sera **gratuite**.

### Au final

J’ai décidé par mon expérience et par le vaste champ de possibilité du framework d’utiliser **Ionic Framework** avec de **l’angular**. Et pour ce qui est de la _bdd_, ayant une source sur **Axonaut**, nous utiliserons donc ce dernier étant aussi en communication avec PrestaShop.

## UI

### Aperçu

[Lien Figma](https://www.figma.com/file/Rp4Tik94UMbCaktovA47NV/Untitled?node-id=6%3A136&t=ZNRMgZsu2iJaFXNB-1)

### Accueil

La page d'accueil de l'application pourrait contenir des informations de base sur l'inventaire, telles que le nombre total d'articles, le nombre d'articles disponibles et les articles récemment ajoutés. La page devrait également inclure des liens vers des pages importantes de l'application, telles que la page de recherche d'articles.

### Recherche d’articles

La page de recherche d'articles devrait permettre aux utilisateurs de rechercher des articles en fonction de différents critères, tels que le nom de l'article, la catégorie, le fabricant, le modèle, etc. La page de recherche devrait également inclure une barre de recherche pour permettre aux utilisateurs de trouver rapidement un article spécifique.

### Détails de l’article

Les pages de détails de l'article devraient inclure des informations telles que la quantité disponible, le fabricant, le modèle, la date d'ajout, la catégorie, etc. Les pages de détails devraient également inclure des boutons d'action pour permettre aux utilisateurs de réserver, d'ajouter ou de supprimer des articles de l'inventaire.

### Détail - Messages contextuels

Pour aider les utilisateurs à comprendre les conséquences de leurs actions, il est important de fournir des messages d'erreur clairs et faciles à comprendre. Par exemple, si un utilisateur essaie de supprimer un article qui ne peut pas être supprimé, un message d'erreur devrait indiquer clairement pourquoi l'article ne peut pas être supprimé.

## Update par page

### Recherche

Il n'y a pas d'optimisation évidente à faire dans le code qui englobe les composants **form** et **results**, car il est très court et simple. Cependant, il serait possible d'ajouter des **fonctions supplémentaires** pour améliorer la convivialité de l'interface utilisateur, comme une **fonction de pagination** pour afficher des résultats de recherche en plusieurs pages. Et même aussi rajouter des **filtres de recherche avancés** après recherche simple (stock?).

Aussi rajouter un **système de selection multiple** pour par exemple sélectionner plusieurs élément pour les inclure dans une catégorie.

## Update global

### Classe Produit

Cela peut être utile de transformer les objets reçus de l'API en objets Produit si cela facilite leur utilisation et leur manipulation dans l'application.

Par exemple, si les données de l'API sont reçues sous forme de tableau d'objets avec des noms de propriétés différents de ceux que vous avez définis dans votre classe Produit, il peut être utile de transformer les objets de l'API en objets Produit qui correspondent à la structure attendue dans votre application.

Cela permet également de séparer la logique de l'API de la logique de l'application et de faciliter la maintenance et l'évolution de l'application. De plus, cela peut aider à rendre votre code plus lisible et plus facile à comprendre pour les autres développeurs qui travaillent sur le projet.

### Utilisation de la BDD Firebase

Pour faire un gestionnaire de mise à jour et pour des infos de statistique (comme pour l’ajout récent d’un article).

Aussi pour les catégories (faire une liaison, regrouper les id pour chaque catégories).

### Enum types de produit

Tout est dit dans le titre, il serait utile de faire une Enum globale pour la clarté du code.

## Updates

### Fonctionnement itération version

- Premier chiffre: Changements majeurs, globaux, refonte (aussi bien graphiques que fonctionnels).
- Deuxième chiffre: Ajouts de nouvelles fonctionnalités.
- Troisième chiffre: Bugs, updates de fonctionnalités, changements mineurs.

### Process

1. Le développement d’une update se passe sur la branche dev-x.x (ex: `dev-1.5`)
2. Tout ce qui est en dev reste en dev, pour tester le déploiement, exécuter la commande `npm run deploy-test`
3. Une fois la partie dev approuvée, tester sur la branche prod-x.x, exécuter la commande `npm run deploy-prod`, si le build n’est pas fonctionnel, faire un **rollback**.
4. Une fois tout approuvé, faire une **PR** (Pull Request).
5. Et ne pas oublier de changer la version dans le **package.json** (pas important)
