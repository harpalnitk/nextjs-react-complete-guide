import {MongoClient} from 'mongodb';
export async function connectDatabase(){
    const client = await MongoClient.connect(
        `mongodb+srv://nextjs-react-user:manu9090@cluster0.cazlo.mongodb.net/?retryWrites=true&w=majority`
        );
        return client;
}

export async function insertDocument(client,collection,document){
    const db = client.db('nextjs-react-course');
        //automatically creates a new database with the name provided,
    // if not already created
    const result = await db.collection(collection).insertOne(document);
    
    return result;
}

export async function getAllDocuments(client,collection,sort,filter = {}){
    const db = client.db('nextjs-react-course');
    const documents = await db
      .collection(collection)
      .find(filter)
      .sort(sort)
      .toArray();
       //if toArray is not used we get a cursor
      return documents;
}