import express from "express"
import dogsrouter from "./routes/dogsrouter.js"
import { filterAndFetch} from "./controllers/apiurl.js";

const app = express(); 

app.use(express.json())
// app.use(filterAndFetch )
app.use(dogsrouter)



export default app; 