# Welcome to the workshop!

First steps -- make sure you have the following software installed and working on your computer BEFORE coming to the workshop. 

- I will be using VSCode, which will be the easiest to support
- Docker Desktop (also installing the Docker extension if you're using VSCode) + an account with Docker
- Robo T3 to be able to connect to and view our database 
- an OMDB API key 

# Here before the workshop and wanna look into some resources? 
- [Quick Apollo & Graphql overview from a previous talk of mine](https://sleepy-swartz-93552b.netlify.com/)
- [Prisma: What / Why / How](https://www.prisma.io/docs/understand-prisma/prisma-introduction-what-why-how-j9ff/)
- [Overview of docker-compose](https://docs.docker.com/compose/)
- [What is a JWT](https://jwt.io/introduction/)

# Branch order
Each branch will contain the completed and working code from the last branch, so if you get stuck and wanna keep up, just move forward to the next branch!
1. base
2. setup-prisma-and-docker
3. authentication
4. creating-playlists
5. restdatasource-and-media
6. completed

# Commands to get everything working 
(if you want to run the full app, make sure you are on the completed branch)
Server: 
- `cd server`
- `npm install`
- `cd prisma`
- `prisma deploy`
- `cd server` 
- `npm start`

Client: 
- `cd client`
- `npm install`
- `npm start`
