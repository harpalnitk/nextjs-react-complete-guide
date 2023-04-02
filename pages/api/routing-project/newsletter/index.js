
import {connectDatabase,insertDocument} from '../../../../helpers/routing-project/mongodb-utils';


async function handler(req,res){
    if(req.method === 'POST'){
        const userEmail = req.body.email;
        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:'Invalid email address'});
            return;
        }

        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Connecting to the database failed.'});
            return;
        }
       let result;
       try {
         result = await insertDocument(client,'emails',{email:userEmail});
         client.close();
       } catch (error) {
        console.log(error);
        res.status(500).json({message:'Inserting data failed.'});
        return;
       }

        const userEmailObject = {_id: result.insertedId, email:userEmail};
        console.log('userEmailObject',userEmailObject);
        res.status(201).json({message:'Signed up!'})
    }
}

export default handler;