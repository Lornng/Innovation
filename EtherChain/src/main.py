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

def get_node_address_by_address(addressId):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        # Define a query to retrieve the node by a property value
        query = (
            f"MATCH (n:node) "
            f"WHERE n.addressId = $property_value "
            "RETURN n.addressId"
        )

        with driver.session() as session:
            result = session.run(query, property_value=addressId)
            address = result.single()
            if address:
                return address['n.addressId']
            else:
                return None

@app.get("/get_node_address/{addressID}")
async def get_node_address(addressID: str):
    address = get_node_address_by_address(addressID)
    if address:
        return {"addressId": address}
    else:
        return {"error": "Node not found"}
        
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

def get_all_nodes():
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = "MATCH (n) RETURN n"
            result = session.run(query)
            return [dict(record['n']) for record in result]


@app.get("/getAllNodes")
async def get_all_nodes_route():
    nodes = get_all_nodes()
    return {"nodes": nodes}

# Define a function to run a Cypher query to retrieve node and its relationships
# Define a function to get all nodes and their relationships

# Get All Nodes and Relationships
def get_all_nodes_and_relationships():
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = """
            MATCH (from)-[r]->(to)
            RETURN from.addressId AS fromAddress, to.addressId AS toAddress
            """
            result = session.run(query)
            
            # Use list comprehension to create a list of dictionaries
            data = [{"from": record["fromAddress"], "to": record["toAddress"], "tokens": 0} for record in result]
            
            return data

@app.get("/getAllNodesAndRelationships")
async def get_all_nodes_and_relationships_route():
    data = get_all_nodes_and_relationships()
    return {"r": data}

@app.get("/getAllNodesAndRelationships/{node_id}")
async def get_all_nodes_and_relationships_route(node_id: str):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = f"""
            MATCH (from)-[r]->(to)
            WHERE from.addressId = $node_id OR to.addressId = $node_id
            RETURN from.addressId AS fromAddress, to.addressId AS toAddress
            """
            result = session.run(query, node_id=node_id)
            data = [{"from": record["fromAddress"], "to": record["toAddress"], "tokens": 0} for record in result]
            return {"r": data}

@app.get("/getGDBAddr")
async def funcTest():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    gdb_address = driver.get_server_info().address
    driver.close()
    return gdb_address
