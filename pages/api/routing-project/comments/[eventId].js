import {
  connectDatabase,
  insertDocument,
  getAllDocuments
} from '../../../../helpers/routing-project/mongodb-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Connecting to the database failed.' });
    return;
  }

  //ADD COMMENT
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    // add server side validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      client.close();
      return;
    }

    const newComment = {
      //id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    
    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Inserting data failed.' });
    }
  }

  //GET ALL COMMENTS
  if (req.method === 'GET') {
   try {
     const documents = await getAllDocuments(client,'comments',{_id:-1},{eventId:eventId})
      res.status(200).json({ comments: documents });
    } catch (error) {
    console.log(error);
    res.status(500).json({message:'Fetching comments failed.'});
   }

  }

  //FINALLY CLOSE DATABASE CONNECTION
  client.close();
}

export default handler;
