
import Button from "../ui/button";
import styles from './event-item.module.css';

import DateIcon from "../ui/icons/date-icon";
import AddressIcon from "../ui/icons/address-icon";
import ArrowRightIcon from "../ui/icons/arrow-right-icon";
import Image from 'next/image';

const EventItem = (props) => {

    const {title,image,date,location,id} = props;
      
    const humanReadableDate = new Date(date).toLocaleDateString('en-US',{
        day: 'numeric',
        month: 'long',
        year:'numeric'

    });

    const formattedAddress = location.replace(', ','\n'); // comma replaced with line break
    const exploreLink = `/routing-project/events/${id}`;
    
    return (
         <li className={styles.item}>
            {/* width and height need to be set for next Image component 
            this is width and height which we need in our component 
            width 40% 0f 40 rem(640px) = 340
            height= 16rem = 160px
            above values in css file

            this width and height is for fetching image
            CSS styles will still override them on the actual page

            if screen size changes next makes automatic request for image again
            i.e. images are lazy loaded
            */}
            <Image src={'/' + image} alt={title} width={340} height={160}/>
            <div className={styles.content}>
                <div className={styles.summary}>
                <h2>{title}</h2>
                <div className={styles.date}>
                    <DateIcon/>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={styles.address}>
                    <AddressIcon/>
                    <address>{formattedAddress}</address>
                </div>
                </div>
                <div className={styles.actions}>
            <Button link={exploreLink}>
                <span>Explore Event</span>
                <span className={styles.icon}><ArrowRightIcon/></span>
                </Button>
            </div>   
            </div>

         </li>
     );
        }


export default EventItem;