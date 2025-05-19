root folder needs a .env file
the structure of .env is like so:
NODE_ENV = development
PORT = 5001
MONGO_URI=mongodb+srv:// and the rest of mongodb url, past .net/name
JWT_SECRET= any secret word/key for encryption

will have to go into both backend and frontend folders to run npm i to get all dependencies.

to run everything from root folder "npm run dev"