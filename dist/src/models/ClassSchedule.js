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
var Classes_1 = __importDefault(require("./Classes"));
var ClassSchedule = /** @class */ (function () {
    function ClassSchedule() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], ClassSchedule.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], ClassSchedule.prototype, "class_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Classes_1.default; }, function (classEntity) { return classEntity.class_schedule; }),
        typeorm_1.JoinColumn({ name: 'class_id' }),
        __metadata("design:type", Classes_1.default)
    ], ClassSchedule.prototype, "class", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ClassSchedule.prototype, "week_day", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ClassSchedule.prototype, "from", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ClassSchedule.prototype, "to", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], ClassSchedule.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], ClassSchedule.prototype, "updated_at", void 0);
    ClassSchedule = __decorate([
        typeorm_1.Entity('class_schedule')
    ], ClassSchedule);
    return ClassSchedule;
}());
exports.default = ClassSchedule;
