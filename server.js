const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/send-request', (req, res) => {
    const { platform, link, quantity } = req.body;

    // تنفيذ سكربت Python
    exec(`python bot.py ${platform} "${link}" ${quantity}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: "فشل التنفيذ!" });
        }
        console.log(stdout);
        res.json({ message: "تم تنفيذ الطلب بنجاح!" });
    });
});

app.listen(3000, () => {
    console.log("الخادم يعمل على http://localhost:3000");
});