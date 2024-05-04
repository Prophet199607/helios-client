FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

ENV VITE_APP_API_URL="http://34.87.29.178:8888/api/v1/"

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
