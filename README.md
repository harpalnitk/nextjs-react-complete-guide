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
then page will be regenerated again



2. SSR : pages are created Just In Time (JIT) when request reaches server