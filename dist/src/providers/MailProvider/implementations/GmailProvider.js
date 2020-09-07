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
var nodemailer_1 = __importDefault(require("nodemailer"));
var HandleBarsTemplateProvider_1 = __importDefault(require("../../MailTemplateProvider/implementations/HandleBarsTemplateProvider"));
var EtherealMailProvider = /** @class */ (function () {
    function EtherealMailProvider() {
        this.from = 'defaltern@gmail.com';
        this.pass = 'fodassegmail@';
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            // host: 'smtp.gmail.com',
            // port: 465,
            // secure: true,
            auth: {
                user: this.from,
                pass: this.pass
            }
        });
    }
    EtherealMailProvider.prototype.sendMail = function (_a) {
        var to = _a.to, from = _a.from, subject = _a.subject, templateData = _a.templateData;
        return __awaiter(this, void 0, void 0, function () {
            var template, message, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        template = new HandleBarsTemplateProvider_1.default();
                        _c = (_b = this.transporter).sendMail;
                        _d = {
                            from: {
                                name: 'Equipe Teste',
                                address: 'teste@examples.com',
                            },
                            to: {
                                name: to.name,
                                address: to.email
                            },
                            subject: subject
                        };
                        return [4 /*yield*/, template.parse(templateData)];
                    case 1:
                        message = _c.apply(_b, [(_d.html = _e.sent(),
                                _d), function (error, info) {
                                if (error) {
                                    console.log(error);
                                    return { status: 'error' };
                                }
                                else {
                                    console.log('Email sent: ' + info.response);
                                    return { status: 'ok' };
                                }
                            }]);
                        return [2 /*return*/, message];
                }
            });
        });
    };
    return EtherealMailProvider;
}());
exports.default = EtherealMailProvider;
