import {useRouter} from 'next/router';



function BlogPostsPage(){
//http://localhost:3000/blog/2020/12/03/new-blog

// will give in console 
    const router = useRouter(); // /blog/[...slug]
    console.log(router.pathname);
    console.log(router.query);//{
    //     "slug": [
    //         "2020",
    //         "12",
    //         "03",
    //         "new-blog"
    //     ]
    // }
    return(
        <div>
            <h1>The Blog Posts</h1>
        </div>
    )
}


export default BlogPostsPage