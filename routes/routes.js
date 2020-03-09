const express = require('express');
const router = express.Router();
const eventController = require("../controller/events");
const users = require("../controller/users");
const history = require("../controller/history")
const register = require("../auth/Auth")
const rooms = require("../controller/rooms")


//history routes
router.post('/history',history.registerHistory);
router.get('/history',history.getHistory);
router.get('/history/:room',history.getHistoryByRoom);

//eventLog routes
router.post('/eventLog', eventController.registerEvents);
router.get('/eventLog',eventController.getEvents);

//users routes
router.put('/users/room/:user',users.editRoom);
router.post('/users',users.registerUsers);
router.put('/users/:user',users.editOne);
router.get('/users/',users.getusers);
router.get('/users/:room',users.getUserByRoom );

//registration routes
router.post('/register',register.register);
router.get('/me',register.getMe)

//login routes
router.post('/login',register.login);
router.get('/logout',register.logout);

//room route
router.get('/rooms',rooms.getRooms);
router.post('/rooms',rooms.createRoom);
router.put('/rooms/:name',rooms.editRoom);
router.get('/rooms/:name',rooms.getOneRoom);
router.post('/rooms/:name',rooms.delets)


module.exports = router;