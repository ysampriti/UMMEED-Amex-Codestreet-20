"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApi = void 0;
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);
//initialize express server
const app = express();
const main = express();
//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
//initialize the database and the collection 
const db = admin.firestore();
const hospitalCollection = 'hospital';
//define google cloud function name
exports.webApi = functions.https.onRequest(main);
app.get('/hospitals', async (req, res) => {
    try {
        const hospitalQuerySnapShot = await db.collection(hospitalCollection).get();
        const hospitals = [];
        hospitalQuerySnapShot.forEach((doc) => {
            //     hospitals.push({
            //         Name: doc.Name,
            //         Address:doc.Address,
            //         PhoneNumber: doc.PhoneNumber,
            //         FreeVentilators: doc.FreeVentilators,
            //         FreeBeds: doc.FreeBeds
            // });
            console.log(doc);
        });
        res.status(200).json(hospitals);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//# sourceMappingURL=index.js.map