# Sync MongoDB component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Aggregation from Sync using Data API](#aggregation-from-sync-using-data-api)
  * [Delete multiple Document from Sync using Data API](#delete-multiple-document-from-sync-using-data-api)
  * [Delete One Document from Sync using Data API](#delete-one-document-from-sync-using-data-api)
  * [Find a Single Document from Sync using Data API](#find-a-single-document-from-sync-using-data-api)
  * [Find multiple Document from Sync using Data API](#find-multiple-document-from-sync-using-data-api)
  * [Insert a Document from Sync using Data API](#insert-a-document-from-sync-using-data-api)
  * [Insert multiple Document from Sync using Data API](#insert-multiple-document-from-sync-using-data-api)
  * [Replace a Document from Sync using Data API](#replace-a-document-from-sync-using-data-api)
  * [Update single Document froms Sync using Data API](#update-single-document-froms-sync-using-data-api)
  * [Upsert using Data API](#upsert-using-data-api)

## Description

This component connects to ThatApp.io Database using [Data API Resources](https://www.mongodb.com/docs/atlas/api/data-api-resources/)

## Credentials

Component credentials configuration fields: 
* **APIKey** - (string, required): Api key is gotten from the your MongoDB dashboard
* **API Version** - (string, optional, `beta` by default): Provide the API version
* **Data API App ID** - (string, optional, `data-maqtf` by default): Your Data API App ID, which you can find in the URL Endpoint section of the MongoDB UI
* **Cluster Name** - (string, optional, `MigrateCluster0` by default): The name of a cluster with the Data API enabled

## Actions 

### Aggregation from Sync using Data API
Execute aggregation pipeline and returns the result set of the final stage of the pipeline

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Pipeline** - (array, required): One or more stages that process documents

#### Output Metadata
* **documents** - (array, required): Results for groups of documents

### Delete multiple Document from Sync using Data API
Deletes all documents in the collection that match filter

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition** - (object, required): Filter for records in collection

#### Output Metadata
* **deletedCount** - (number, required): number of deleted documents

### Delete One Document from Sync using Data API
Deletes the first document in the collection that matches filter

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition** - (object, required): Filter for records in collection

#### Output Metadata
* **deletedCount** - (number, required): number of deleted documents

### Find a Single Document from Sync using Data API
Returns the first document in the collection that matches filter

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition** - (object, required): Filter for records in collection

#### Output Metadata
* **document** - (object, required): The matched document

### Find multiple Document from Sync using Data API
Returns documents in the collection that match filter

#### Configuration Fields
* **Emit Behavior** - (dropdown, required): Select how to proceed documents:
  * **Emit Individually** - Each document in separate message
  * **Emit Batch** - All documents in one message

#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition** - (object, required): Filter for records in collection
* **Sort** - (object, required): Matched documents are returned in ascending or descending order of the fields specified in the expression
* **Limit** - (number, required): The maximum number of matched documents to include in the returned result set. Each request may return up to 50,000 documents.
* **Skip** - (number, required): The number of matched documents to skip before adding matched documents to the result set.

#### Output Metadata
* **documents** - (array, required): Array of matched document

### Insert a Document from Sync using Data API
Insert document into collection

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **JSON Data to insert** - (object, required): Document to insert into the collection

#### Output Metadata
* **insertedId** - (string, required): `_id` value of the inserted document

### Insert multiple Document from Sync using Data API
Insert multiple documents into collection

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Array of JSON Data to insert** - (array, required): Array of documents to insert into the collection

#### Output Metadata
* **insertedIds** - (array, required): `_id` values of all inserted documents as an array of strings

### Replace a Document from Sync using Data API
Overwrites the first document in the collection that matches this filter or create new one

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition for Update** - (object, required): Filter for records in collection
* **JSON Data to insert** - (object, required): Document that overwrites the matched document or to be created if record not found

#### Output Metadata
* **matchedCount** - (number, required): Number of object that matched
* **modifiedCount** - (number, required): Number of updated objects
* **upsertedId** - (string, optional): `_id` value of inserted object if it wasn't found by `Condition for Update`

### Update single Document froms Sync using Data API
Modifies the first document in the collection that matches filter

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition for Update** - (object, required): Filter for records in collection
* **JSON Data to upsert** - (object, required): Update Expression that specifies how to modify the matched document

#### Output Metadata
* **matchedCount** - (number, required): Number of object that matched
* **modifiedCount** - (number, required): Number of updated objects
* **upsertedId** - (string, optional): `_id` value of inserted object if it wasn't found by `Condition for Update`

### Upsert using Data API
Modifies all documents in the collection that match this filter

#### Configuration Fields
none
#### Input Metadata
* **Database** - (string, required): Database name
* **Collection** - (string, required): Collection name
* **Condition** - (object, required): Filter for records in collection
* **JSON Data to upsert** - (object, required): Update Expression that specifies how to modify the matched document

#### Output Metadata
* **matchedCount** - (number, required): Number of object that matched
* **modifiedCount** - (number, required): Number of updated objects
* **upsertedId** - (string, optional): `_id` value of inserted object if it wasn't found by `Condition`
