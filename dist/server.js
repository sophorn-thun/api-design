"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var auth_1 = require("./modules/auth");
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var user_1 = require("./handlers/user");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    console.log('hello');
    res.status(200);
    res.json({ message: 'hello' });
});
app.use('/api', auth_1.protect, router_1.default);
app.post('/user', user_1.createUser);
app.post('/signin', user_1.signin);
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    }
    else {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map