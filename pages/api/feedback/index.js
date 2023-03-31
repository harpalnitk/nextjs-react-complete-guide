import fs from 'fs';
import path from 'path';
//any code written here will run only on server and
//will never be exposed to the client bundles
function handler(req,res){

    if(req.method === 'POST'){
        const email = req.body.email;
        const feedback = req.body.text;

        const newfeedback = {
            id: new Date().toISOString(),
            email,
            feedback
        }
//store that in a database
//here we will store in data/feedback.json file in the file system folders
//process.cwd() will give root / path
const filePath = buildFeedbackPath();
//add empty array to feedback.json file

const data = extractFeedback(filePath);
data.push(newfeedback);
fs.writeFileSync(filePath, JSON.stringify(data));
res.status(201).json({message:'Success!', feedback:newfeedback})
    }else{

        //if method is not post , this line will execute
        //becuase by default it is GET

        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({feedback:data});
    }

}

export const buildFeedbackPath = () =>{
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export const extractFeedback = (filePath)=>{
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

export default handler;