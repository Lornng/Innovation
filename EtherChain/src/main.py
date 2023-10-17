from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

# for security reasons
# you can store your database information in a separate file
uri = "neo4j+s://a8dcd222.databases.neo4j.io"
user = "neo4j"
password = "vsYQcM2H6wZB6JX8W4qbJgRokjNls1s4uBvXAh_JS_0"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#need to define a function to get node basic information
# Define a function to get a node by a property value
def get_node_by_address(addressId):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        # Define a query to retrieve the node by a property value
        query = (
            f"MATCH (n:node) "
            f"WHERE n.addressId = $property_value "
            "RETURN n"
        )

        with driver.session() as session:
            result = session.run(query, property_value=addressId)
            node = result.single()
            if node:
                return node['n']
            else:
                return None
            
@app.get("/get_node/{addressID}")
async def get_node(addressID: str):
    node = get_node_by_address(addressID)
    if node:
        return {"node": dict(node)}
    else:
        return {"error": "Node not found"}


#define functions to obtain the remaining properties and relationships for the bottom table

# Define a function to run a Cypher query to retrieve node attributes
# def get_node_attributes(node_id):
#     with GraphDatabase.driver(uri, auth=(user, password)) as driver:
#         with driver.session() as session:
#             query = "MATCH (n:node) RETURN n LIMIT 25;"
#             result = session.run(query, node_id=node_id)
#             return result.single()['n']

# @app.get("/getNodeAttributes")
# async def get_node_attributes_route(node_id: int):
#     node = get_node_attributes(node_id)
#     return {"attributes": dict(node)}

# Define a function to get all nodes of a specific label
def get_all_nodes(label):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = f"MATCH (n:{label}) RETURN n"
            result = session.run(query)
            return [dict(record['n']) for record in result]

@app.get("/getAllNodes/{label}")
async def get_all_nodes_route(label: str):
    nodes = get_all_nodes(label)
    return {"nodes": nodes}

# Define a function to run a Cypher query to retrieve node and its relationships
def get_node_and_relationships(node_id):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = """
            MATCH (n:YourLabel {id: $node_id})
            OPTIONAL MATCH (n)-[r]->(related)
            RETURN n, collect(r) as relationships
            """
            result = session.run(query, node_id=node_id)
            record = result.single()
            node = record['n']
            relationships = record['relationships']
            return {"node": dict(node), "relationships": relationships}

@app.get("/getNodeAndRelationships/{node_id}")
async def get_node_and_relationships_route(node_id: str):
    data = get_node_and_relationships(node_id)
    return data


@app.get("/getGDBAddr")
async def funcTest():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    gdb_address = driver.get_server_info().address
    driver.close()
    return gdb_address