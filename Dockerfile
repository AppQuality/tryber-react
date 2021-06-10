FROM node:14


COPY package*.json ./

RUN npm install
RUN apt update
RUN apt install -y nginx
COPY nginx.config /etc/nginx/sites-available/default

COPY . .

RUN npm run build

CMD nginx -g 'daemon off;'
