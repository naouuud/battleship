require("./style.css");
const Game = require("./Game");
const Board = require("./Board");
const Player = require("./Player");
const Settings = require("./Settings");
const DOM = require("./DOM");

const game = Game(Board, Settings, Player, DOM);
game.start();
