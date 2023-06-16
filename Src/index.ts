import express from "express";
import { mainLayout } from "./MainLayout/mainLayout";
import "./Utils/db";
import path from "path";
import fileUpload from "express-fileupload";
import { MAIN_PORT } from "./Config";
const app = express();
const PORT = Number(MAIN_PORT) | 5000;

// *Serve the files in the 'uploads' folder as static files
const dir = __dirname + "/uploads";
app.use("/Dist/uploads", express.static(path.join(dir)));

// * fileUpload
const upload = fileUpload();

// * Use the file upload middleware
app.use(upload);

//*Main Function to start app
mainLayout(app);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
