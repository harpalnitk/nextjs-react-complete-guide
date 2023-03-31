## Create Nextjs project
>npx create-react-app


## public folder

is a special folder in nextjs
whatever is stored there is 
served statically by nextjs which
means we can reference it in 
our css or html code

## Page pre-rendering
pre rendered page is sent initially and then hydrated with react code

after that it is standard react application (SPA)

## Two froms of pre-rendering
1. Static Generation : pre generate a page during build time
pages are cached  on the server/CDN. The pages are then hydrated by react APP.



import path from 'path';
import fs from 'fs/promises';


// NOTE: hooks cannot be used in this function, fetch can be used


export async function getStaticProps(context){
    //cwd current working directory, will be root directory for
    //all files during nextjs build
const filePath = path.join(process.cwd(),'data','dummy-backend.json');
const jsonData = await fs.readFile(filePath);
const data = JSON.parse(jsonData)
    return {
        props: data.products
    }
} 

//code runs only on the machine where app is build, no access 
to client side code like Windows, any code here is not sent back to the
clients e.g. database credentials

# SSG is default in nextjs...any page that has no dynamic content
is by default SGR by nextjs

# Disadvantage is if data changes too frequently

# Change it to ISG : Incremental Static regeneration

export async function getStaticProps(context){

    return {
        props: data.products
    },
    revalidate: 60 // in seconds
} 

with ISG page will be re-generated on hosting server
at most every 60 s for each new request. i.e. 2 request within 60 second will be served same page and if they are more than 60s apart 
then page will be regenerated, served and stored

// in development server page will be re-generated for
every request
export async function getStaticProps(context){

    return {
        props: data.products
    },
    revalidate: 60, // in seconds
    notFound: true  // will return a 404 page if data is not found
    redirect: {
        destination : '/login'
    } // we can also re-direct to any route
} 

# ISG with dynamic routes
//In Product detail Page e.g. [pid] route
export async function getStaticProps(context){
const {params} = context;
const productId = params.pid;
const
    return {
        props: {loadedProduct: product}
    },
    
} 

function ProductDetailPage(props){
    const {loadedProduct} = props;
}

# For dynamic pages ISG needs path of pages to be generated

export async function getStaticPaths(){
    return{
        paths:[
            {params: {pid: 'p1'}},
            {params: {pid: 'p2'}},
            {params: {pid: 'p3'}}
        ],
        fallback: false
    }
}

now when links for these pages are loaded in home page
[pid].json files having pre-fetched data are loaded by nextjs
and when we click on Product1 link product1 page opens with
already pre fetched data in a SPA fashion i.e html page is not loaded

html page is loaded when we direttly hit the URL of the page


# fallback
with millions of such pages if we don't want to pre render all
we set fallback to true
export async function getStaticPaths(){
    return{
        paths:[
            {params: {pid: 'p1'}},

        ],
        fallback: true
    }
}
only p1 will be pre-rendered
then if we hit p2 or p3 page through link, we won't get any error

but if we hit p2 or p3 directly we will get data not found error
so
function ProductDetailPage(props){
    const {loadedProduct} = props;
    if(!loadedProduct){
        return <p>Loading..</p>
    }
}
// we need to handle this on our main page component

OR

export async function getStaticPaths(){
    return{
        paths:[
            {params: {pid: 'p1'}},

        ],
        fallback: 'blocking'
    }
}

with falbback blocking we don't need above check in code
but response will be delayed as page will not be served until
data loading is completed

# With fallback true, we need to handle cases where product is not in database e.g. pABC url

export async function getStaticProps(context){
const {params} = context;
const productId = params.pid;

# if(!product){
    return {notFound: true}
}
    return {
        props: {loadedProduct: product}
    },
    
} 


2. SSR : pages are created Just In Time (JIT) when request reaches server
 
# WHY?

a. it has access to request object (cookies,headers etc)
however, in ISG and SSG access to request object is not there

b. also, used for highly dynamic data which changes multiple times 
every second

c. search engine crawlers

function UserProfilePage(props){
    return <h1>{{props.username}}</h1>
}

//this function runs only on server
export async function getServerSideProps(context){

    //retrun object can have props,redirect or notFound key

    return {
        props:{
            username:'Max'
        }
    }

}

# access to 

export async function getServerSideProps(context){
    const {params, req, res} = context
# we can even manipulate response object e.g. add headers,cookie to it

req, res we get here are official nodejs incoming message and response 
objects
}

# No need of getStaticPath  because this function is not run during
build time and it has request and params and thus any dynamic param
can be extracted on the server


### CLIENT SITE DATA FETCHING

a. high frequency data  e.g. stock data
b. highly user specific data... e.g. last orders in an online shop
c. partial data   e.g. on dashboard page some data may be fetched on client

useEffect runs after the entire component is evaluated

pre-rendering of page happens without the data

<p>No Data Yet</p> will be generated on the page

# custom Hook
SWR hook by vercel

> npm i SWR


### META DATA ADDING IN NEXTJS

import Head from 'next/head';

all head elements across all pages will be merged
e.g. head in layout and main component will be merged
if there is conflict last value will be atke e.g. conflict in title

Head in _app.js will be rendered across
all pages of the app

# _document.jsx file

allows to customize entire html document