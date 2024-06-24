# Utilisez une image de base officielle de Node.js
FROM node:20.14.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Installer ts-node et nodemon globalement
RUN npm install -g ts-node nodemon

# Copier le fichier de configuration TypeScript
COPY tsconfig.json ./

# Copier le reste des fichiers de l'application
COPY src ./src

# Construire le code TypeScript
RUN npm run build

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Définir la commande pour exécuter l'application en mode développement avec nodemon
CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/index.ts"]
