require('dotenv').config();

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const conectarMongo = require('./config/MongooseConfig.js');

const userRouter = require('./routes/userRoutes.js');
const autenticacionRouter = require('./routes/autenticacionRoutes.js');
const archivoRouter = require('./routes/archivoRouter.js');
const postRouter = require('./routes/postRoutes.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Rutas
app.use(userRouter);
app.use(autenticacionRouter);
app.use(archivoRouter);
app.use(postRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    conectarMongo();
});
