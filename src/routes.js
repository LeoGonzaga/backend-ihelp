const express = require("express");
const routers = express.Router();
const SessionController = require("./controllers/SessionController");
const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");
const Home = require("../dist/index");
const auth = require("./middlewares/auth");

// routers.get("/", Home.home);
routers.post("/createAccount", UserController.createUser);
routers.post("/login", SessionController.login);
routers.post("/reset", UserController.recoveryPassword);
routers.get("/user/:userId", UserController.viewUser);
routers.put("/user/update/:userId", auth.auth, UserController.updateUser);
routers.get("/feed", PostController.viewPosts);
routers.post("/feed/create", auth.auth, PostController.createPost);
routers.delete("/feed/delete", auth.auth, PostController.deletePost);

module.exports = routers;
