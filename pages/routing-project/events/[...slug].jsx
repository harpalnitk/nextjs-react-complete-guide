// this page will kick in only if we have two params after 
// events e.g. /events/90/May 

import EventList from "@/components/routing-project/event-list";
import ResultsTitle from "@/components/routing-project/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/lib/dummy-data";
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

   const filteredYear = filteredData[0];
   const filteredMonth = filteredData[1]
  

   const numYear = +filteredYear;
   const numMonth = +filteredMonth;
   console.log(numYear,numMonth);

   if(isNaN(numYear) ||
    isNaN(numMonth) ||
     numYear > 2030 ||
     numYear < 2021 ||
     numMonth < 1 ||
     numMonth > 12){
  return <>
  <ErrorAlert>
  <p>Invalid Filter. Please adjust your values!</p>
  </ErrorAlert>
  <div className="center">
  <Button link='/events'>Show All Events</Button>
  </div>
  </>
   }

   const filteredEvents = getFilteredEvents({
      year: numYear,
      month: numMonth
   });

   if(!filteredEvents || filteredEvents.length === 0){
      return <>
      <ErrorAlert>
      <p>No events found for the chosen filter!</p>
      </ErrorAlert>
      <div className="center">
      <Button link='/events'>Show All Events</Button>
      </div>
      </>
   }


   const date = new Date(numYear,numMonth -1);


     return (
         <>
            <ResultsTitle date={date}/>
           <EventList items={filteredEvents}/>
         </>
     );
        }


export default FilteredEventsPage;