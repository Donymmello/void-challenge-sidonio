const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const empresaRoutes = require('./routes/empresaRoutes');
const campanhaRoutes = require('./routes/campanhaRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const produtorRoutes = require('./routes/produtorRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Teste de servidor
app.get('/', (req, res) => res.send('API rodando!'));

// Rotas
app.use('/empresas', empresaRoutes);
app.use('/campanhas', campanhaRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/produtores', produtorRoutes);
app.use(errorHandler);

// Sincronizar models com banco
sequelize.sync({ alter: true }).then(() => console.log('Banco sincronizado com Sequelize!'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
