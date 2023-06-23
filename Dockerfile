FROM node:alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json

CMD npm start



### Multi stage for production

# FROM node:alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # --- Production Stage ---
# FROM node:alpine
# WORKDIR /app
# COPY --from=build /app/build ./build
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "build", "-l", "3000"]