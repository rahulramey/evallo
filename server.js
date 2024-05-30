import dotenv from 'dotenv';
import connectDB from './backend/db/dataConnection.js';
import {app} from './backend/app.js'
dotenv.config({
    path: "./backend/.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`MongoDB connection failed!! Error: ${error}`);
})