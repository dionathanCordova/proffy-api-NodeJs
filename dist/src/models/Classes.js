"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var ClassSchedule_1 = __importDefault(require("./ClassSchedule"));
var Classes = /** @class */ (function () {
    function Classes() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Classes.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Classes.prototype, "subject", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Classes.prototype, "cost", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Classes.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }, function (user) { return user.classes; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.default)
    ], Classes.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return ClassSchedule_1.default; }, function (classSchedule) { return classSchedule.class; }, {
            cascade: ['insert'],
        }),
        __metadata("design:type", Array)
    ], Classes.prototype, "class_schedule", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Classes.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Classes.prototype, "updated_at", void 0);
    Classes = __decorate([
        typeorm_1.Entity('classes')
    ], Classes);
    return Classes;
}());
exports.default = Classes;
