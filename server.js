const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/api/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        res.status(400).json({ error: "You must provide a YouTube URL." });
        return;
    }

    exec(`yt-dlp -f best -g ${url}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${error || stderr}`);
            res.status(500).json({ error: "Failed to retrieve video download URL." });
            return;
        }

        const downloadUrl = stdout.trim();
        res.status(200).json({ downloadUrl });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
