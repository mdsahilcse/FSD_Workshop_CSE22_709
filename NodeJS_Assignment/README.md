# Node.js Programming Assignment
**Subject:** Server-Side Development with Node.js (FSD-I)  
**Class:** B.Tech – 2nd Year

This folder contains simple solutions to all five questions. Each question is in a separate folder.

## Requirements
Install Node.js (LTS version). Check with `node -v`.

## Q1: EventEmitter & Event Loop
**File:** `Q1_School_Bell/bell.js`  
Run: `node Q1_School_Bell/bell.js`

**Explanation:** The school bell uses EventEmitter to announce class start and end. `process.nextTick()` runs after the current synchronous code, before the timer and immediate callbacks. The exact relative order of `setTimeout` and `setImmediate` is not guaranteed when scheduled from the top-level script.

## Q2: File Handling with fs
**File:** `Q2_Attendance/attendance.js`  
Run: `node Q2_Attendance/attendance.js`

**Explanation:** A menu allows adding, viewing, updating, and deleting student names. Data is saved in `attendance.txt`, so it stays available after the program closes.

## Q3: HTTP Server
**File:** `Q3_Tea_Stall/server.js`  
Run: `node Q3_Tea_Stall/server.js`  
Visit: http://localhost:3000

**Explanation:** Node's built-in `http` module returns `Welcome to NodeJS!` with status code 200.

## Q4: GET, POST, PUT, DELETE Routes
**File:** `Q4_Todo_API/server.js`  
Run: `node Q4_Todo_API/server.js`

**Explanation:** Tasks are stored in an array while the server runs (they reset when it restarts). Use these commands in another terminal:

```bash
curl http://localhost:3001/tasks
curl -X POST http://localhost:3001/tasks -H "Content-Type: application/json" -d '{"title":"Complete homework"}'
curl -X PUT http://localhost:3001/tasks/1 -H "Content-Type: application/json" -d '{}'
curl -X DELETE http://localhost:3001/tasks/1
```

## Q5: Express.js Bakery Website
**Files:** `Q5_Bakery/app.js`, `Q5_Bakery/public/`  
Run:

```bash
cd Q5_Bakery
npm install
npm start
```

Open http://localhost:3002, http://localhost:3002/menu, and http://localhost:3002/contact.

**Explanation:** Express serves three HTML pages: home, menu, and contact. The bakery name and contact details are fictional examples; replace them if needed.

## Note
Q1–Q4 use built-in Node.js modules only. Q5 requires Express, installed with `npm install`.
