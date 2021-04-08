import express from 'express'; 
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors(
    // origin: 'www.'
    // qual o dominio que pode acessar, quando a aplicação for subida
));
app.use(express.json());
app.use(routes); 

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333)