# Reflexión — EC1 F1 A2

**Nombre:** Gildardo Aarat Zapién Cortés  
**Expediente:** 23020220007  
**Asignatura:** Programación Backend con Frameworks  
**Institución:** Universidad Estatal de Sonora (UES)  

---

## 1. Función de Node.js
Node.js actúa como el entorno de ejecución (runtime) para JavaScript del lado del servidor, permitiendo ejecutar código fuera del navegador web. En este proyecto, Node.js proporciona acceso a las APIs del sistema operativo y del proceso (como `process.env` para leer variables de entorno, `process.exitCode` para comunicar códigos de salida al sistema y la API de temporizadores como `setTimeout`), además de gestionar el ciclo de eventos (Event Loop) que hace posible la ejecución no bloqueante y asíncrona.

## 2. Aportes de TypeScript
TypeScript aporta un sistema de tipado estático fuerte que valida el código durante el desarrollo y la compilación, detectando errores antes de llegar a producción. En esta práctica ayudó en:
- **Propiedades faltantes o tipos erróneos:** La interfaz `Task` exige `id: number`, `title: string`, `status: TaskStatus` y `createdAt: Date`. Si intentáramos asignar un texto al `id` o un estado distinto a `'pending' | 'completed'`, TypeScript marcaría el error inmediatamente.
- **Acceso a colecciones no seguro (`noUncheckedIndexedAccess`):** Obliga a contemplar que buscar un elemento en un arreglo o recuperar un elemento por índice puede devolver `undefined`.
- **Inmutabilidad preventiva:** El tipo `readonly Task[]` retornado por `listTasks()` previene que quien consuma el servicio modifique accidentalmente la colección interna mediante métodos mutables como `.push()` o `.splice()`.

## 3. Separación por responsabilidades (models, data, services, utils)
La separación en capas por responsabilidad (arquitectura modular) aporta mantenibilidad, desacoplamiento y escalabilidad:
- `models/`: Define la forma estructural y los contratos de datos de la aplicación (`Task`, `TaskStatus`). No contiene lógica de negocio ni datos.
- `data/`: Contiene el origen y almacenamiento en memoria de las tareas (`tasks: Task[]`).
- `services/`: Concentra la lógica de dominio y reglas de negocio (`listTasks`, `createTask`, `completeTask`, `deleteTask`, `listPendingTasks`). Evita que otras capas manipulen directamente la estructura de almacenamiento.
- `utils/`: Reúne funciones auxiliares transversales e independientes del dominio (como `delay` para pausas asíncronas y `getAppName` para lectura de variables de entorno).
- `index.ts`: Actúa exclusivamente como orquestador del flujo y punto de entrada sin mezclar reglas de negocio.

## 4. Diferencia entre función síncrona y función async
- **Función síncrona:** Se ejecuta de forma secuencial y bloqueante dentro del hilo principal de ejecución. Cada instrucción debe completarse antes de pasar a la siguiente (por ejemplo, `listTasks` o `completeTask` operan en memoria inmediatamente).
- **Función async:** Devuelve implícitamente una `Promise` y permite el uso de la palabra reservada `await`. Permite suspender la ejecución de la función hasta que la promesa se resuelva o rechace, sin bloquear el hilo principal de Node.js (por ejemplo, `main` y `delay(300)`). Esto es fundamental en backend para operaciones de E/S como consultas a bases de datos o peticiones HTTP.

## 5. Razón por la que `findTaskById` devuelve `Task | undefined`
Devuelve `Task | undefined` porque el método `.find()` de JavaScript retorna `undefined` si ningún elemento cumple con la condición de búsqueda (es decir, cuando no existe una tarea con el `id` solicitado). Al declarar explícitamente el tipo `Task | undefined`, TypeScript obliga al desarrollador a comprobar si el resultado existe antes de intentar acceder a sus propiedades (como `task.status`), previniendo excepciones en tiempo de ejecución del tipo `TypeError: Cannot read properties of undefined`.

## 6. Ventaja de leer `APP_NAME` desde `process.env`
Permite seguir los principios de las aplicaciones de doce factores (*The Twelve-Factor App*), separando la configuración del código fuente. Sus ventajas principales son:
- Permite cambiar el nombre, puertos, credenciales o entorno (desarrollo, pruebas, producción) sin modificar ni recompilar el código fuente.
- Protege información sensible que nunca debe estar fija en el repositorio (como secretos o claves).
- Facilita la inyección de configuración dinámica a través del sistema operativo, contenedores Docker o servicios en la nube.

## 7. Diferencia entre `pnpm start` y la secuencia `pnpm build` + `pnpm serve`
- `pnpm start` utiliza `tsx` para transpolar y ejecutar los archivos TypeScript (`src/index.ts`) en memoria al instante. Es ideal durante el desarrollo porque agiliza las pruebas sin generar artefactos en disco.
- La secuencia `pnpm build` + `pnpm serve` representa el flujo de producción: `pnpm build` corre `tsc`, validando tipos de forma exhaustiva y emitiendo código JavaScript estándar moderno en el directorio `dist/`. Luego, `pnpm serve` invoca a `node dist/index.js` directamente con el motor de Node.js, sin la sobrecarga de un transpiler en tiempo de ejecución.

## 8. Partes reutilizables al construir la API con Express
Prácticamente toda la lógica nuclear de esta práctica es 100% reutilizable en la siguiente actividad con Express:
- **`src/models/task.ts`:** Se reutiliza directamente como contrato de tipos para los controladores y servicios de la API.
- **`src/data/tasks.ts`:** Sirve como repositorio de datos en memoria mientras se integra una base de datos externa como MongoDB.
- **`src/services/task.service.ts`:** Se reutiliza íntegramente; los controladores de Express simplemente invocarán a `listTasks`, `createTask`, `completeTask`, `deleteTask`, etc., desacoplando el protocolo HTTP de las reglas de negocio.
- **`src/utils/`:** Las utilidades de configuración y entorno se mantienen para parametrizar el puerto del servidor (`PORT`), nombres y variables auxiliares.
