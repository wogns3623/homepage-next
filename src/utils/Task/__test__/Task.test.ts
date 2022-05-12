import Task from '../Task';

export async function testTask() {
  const task = new Task<string>();

  console.log(task);

  await task
    .resolve('task')
    .then(str => {
      console.log('1', { str });
      return 'task2';
    })
    .then(str2 => {
      console.log('2', { str2 });
      return 3;
    });

  console.log(task);
}
