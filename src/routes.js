const { Router } = require("express");


const SessionController = require("./controllers/SessionController");
const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");
const Home = require("../dist/index");
const auth = require("./middlewares/auth");

const routers = Router();

routers.get("/", Home.home);
routers.post("/createAccount", UserController.createUser);
routers.post("/login", SessionController.login);
routers.post("/reset", UserController.recoveryPassword);
routers.get("/user", auth.auth, UserController.viewUser);
routers.put("/user/update", auth.auth, UserController.updateUser)
routers.get("/feed", auth.auth, PostController.viewPosts);
routers.post("/feed/create", auth.auth, PostController.createPost);
routers.delete("/feed/delete", auth.auth, PostController.deletePost);

module.exports = routers;