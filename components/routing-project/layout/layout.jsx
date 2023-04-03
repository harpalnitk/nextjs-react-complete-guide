import MainHeader from "./main-header";
import Notification from '@/components/ui/notification';
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

const RoutingProjectLayout = (props) => {

   const notificationCtx = useContext(NotificationContext);

   const activeNotification = notificationCtx.notification;
     return (
         <>
         <MainHeader></MainHeader>
         <main>
            {props.children}
         </main>
         {activeNotification && <Notification
         title={activeNotification.title}
         message={activeNotification.message}
         status={activeNotification.status}
         ></Notification>}         
         </>
     );
        }


export default RoutingProjectLayout;