const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/sendToArduino', (req, res) => {
    const { plantData } = req.body;

    axios.post('http://arduino.local/update', { plantData })
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.message));
});

module.exports = router;
