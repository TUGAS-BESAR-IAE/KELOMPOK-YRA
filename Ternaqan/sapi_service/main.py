# from ariadne.asgi import GraphQL
# from ariadne import load_schema_from_path, make_executable_schema
# from resolvers import resolvers
# from database import init_db, get_db_connection
# import uvicorn
# from fastapi import FastAPI, HTTPException, Path, Body
# from starlette.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware

# init_db()

# type_defs = load_schema_from_path("schema.graphql")
# schema = make_executable_schema(type_defs, *resolvers)
# graphql_app = GraphQL(schema)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.mount("/", graphql_app)

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8001)

import asyncio
from ariadne.asgi import GraphQL
from ariadne import load_schema_from_path, make_executable_schema
from resolvers import resolvers
from database import init_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

async def startup_event():
    await init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(type_defs, *resolvers)
graphql_app = GraphQL(schema)

app.mount("/", graphql_app)

@app.on_event("startup")
async def on_startup():
    await startup_event()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)