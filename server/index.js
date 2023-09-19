import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// all the images and assests  are stored in this
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  app.post("/login/register",upload.single("picture"),register) // 
  app.post("/home/create",verifyToken,upload.single("picture"),createQues);

  app.use("/login",loginRoutes);
  app.use("/home",homeRoutes);
  app.use("/users",userRoutes);
  app.use("/ques",quesRoutes);

  const PORT = process.env.PORT || 6001;
  mongoose.set('strictQuery',true); // ignore warnings
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser : true,
      useUnifiedTopology : true,
    })
    .then(() => {
      app.listen(PORT,() => console.log(`Server Port ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

