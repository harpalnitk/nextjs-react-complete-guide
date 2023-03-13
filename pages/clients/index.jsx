import Link from "next/link";

const ClientsPage = (props) => {
     return (
         <div>
            <h1> All Client's page</h1>
            <ul><li>
               <Link href='/clients/max'>Max Pages</Link>
               </li>
               <li>
               <Link href={{
                  pathname: '/clients/[id]',
                  query:{id: 'Manu'}
               }}>Manu Pages</Link>
               </li>
               
               </ul>
         </div>
     );
        }


export default ClientsPage;