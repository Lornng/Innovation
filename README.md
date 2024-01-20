### Innovation Project
A website that shows the network of crypto wallet <br>
- Use node.js for the project
- Use FastAPI
- Neo4J for database storage

## Steps:

1. Install React
2. Use Neo4j
3. "cd group3-40 Assignment2" then run "npm install" to install all the libraries, "pip install FastAPI", "pip install requirement.txt"
4. at the same repo as above run "npm start"
5. go to 'cd group3-40 Assignment2\src' run the command 'uvicorn main:app --reload' or 'py-m uvicorn main:app --reload'
6. activate the neo4j database


*Wait 60 seconds before connecting using these details, or login to https://console.neo4j.io to validate the Aura Instance is available*
NEO4J_URI=neo4j+s://45513754.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=DmFS2ipwgD0uFMe4V05GyeafLWUUMLQ7eMM35479mfs
AURA_INSTANCEID=45513754
AURA_INSTANCENAME=Instance01	

```
-----------------Neo4j Query----------------

// CONSTRAINT creation
// -------------------
//
// Create node uniqueness constraints, ensuring no duplicates for the given node label and ID property exist in the database. This also ensures no duplicates are introduced in future.
//
// NOTE: The following constraint creation syntax is generated based on the current connected database version 5.11-aura.
CREATE CONSTRAINT `imp_uniq_node_Name` IF NOT EXISTS
FOR (n: `node`)
REQUIRE (n.`addressId`) IS UNIQUE;

:param {
idsToSkip: []
};

// NODE load
// ---------
//
// Load nodes in batches, one node label at a time. Nodes will be created using a MERGE statement to ensure a node with the same label and ID property remains unique. Pre-existing nodes found by a MERGE statement will have their other properties set to the latest values encountered in a load file.
//
// NOTE: Any nodes with IDs in the 'idsToSkip' list parameter will not be loaded.
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/Lornng/Innovation/main/nodes.csv' AS row
WITH row
WHERE NOT row.`addressId` IN $idsToSkip AND NOT row.`addressId` IS NULL
CALL {
WITH row
MERGE (n: `node` { `addressId`: row.`addressId` })
SET n.`type` = toString(row.`type`)
} IN TRANSACTIONS OF 10000 ROWS;


// RELATIONSHIP load
// -----------------
//
// Load relationships in batches, one relationship type at a time. Relationships are created using a CREATE statement, and multiple relationships will be created between two nodes.
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/Lornng/Innovation/main/relationships.csv' AS row
WITH row
CALL {
WITH row
MATCH (source: `node` { `addressId`: row.`from_address` })
MATCH (target: `node` { `addressId`: row.`to_address` })
CREATE (source)-[r: `send to`]->(target)
SET r.`hash` = toString(row.`hash`)
SET r.`value` = toString(row.`value`)
SET r.`input` = toString(row.`input`)
SET r.`transaction_index` = toString(row.`transaction_index`)
SET r.`gas` = toString(row.`gas`)
SET r.`gas_used` = toString(row.`gas_used`)
SET r.`gas_price` = toString(row.`gas_price`)
SET r.`transaction_fee` = toString(row.`transaction_fee`)
SET r.`block_number` = toString(row.`block_number`)
SET r.`block_hash` = toString(row.`block_hash`)
SET r.`block_timestamp` = toString(row.`block_timestamp`)

} IN TRANSACTIONS OF 10000 ROWS;

----------------------------------------------------------------------
```
