import MainHeader from "./main-header";


const RoutingProjectLayout = (props) => {
     return (
         <>
         <MainHeader></MainHeader>
         <main>
            {props.children}
         </main>
         </>
     );
        }


export default RoutingProjectLayout;