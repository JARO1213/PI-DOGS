import express from "express"
import dogsrouter from "./routes/dogsrouter.js"

import { filterAndFetch} from "./controllers/dogControllers.js";


const app = express(); 
app.use(express.json())
app.use(dogsrouter)
app.use(filterAndFetch)






export default app; 