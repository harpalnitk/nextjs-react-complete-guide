// this page will kick in only if we have two params after 
// events e.g. /events/90/May 

import { useRouter } from "next/router";

const FilteredEventsPage = (props) => {
   const router = useRouter();
   //this hook extracting route data runs the second time
   //! when the component is first rendered this hook does not run
   const filteredData = router.query.slug;
   console.log(filteredData);

   if(!filteredData){
      // center is global css class 
      return <p className="center">Loading...</p>
   }
     return (
         <div>
            <h1>Filtered Events</h1>
         </div>
     );
        }


export default FilteredEventsPage;