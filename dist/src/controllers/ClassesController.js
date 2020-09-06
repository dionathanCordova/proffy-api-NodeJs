"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var convertHourToMinutes_1 = __importDefault(require("../utils/convertHourToMinutes"));
var typeorm_1 = require("typeorm");
var Classes_1 = __importDefault(require("../models/Classes"));
var User_1 = __importDefault(require("../models/User"));
var ClassesController = /** @class */ (function () {
    function ClassesController() {
    }
    ClassesController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var classRepository, _a, week_day, subject, time, timeInMinutes, classes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        classRepository = typeorm_1.getRepository(Classes_1.default);
                        _a = request.query, week_day = _a.week_day, subject = _a.subject, time = _a.time;
                        if (!week_day || !subject || !time) {
                            return [2 /*return*/, response.status(400).json({ 'error': 'missing filters to search classes' })];
                        }
                        timeInMinutes = convertHourToMinutes_1.default(time);
                        return [4 /*yield*/, classRepository.find({
                                join: {
                                    alias: 'classes',
                                    innerJoin: { class_schedule: 'classes.class_schedule' },
                                },
                                where: function (qb) {
                                    qb.where('classes.subject ILIKE :subject', { subject: subject })
                                        .andWhere('class_schedule.week_day = :week_day', { week_day: week_day })
                                        .andWhere('class_schedule.from <= :timeInMinutes', { timeInMinutes: timeInMinutes })
                                        .andWhere('class_schedule.to > :timeInMinutes', { timeInMinutes: timeInMinutes });
                                },
                            })];
                    case 1:
                        classes = _b.sent();
                        return [2 /*return*/, response.json(classes)];
                }
            });
        });
    };
    ClassesController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, whatsapp, bio, subject, cost, schedule, classesRepository, userRepository, classSchedules, user, findClass, newClass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, id = _a.id, name = _a.name, whatsapp = _a.whatsapp, bio = _a.bio, subject = _a.subject, cost = _a.cost, schedule = _a.schedule;
                        classesRepository = typeorm_1.getRepository(Classes_1.default);
                        userRepository = typeorm_1.getRepository(User_1.default);
                        classSchedules = schedule.map(function (scheduleItem) {
                            return {
                                week_day: scheduleItem.week_day,
                                from: scheduleItem.from,
                                to: scheduleItem.to
                            };
                        });
                        return [4 /*yield*/, userRepository.findOne({
                                id: id
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error('User does no found');
                        }
                        user.bio = bio;
                        user.name = name;
                        user.whatsapp = whatsapp;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _b.sent();
                        findClass = classesRepository.createQueryBuilder("user")
                            .where("user.id = " + user.id)
                            .andWhere('class');
                        newClass = classesRepository.create({
                            user_id: id,
                            subject: subject,
                            cost: cost,
                            class_schedule: classSchedules,
                        });
                        return [4 /*yield*/, classesRepository.save(newClass)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json(newClass)];
                }
            });
        });
    };
    return ClassesController;
}());
exports.default = ClassesController;
