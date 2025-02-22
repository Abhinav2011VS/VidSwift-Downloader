const { exec } = require("child_process");

module.exports = async function (req, res) {
    const url = req.query.url;

    if (!url) {
        res.status(400).json({ error: "You must provide a YouTube URL." });
        return;
    }

    // Run yt-dlp using child_process to fetch the best format download URL
    exec(`yt-dlp -f best -g ${url}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${error || stderr}`);
            res.status(500).json({ error: "Failed to retrieve video download URL." });
            return;
        }

        // Extract the download URL from yt-dlp's output
        const downloadUrl = stdout.trim();
        res.status(200).json({ downloadUrl });
    });
};
