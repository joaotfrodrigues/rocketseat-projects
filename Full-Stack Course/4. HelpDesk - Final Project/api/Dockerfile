FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client for Linux inside the container
RUN npx prisma generate

# Build TypeScript into dist/
RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]

