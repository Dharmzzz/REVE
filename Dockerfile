# Stage 1: Build the React + TypeScript frontend
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json tsconfig*.json vite.config.ts ./
RUN npm install
COPY index.html ./
COPY styles.css ./
COPY public ./public
COPY src ./src
RUN npm run build

# Stage 2: Python FastAPI backend serving API & built React frontend
FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY server ./server
COPY Eco_Friendly_Shoes_Chatbot_Training.pdf ./
COPY assets ./assets
COPY --from=build-stage /app/dist ./dist

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn server.app:app --host 0.0.0.0 --port ${PORT}"]
