# Task Manager Backend — EC1 F1 A2

Aplicación de consola modular construida con **Node.js**, **TypeScript** y **PNPM** para la gestión de tareas en memoria, correspondiente a la práctica guiada **EC1 F1 A2** de la asignatura *Programación Backend con Frameworks* (Universidad Estatal de Sonora).

---

## 🛠️ Tecnologías y Herramientas

- **Entorno de Ejecución:** Node.js (LTS v24)
- **Lenguaje:** TypeScript v7 (Configuración estricta NodeNext, ES2022)
- **Gestor de Paquetes:** PNPM v11
- **Ejecutor de Desarrollo:** TSX
- **Control de Versiones:** Git

---

## 📁 Estructura del Proyecto

```
task-manager-backend/
├── src/
│   ├── data/
│   │   └── tasks.ts          # Colección de tareas en memoria
│   ├── models/
│   │   └── task.ts           # Interfaz Task y tipo TaskStatus
│   ├── services/
│   │   └── task.service.ts   # Reglas de negocio (CRUD + desafío)
│   ├── utils/
│   │   ├── delay.ts          # Utilidad asíncrona con Promise
│   │   └── env.ts            # Lectura segura de process.env
│   └── index.ts              # Orquestador del flujo y punto de entrada
├── docs/
│   └── reflexion.md          # Respuestas fundamentadas a preguntas de cierre
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 🚀 Scripts Disponibles

En la raíz del proyecto se pueden ejecutar los siguientes comandos mediante `pnpm`:

| Script | Comando | Descripción |
|---|---|---|
| `pnpm dev` | `tsx watch src/index.ts` | Ejecuta en modo desarrollo con recarga automática ante cambios. |
| `pnpm start` | `tsx src/index.ts` | Ejecuta la aplicación directamente desde TypeScript con TSX. |
| `pnpm check` | `tsc --noEmit` | Verifica el tipado estricto sin generar archivos JavaScript. |
| `pnpm build` | `tsc` | Compila el código TypeScript a JavaScript en el directorio `dist/`. |
| `pnpm serve` | `node dist/index.js` | Ejecuta con Node.js el código previamente compilado en `dist/`. |

---

## ⭐ Desafío Individual Implementado

Se implementaron en `src/services/task.service.ts` y se probaron en `src/index.ts`:

1. **`listPendingTasks()`**: Filtra y retorna únicamente las tareas cuyo estado es `'pending'`.
2. **`deleteTask(id: number)`**: Busca y elimina una tarea existente por su identificador. Si el `id` no existe, lanza un `Error` descriptivo con el mensaje `No existe una tarea con el id ${id}.`
3. **Manejo controlado de errores**: Captura y despliega mensajes claros tanto para eliminaciones válidas como para intentos inválidos (id inexistente).

---

## 🧪 Pruebas de Variables de Entorno

Para probar la parametrización dinámica mediante variables de entorno:

- **PowerShell:**
  ```powershell
  $env:APP_NAME="Gestor de tareas UES"; pnpm start
  ```

---

## 📋 Evidencias de Cierre

- Documento de reflexión y preguntas teóricas: [`docs/reflexion.md`](docs/reflexion.md)
- Autor: **Gildardo Aarat Zapién Cortés** (Expediente: `23020220007`)
- Institución: **Universidad Estatal de Sonora (UES)**
