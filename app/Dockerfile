FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD ["npm","run", "dev"]