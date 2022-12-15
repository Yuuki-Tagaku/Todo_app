/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dbAccessor.ts":
/*!***************************!*\
  !*** ./src/dbAccessor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBAccessor = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const pool = new pg_1.Pool({
    database: 'development',
    user: 'root',
    host: '127.0.0.1',
    port: 5432,
});
class DBAccessor {
    constructor() {
        this.get = async () => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'select * from public."TodoTasks"',
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.create = async (title) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
                    values: [(0, uuid_1.v4)(), title],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.update = async ({ uuid, title, status, }) => {
            console.log(uuid, title, status);
            const client = await pool.connect();
            try {
                const query = {
                    text: 'update public."TodoTasks" set title = $2, status=$3 where uuid = $1',
                    values: [uuid, title, status],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
        this.delete = async ({ uuid }) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'delete from public."TodoTasks" where uuid = $1',
                    values: [uuid],
                };
                await client.query(query);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                client.release();
            }
        };
    }
}
exports.DBAccessor = DBAccessor;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
app.use('/', (0, router_1.createRouter)());
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouter = void 0;
const express_1 = __webpack_require__(/*! express */ "express");
const dbAccessor_1 = __webpack_require__(/*! ./dbAccessor */ "./src/dbAccessor.ts");
const dbAccessor = new dbAccessor_1.DBAccessor();
const createRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', async (req, res) => {
        try {
            const resBody = await dbAccessor.get();
            res.status(200).send({ message: 'get success', resBody });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: 'get failed' });
        }
    });
    router.put('/', async (req, res) => {
        try {
            if (!req.body.title) {
                res.status(400).send({ message: 'title required' });
            }
            await dbAccessor.create(req.body.title);
            res.status(200).send({ message: 'create success' });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: 'create faild' });
        }
    });
    router.post('/:taskID', async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: 'body required' });
            }
            await dbAccessor.update({ uuid: req.params.taskID, ...req.body });
            res.status(200).send({ message: 'update success' });
        }
        catch (err) {
            res.status(400).send({ message: 'update faild' });
        }
    });
    router.delete('/:taskID', async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: 'body required' });
            }
            await dbAccessor.delete({ uuid: req.params.taskID });
            res.status(200).send({ message: 'delete success' });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: 'delete failed' });
        }
    });
    return router;
};
exports.createRouter = createRouter;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUF4RFcsb0JBQVksZ0JBd0R2Qjs7Ozs7Ozs7Ozs7QUM3REY7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZGJBY2Nlc3Nvci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBjb21tb25qcyBcInBnXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIGNvbW1vbmpzIFwidXVpZFwiIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBkYXRhYmFzZTogJ2RldmVsb3BtZW50JyxcbiAgdXNlcjogJ3Jvb3QnLFxuICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgcG9ydDogNTQzMixcbn0pO1xuXG5leHBvcnQgY2xhc3MgREJBY2Nlc3NvciB7XG4gIHB1YmxpYyBnZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIicsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXN1bHQucm93cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGNyZWF0ZSA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OlxuICAgICAgICAgICdpbnNlcnQgaW50byBwdWJsaWMuXCJUb2RvVGFza3NcIiAodXVpZCwgdGl0bGUsIFwiY3JlYXRlZEF0XCIsIFwidXBkYXRlZEF0XCIpIFZBTFVFUygkMSwgJDIsIGN1cnJlbnRfdGltZXN0YW1wLCBjdXJyZW50X3RpbWVzdGFtcCknLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkdjQoKSwgdGl0bGVdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyB1cGRhdGUgPSBhc3luYyAoe1xuICAgIHV1aWQsXG4gICAgdGl0bGUsXG4gICAgc3RhdHVzLFxuICB9OiB7XG4gICAgdXVpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gIH0pID0+IHtcbiAgICBjb25zb2xlLmxvZyh1dWlkLCB0aXRsZSwgc3RhdHVzKTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6XG4gICAgICAgICAgJ3VwZGF0ZSBwdWJsaWMuXCJUb2RvVGFza3NcIiBzZXQgdGl0bGUgPSAkMiwgc3RhdHVzPSQzIHdoZXJlIHV1aWQgPSAkMScsXG4gICAgICAgIHZhbHVlczogW3V1aWQsIHRpdGxlLCBzdGF0dXNdLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGNsaWVudC5xdWVyeShxdWVyeSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBkZWxldGUgPSBhc3luYyAoeyB1dWlkIH06IHsgdXVpZDogc3RyaW5nIH0pID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgIHRleHQ6ICdkZWxldGUgZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIiB3aGVyZSB1dWlkID0gJDEnLFxuICAgICAgICB2YWx1ZXM6IFt1dWlkXSxcbiAgICAgIH07XG4gICAgICBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHsgY3JlYXRlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG5jb25zdCBwb3J0ID0gMzAwMDtcblxuYXBwLnVzZSgnLycsIGNyZWF0ZVJvdXRlcigpKTtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgYXQgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2ApO1xufSk7IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBEQkFjY2Vzc29yfSBmcm9tICcuL2RiQWNjZXNzb3InO1xuXG5jb25zdCBkYkFjY2Vzc29yID0gbmV3IERCQWNjZXNzb3IoKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJvdXRlciA9ICgpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbiAgLy8gUmVhZFxuICByb3V0ZXIuZ2V0KCcvJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzQm9keSA9IGF3YWl0IGRiQWNjZXNzb3IuZ2V0KCk7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogJ2dldCBzdWNjZXNzJywgcmVzQm9keSB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6ICdnZXQgZmFpbGVkJyB9KVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gQ3JlYXRlXG4gIHJvdXRlci5wdXQoJy8nLCBhc3luYyAocmVxLHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXJlcS5ib2R5LnRpdGxlKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ3RpdGxlIHJlcXVpcmVkJyB9KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGRiQWNjZXNzb3IuY3JlYXRlKHJlcS5ib2R5LnRpdGxlKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogJ2NyZWF0ZSBzdWNjZXNzJ30pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvciAoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ2NyZWF0ZSBmYWlsZCd9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFVwZGF0ZVxuICByb3V0ZXIucG9zdCgnLzp0YXNrSUQnLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFyZXEuYm9keSkge1xuICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6ICdib2R5IHJlcXVpcmVkJ30pO1xuICAgICAgfVxuICAgICAgYXdhaXQgZGJBY2Nlc3Nvci51cGRhdGUoeyB1dWlkOiByZXEucGFyYW1zLnRhc2tJRCwgLi4ucmVxLmJvZHl9KTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogJ3VwZGF0ZSBzdWNjZXNzJ30pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiAndXBkYXRlIGZhaWxkJ30pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRGVsZXRlXG4gIHJvdXRlci5kZWxldGUoJy86dGFza0lEJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghcmVxLmJvZHkpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiAnYm9keSByZXF1aXJlZCd9KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGRiQWNjZXNzb3IuZGVsZXRlKHsgdXVpZDogcmVxLnBhcmFtcy50YXNrSUQgfSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1lc3NhZ2U6ICdkZWxldGUgc3VjY2Vzcyd9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ2RlbGV0ZSBmYWlsZWQnIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9