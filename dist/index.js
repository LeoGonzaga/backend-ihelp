"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const express_1 = __importDefault(require("express"));
var app = express_1.default();
function home(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let dataHemominas = yield scrapHemominas(browser);
        res.json({ dataHemominas });
    });
}
;
let browser;
(() => __awaiter(this, void 0, void 0, function* () {
    browser = yield puppeteer_1.default.launch({});
}))();
function scrapHemominas(browser) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield browser.newPage();
        yield page.goto(`http://www.hemominas.mg.gov.br/`);
        let data = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.bolsasangue.span3 ")).map((data) => ({
                type: data.children[0].textContent,
                state: data.children[2].textContent,
                img: data.children[1].children[0].currentSrc,
            }));
        });
        yield page.close();
        return data;
    });
}
//# sourceMappingURL=index.js.map