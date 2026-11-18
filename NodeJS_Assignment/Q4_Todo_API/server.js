const http = require('http');

let tasks = [];
let nextId = 1;

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.split('/').filter(Boolean);

  if (req.method === 'GET' && url.pathname === '/tasks') {
    return sendJSON(res, 200, tasks);
  }

  if (parts[0] !== 'tasks' || parts.length > 2) {
    return sendJSON(res, 404, { message: 'Route not found' });
  }

  const id = Number(parts[1]);
  const task = tasks.find(item => item.id === id);

  if (req.method === 'DELETE' && parts.length === 2) {
    if (!Number.isInteger(id) || !task) return sendJSON(res, 404, { message: 'Task not found' });
    tasks = tasks.filter(item => item.id !== id);
    return sendJSON(res, 200, { message: 'Task deleted' });
  }

  if ((req.method === 'POST' && parts.length === 1) ||
      (req.method === 'PUT' && parts.length === 2)) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10000) req.destroy();
    });
    req.on('end', () => {
      let data;
      try { data = JSON.parse(body); }
      catch { return sendJSON(res, 400, { message: 'Invalid JSON' }); }

      if (req.method === 'POST') {
        if (typeof data.title !== 'string' || !data.title.trim()) {
          return sendJSON(res, 400, { message: 'Please provide a task title' });
        }
        const newTask = { id: nextId++, title: data.title.trim(), completed: false };
        tasks.push(newTask);
        return sendJSON(res, 201, newTask);
      }

      if (!Number.isInteger(id) || !task) return sendJSON(res, 404, { message: 'Task not found' });
      task.completed = true;
      return sendJSON(res, 200, task);
    });
    return;
  }

  sendJSON(res, 404, { message: 'Route not found' });
});

server.listen(3001, () => {
  console.log('To-do API running at http://localhost:3001');
});
