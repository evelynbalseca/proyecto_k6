import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Cargar datos desde CSV
const users = new SharedArray('usuarios', function () {
  const f = open('../data/users.csv');
  return f.split('\n').slice(1).map(line => {
    const [user, passwd] = line.split(',');
    return { user: user.trim(), passwd: passwd.trim() };
  });
});

// Configuración de la prueba
export const options = {
  scenarios: {
    carga_login: {
      executor: 'constant-arrival-rate',
      rate: 20,                // 20 solicitudes por segundo (TPS)
      timeUnit: '1s',          
      duration: '30s',          // correr 30 segundos
      preAllocatedVUs: 50,     // threads preasignados
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% < 1.5s
    http_req_failed: ['rate<0.03'],    // tasa de error < 3%
  },
};

export default function () {
  // seleccionar usuario aleatorio
  const user = users[Math.floor(Math.random() * users.length)];

  const request = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

// Hacemos la petición de login, donde se envia la URL, Request y params::y se espera obtener el response
  const response = http.post('https://fakestoreapi.com/auth/login', request, params);

  check(response, {
    'status es 200': (r) => r.status === 200,
    'respuesta en < 1.5s': (r) => r.timings.duration < 1500,
  });

  sleep(1);
}
