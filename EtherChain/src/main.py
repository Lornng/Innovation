from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase
from web3 import Web3
import eth_utils

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

# Ethereum node URL
eth_node_url = "https://mainnet.infura.io/v3/ecaaa7d8d4a24a239033a9fa90498f5e"  # Ethereum endpoint

# Initialize Web3 instance
w3 = Web3(Web3.HTTPProvider(eth_node_url))

# Function to check if an Ethereum address is valid
def is_valid_address(address):
    return eth_utils.is_address(address)

# Function to get the balance of a wallet address
@app.get("/get_balance/{wallet_address}")
async def get_balance(wallet_address: str):
    if not is_valid_address(wallet_address):
        return {"error": "Invalid Ethereum address"}

    # Convert the address to checksum format
    checksum_address = eth_utils.to_checksum_address(wallet_address)

    balance_wei = w3.eth.get_balance(checksum_address)
    balance_eth = w3.from_wei(balance_wei, "ether")

    return {"balance_wei": balance_wei, "balance_eth": balance_eth}

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

#function to retrive related node address data for a specific node address
@app.get("/get_related_nodes/{addressID}")
async def get_related_nodes_route(addressID: str):
    with GraphDatabase.driver(uri, auth=(user, password)) as driver:
        with driver.session() as session:
            query = """
                MATCH (from)-[r]->(to)
                WHERE from.addressId = $node_id OR to.addressId = $node_id
                RETURN from, r, to,
                    r.hash AS hash,
                   r.value AS value,
                   r.input AS input,
                   r.transaction_index AS transactionIndex,
                   r.gas AS gas,
                   r.gas_used AS gasUsed,
                   r.gas_price AS gasPrice,
                   r.transaction_fee AS transactionFee,
                   r.block_number AS blockNumber,
                   r.block_hash AS blockHash,
                   r.block_timestamp AS blockTimestamp
                """
            result = session.run(query, node_id=addressID)
            data = [
                {
                    "from": {
                        "addressId": record["from"]["addressId"],
                        "type": record["from"]["type"]
                    },
                    "relationship": {
                        "type": record["r"].type,
                        "hash": record["hash"],
                        "value": record["value"],
                        "input": record["input"],
                        "transaction_index": record["transactionIndex"],
                        "gas": record["gas"],
                        "gas_used": record["gasUsed"],
                        "gas_price": record["gasPrice"],
                        "transaction_fee": record["transactionFee"],
                        "block_number": record["blockNumber"],
                        "block_hash": record["blockHash"],
                        "block_timestamp": record["blockTimestamp"]
                    },
                    "to": {
                        "addressId": record["to"]["addressId"],
                        "type": record["to"]["type"]
                    }
                }
                for record in result
            ]
            return {"data": data}
        
#function to get the nodes of a label
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

#get all nodes and relationships by node_id
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

#get GDBAddress function
@app.get("/getGDBAddr")
async def funcTest():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    gdb_address = driver.get_server_info().address
    driver.close()
    return gdb_address