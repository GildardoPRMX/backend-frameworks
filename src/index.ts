import {
  createTask,
  completeTask,
  deleteTask,
  listPendingTasks,
  listTasks
} from './services/task.service.js';
import { delay } from './utils/delay.js';
import { getAppName } from './utils/env.js';
import type { Task } from './models/task.js';

const showTasks = (tasksToDisplay: readonly Task[] = listTasks()): void => {
  const rows = tasksToDisplay.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString()
  }));
  console.table(rows);
};

const main = async (): Promise<void> => {
  console.log(`\n${getAppName()}`);
  console.log('Iniciando aplicación...');
  await delay(300);

  console.log('\nTareas iniciales');
  showTasks();

  const newTask = createTask('Construir mi primer servicio');
  console.log(`Tarea creada con id ${newTask.id}.`);
  completeTask(newTask.id);
  console.log(`Tarea ${newTask.id} completada.`);

  console.log('\n--- Desafío Individual: Filtrar tareas pendientes ---');
  const pendingTasks = listPendingTasks();
  console.log(`Total de tareas pendientes encontradas: ${pendingTasks.length}`);
  showTasks(pendingTasks);

  console.log('\n--- Desafío Individual: Eliminar tarea existente ---');
  const removedTask = deleteTask(newTask.id);
  console.log(`Eliminación exitosa: Tarea id ${removedTask.id} ("${removedTask.title}") fue eliminada.`);

  console.log('\n--- Desafío Individual: Intento de eliminar tarea inexistente ---');
  try {
    deleteTask(888);
  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'Ocurrió un error desconocido.';
    console.error(`Error controlado al eliminar: ${message}`);
  }

  console.log('\n--- Prueba de error controlado al completar id inexistente ---');
  try {
    completeTask(999);
  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'Ocurrió un error desconocido.';
    console.error(`Error controlado: ${message}`);
  }

  console.log('\nEstado final');
  showTasks();
};

main().catch((error: unknown) => {
  console.error('Error no controlado:', error);
  process.exitCode = 1;
});
