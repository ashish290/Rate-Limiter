"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (app) => {
    try {
        app.get("/", (req, res) => {
            res.json({
                ok: true,
                message: "Hello from small project!",
                userId: req.userId,
            });
        });
        app.use("/", (req, res) => {
            res.json({ msg: "Express working..." });
        });
    }
    catch (error) {
        console.log("Express Error :", error);
    }
};
