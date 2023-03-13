import { useRouter } from "next/router";

const ClientPages = (props) => {

    const router= useRouter();

const loadClientProject=()=>{
 router.push({
    pathname: '/clients/[id]/[clientProjectId]',
    query:{
        id: 'Max',
        clientProjectId:'project1'
    }
 });
}

     return (
         <div>
            <h1>Client Page</h1>
            <button onClick={loadClientProject}>Load Client project</button>
         </div>
     );
        }


export default ClientPages;