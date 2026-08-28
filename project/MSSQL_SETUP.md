# Getting SQL Server Running & Connected

This covers the part that trips people up most: getting an actual SQL Server
instance running locally, then pointing the app at it.

## 1. Start SQL Server

The easiest way on Mac/Linux/Windows is **Docker** — no separate installer,
runs in a container, easy to throw away and restart.

### Option A: Docker (recommended)

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) if
you don't have it, then run:

```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong!Passw0rd" \
  -p 1433:1433 --name todo-sql -d \
  mcr.microsoft.com/mssql/server:2022-latest
```

What this does:
- `-e ACCEPT_EULA=Y` — accepts Microsoft's license, required to start
- `-e MSSQL_SA_PASSWORD=...` — sets the admin ("sa") password. Must have
  uppercase, lowercase, a number, and a symbol, or the container will refuse
  to start and exit silently. If you change this, update `.env` in step 3.
- `-p 1433:1433` — exposes SQL Server's default port to your machine
- `-d` — runs in the background

Check it's actually running (give it ~15-20 seconds to finish booting first):

```
docker ps
docker logs todo-sql
```

You want to see `docker ps` list `todo-sql` as `Up`, and the logs end with
something like `SQL Server is now ready for client connections`.

To stop/start it later:
```
docker stop todo-sql
docker start todo-sql
```

### Option B: Native install

If you'd rather not use Docker: on Windows, install
[SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
(free) directly. On Mac/Linux, Docker is genuinely the path of least
resistance — Microsoft doesn't ship a native Mac/Linux SQL Server binary.

## 2. Create the database and table

You need a client to run `schema.sql` against the server. Two easy options:

**Azure Data Studio** (free, cross-platform, GUI) — download from
[Microsoft's site](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio),
connect to `localhost,1433` with username `sa` and the password from step 1,
open `backend/schema.sql`, and run it (▶ button or F5).

**Or via command line**, using the `sqlcmd` tool bundled in the container:

```
docker exec -it todo-sql /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P "YourStrong!Passw0rd" -C \
  -i /dev/stdin < backend/schema.sql
```

Either way, this creates a `TodoTutorial` database with a `Todos` table and
two seed rows.

## 3. Connect the app

Copy the example env file and adjust if you changed the password:

```
cd backend
cp .env.example .env
```

Then install the new dependency and start the server:

```
npm install
npm start
```

You should see:
```
Connected to SQL Server
Backend running at http://localhost:3001
```

If instead you see `Database connection failed: ...`, check:
- Is the container actually running? (`docker ps`)
- Does the password in `.env` match what you set in step 1?
- Did you create the `TodoTutorial` database (step 2)? The connection will
  fail if the database doesn't exist yet.

## 4. Run the frontend

Same as before — separate terminal:
```
cd frontend
npm install
npm run dev
```

Everything else about the app (the React UI, the API shape) is unchanged.
Only what's *behind* the API swapped from an array to a real database.

## What changed under the hood

| Before | Now |
|---|---|
| `todos` array in `server.js` | `Todos` table in SQL Server |
| Data lost on server restart | Data persists |
| No query language | Parameterized SQL queries (`db.js`) |

`db.js` holds one shared connection pool that every route reuses — opening a
new database connection per request would be slow and wasteful. Every query
that includes user input uses `.input()` to bind parameters rather than
string-concatenating values into the SQL — that's what prevents SQL
injection, and it's worth understanding *why* even at tutorial scale, since
it's the one habit from this file worth carrying into real code.
