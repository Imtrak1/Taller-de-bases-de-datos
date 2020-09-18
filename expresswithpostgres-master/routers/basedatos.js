const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'mmwfcdoihgzlgp',
  host: 'ec2-54-160-202-3.compute-1.amazonaws.com',
  database: 'd8fbchg08ctlot',
  password: '3331de60a6791db12547129e15115b9254a308ca3697f3bf62e801d9009b6d67',
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/eliminar', async (req, res) =>{
  const {numid} = req.body;
 await pool.query(
   `DELETE FROM pacientes WHERE numid = '${numid}'`
 );
 res.send('BORRADO OK !!!');
});

router.post('/actualizar', async(req, res) => {
  const {nombre, apellido, numid} = req.body;
  await pool.query(
    `UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}' WHERE numid = '${numid}'`
  );
  res.send('actualizado');
});



