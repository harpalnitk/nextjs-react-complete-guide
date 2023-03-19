import Link from 'next/link';



const HomePage = (props) => {
     return (
         <div>
            <h1>The Home Page</h1>
            <ul>
               <li>
                  <Link href="/blog">Blog</Link>
                  <Link href="/routing-project">Routing Project</Link>
               </li>
            </ul>
         </div>
     );
        }


export default HomePage;