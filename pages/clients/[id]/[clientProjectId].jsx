import { useRouter } from "next/router";

const ClientProjectIdPage = (props) => {
//http://localhost:3000/clients/1/project1
    const router =useRouter();
    console.log(router.pathname);  // /clients/[id]/[clientProjectId]
    console.log(router.query);//{
    //     "id": "1",
    //     "clientProjectId": "project1"
    // }
     return (
         <div>
            <h1>ClientProjectIdPage</h1>
         </div>
     );
        }


export default ClientProjectIdPage;