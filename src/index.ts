import 'dotenv/config'
import {app} from "./setting";
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log('starting to port: ' + port)
})