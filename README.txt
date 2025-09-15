# prueba-login-k6
Prueba de rendimiento del servicio login con K6

# Instrucciones de ejecución de la prueba de rendimiento con K6

## Requisitos previos
- Sistema operativo: Windows 11 Pro
- K6 version 1.2.3
- Git instalado: 2.46.0


### En Windows:
1. Descargar el instalador desde: https://github.com/grafana/k6/releases
2. Descomprimir el archivo ZIP.
3. Agregar la ruta del ejecutable 'k6.exe' a las variables de entorno (PATH).
4. Validar la instalación ejecutando: k6 version

## Pasos de ejecución
1. Clonar el repositorio:
   git clone https://github.com/evelynbalseca/proyecto_k6.git

2. Ingresar al directorio local padre:
   cd ..../prueba-login-k6

3. Validar que exista el archivo CSV con usuarios en /data/users.csv

4. Ejecutar la prueba:
   k6 run scripts/login_test.js
   
5. Generar reporte de consola en textSummary.txt:
   k6 run scripts/login_test.js > reports/textSummary.txt

6. Revisar métricas en consola o reportes:
   - TPS alcanzados
   - Latencias (p95 < 1.5s)
   - Tasa de error (<3%))