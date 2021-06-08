---
title: TypeScriptでのPromise直列実行
date: 2021-06-08T17:11:09+09:00
---

```typescript
const createTask = (result: string, delay: number) => () =>
  new Promise<string>((resolve) => setTimeout(() => resolve(result), delay));

const createTasks = () => [
  createTask("very long task", 400),
  createTask("long task", 300),
  createTask("short task", 200),
  createTask("very short task", 100),
];

const handler = async (
  label: string,
  handler: (ps: (() => Promise<string>)[]) => Promise<string[]>
) => {
  console.time(label);
  await handler(createTasks()).then((res) => console.log("res", res));
  console.timeEnd(label);
};

const test = async () => {
  await handler("parallel", (tasks) =>
    Promise.all(tasks.map((task) => task()))
  );
  await handler("series", (tasks) => series(tasks));
};

const series = <T extends unknown>(promises: (() => Promise<T>)[]) =>
  promises.reduce(
    async (prev, current) =>
      prev.then(async (res) => [...res, await current()]),
    Promise.resolve<T[]>([])
  );

test();
```

```
res [ 'very long task', 'long task', 'short task', 'very short task' ]
parallel: 407.913ms
res [ 'very long task', 'long task', 'short task', 'very short task' ]
serial: 1.003s
```
