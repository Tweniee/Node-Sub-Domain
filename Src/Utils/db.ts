import { connect } from "mongoose";
import { DB_URI } from "../Config/index";

connect(DB_URI)
  .then(() => console.log("Server side MongoDB connected"))
  .catch((error) => console.log(error));
