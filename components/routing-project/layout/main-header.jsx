import Link from "next/link";
import classes from './main-header.module.css';

const MainHeader = (props) => {
     return (
         <header className={classes.header}>
            <div className={classes.logo}>
             <Link href='/routing-project'>NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href='/routing-project/events'>Browse All Events</Link>
                    </li>
                </ul>

            </nav>
         </header>
     );
        }


export default MainHeader;