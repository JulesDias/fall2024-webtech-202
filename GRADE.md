
# Blogging application - ECE Webtech project

*introduction, pre-requisites, installation, usage...*

## Deliverables 

- Vercel URL: [*Democratic Liberty Hub*](https://fall2024-webtech-2022.vercel.app/)
- Supabase project URL: [*Supabase*](https://supabase.com/dashboard/project/pjlmkvoqhyhisjduyqvl)

## Authors

- *[*Jules DIAS*](https://www.linkedin.com/in/jules-dias-2347bb24b/), Cyber groupe 2*
- *[*Arthur BERRET*](https://www.linkedin.com/in/arthur-berret-b0aa411a5/), Cyber groupe 2*

## Evaluation

### Mandatory Tasks

* **Naming convention**
  * Grade: 1 points
  * Comments: Nous avons nommé nos variables de maniere logique mais pas constante sur tout le projet. 
  * Task feedback: 
* **Project structure**
  * Grade: 2 points
  * Comments: Nous avons suivi la structure classique du projet en APP router.
  * Task feedback: 
* **Git usage**
  * Grade: 2 points
  * Comments: Nous avons suivi les conventions au moment ou nous en avons pris connaissance. 
  * Task feedback: facile mais permet d'avoir un bon résumé de chacun des push.
* **Code quality**
  * Grade: 2 points
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Design, UX, and content**
  * Grade: 4 points
  * Comments: Nous avons réellement chercher à faire un site complet, agréable à utiliser avec des styles et des animations pertinentes.
  * Task feedback: medium, l'implémentation de certains éléments graphiques furent compliquées 

* **Home page**
  * Grade: 2 points
  * Comments: Nous avons utilisé un parallax pour une HomePage des plus impressionnante. De plus, la navigation est simple et intuitive.
  * Task feedback: 
* **Navigation**
  * Grade: 2 points
  * Comments: notre barre de navigation est classique et fonctionnelle. Elle regroupe tous les éléments requis
  * Task feedback: facile
* **Login and profile page**
  * Grade: 4 points
  * Comments: l'aspect graphique de nos pages de login, sign in et sign up restent et collent toujours au même univers que nous suivons et les différentes fonctionnalitées fonctionnent. Les utilisateurs restent connecté globalement grâce à un userContext et s'identifient grâce au module d'authentifiactation de supabase.
  * Task feedback: medium
* **Post creation and display**
  * Grade: 6 points
  * Comments: la création de posts se trouvent dans la rubrique du compte, forcant l'utilisateur a se connecter pour en créer. Il peut cependant lire tous les articles disponible sur la plateforme depuis la page page "browse article" sans pour autant pouvoir liker ou commenter. Tous les articles sont stockés dans la table "article" de notre base de donnée sur supabase
  * Task feedback: 
* **Comment creation and display**
  * Grade: 4 points
  * Comments: un utilisateur connecté peut lire et commenter tous les articles. 
  * Task feedback: 
* **Post modification and removal**
  * Grade: 4 points
  * Comments: Un utilisateur connecté peut modifier ou supprimer un de ses articles en allant sur sa page de compte, mais également modifier un article sur lequel il se trouve s'il en est l'auteur.
  * Task feedback:
* **Search**
  * Grade: 6 points
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Use an external API**
  * Grade: 2 points
  * Comments: Nous utilisons 2 API exterieures. La première pour le bandeau d'information visible depuis toutes les pages qui récupères les informations d'un site externe. La deuxième pour envoyer un mail sur une boite de reception depuis notre site depuis la page "contact us"
  * Task feedback:
* **Resource access control**
  * Grade: 6 points
  * Comments: Nous avons correctement implémenté le RLS depuis supabase. Un utilisateur ne peut supprimer et modifier que les publications dont il est l'auteur.
  * Task feedback: 
* **Account settings**
  * Grade: 4 points
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **WYSIWYG integration**
  * Grade: 2 points
  * Comments: Nous avons implémentés du "WYSIWYG" via le Rich Text Editor de la librairie [Tiptap](https://tiptap.dev/), qui est utilisé lors de la modification des post mais aussi lors de la création des post et des commentaires.
  * Task feedback: 
* **Gravatar integration**
  * Grade: 2 points
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Light/dark mode**
  * Grade: 2 points
  * Comments: Nous avons implémenté un mode sombre sur notre site en utilisant les context de React pour passer les informations dans l'ensemble du site
  * Task feedback: 

### Bonus Tasks

* **Likes on Posts**   
  * Grade: 2 points
  * Comments: Nous avons implémentés la possibliter de like/unlike une publication sur un modèle similaire aux commentaires
* **Use of 3D with Three.js**   
  * Grade: 4 points
  * Comments: Nous avons implémentés un globe 3D modélisé à l'aide de la bibliothèque [Three.js](https://threejs.org/) , l'animant pour ressembler au [Github Globe](https://github.com/globe)
* **Parallax Display**   
  * Grade: 3 points
  * Comments: Nous avons utilisé la bibliothèque [React-srping](https://www.react-spring.dev/) pour donner un effet de scroll fluide sur la page d'acceuil du site
* **Training Minigame**
  * Grade: 2 points
  * Comments: Fidèlement au jeu Helldivers 2, nous avons implémenté un minijeu d'entraînement. Il consiste en une suite d'actions via les flèches directionnelles. Nous avons donc du implémenter la gestion du clavier et un timer pour voir en combien de temps la séquence a été éxécuté.
* **Minijeu Vaisseau spatial**
  * Grade: 2 points
  * comments: Nous avons implémenté un mini-jeu basé depuis le site internet [spline](https://spline.design/) qui est accesible depuis la main page.

## Miscellaneous

### Course Feedback

Un petit axe d'amélioration serail d'avoir tous les cours dès le début de l'année. Sinon globalement le cours est très interessant.
### Project Reuse 

- [x] We authorize the professors to use our project as an example for the next year students (facultative).
