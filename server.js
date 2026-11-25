const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const Task = mongoose.model("Task", {
    name: String
});


app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


app.post("/tasks", async (req, res) => {
    const task = new Task({
        name: req.body.name
    });

    await task.save();
    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
