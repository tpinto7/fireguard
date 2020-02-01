const express = require('express');
const cors = require('cors');
const vision = require('@google-cloud/vision');

const router = express();
router.use(cors());

router.get('/googleCloudAPI', async (req, res) => {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(req.body);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
});

router.listen(5000, () => console.log(`Listening on port 5000`));