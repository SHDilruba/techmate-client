## Website name: 
## TechMate 

## Live link: https://techmate-9953e.web.app/ 

## Features:
+ This MERN Stack website is about selling used (second-hand) computers with the ability to advertise a product.

+ The homepage has a navbar, a carousel banner, a Slider with advertised items, product categories, an FAQ section, and a footer. If the user clicks on a category, they will be redirected to the /category/:id route, where they will see products under that category, which is a private route.

+ There were Implemented Sign-up, log-out, and Log-in (email/password, google) routes by using firebase authentication. Created an extra field for two options on the Login page. If the user creates a seller account, he will choose the seller option. Otherwise, a normal user will have the user option selected by default. Users logged in by using social media will be considered buyers.

+ There are three routes in the Dashboard. The dashboard routes will change based on the users. Admin will see: The make Admin, Sellers, and Buyers sections. Sellers will see the: Add Product, and My products sections where can add a new product, delete it, or make advertising. Buyers will see the wishlist and My Orders section. From this section, a buyer can be redirected to the purchase page to pay for any product.

+ There are integrated stripes as a payment gateway, Used react query, Axios for the API calls, and images hosted in the imgbb. There is also used React photo view for the full-screen view by click.

+ There was created JWT token, custom hooks, 404 page with an image. Responsive dynamic shared components (card, modal, button) were created using the CSS framework Tailwind (DaisyUI). A blog page about Technology was also created with four short articles that answer four questions.

## Resolved an error that wasted my time:
+ I found this error after deploying the server side in vercel.com. I tried to resolve this error, by installing Chrome extensions, using 'no-cors' mode, using 'Access-Control-Allow-Origin' in the header, canceling, and re-installing cors, and clearing cookies & data from the browser, which suggestions were found in the many resources. But the result was zero. 

+ Then I tried with the localhost-5000 again for clearing my confusion because before vercel deployment I didn't find this error. After running the code the terminal suggested me to adding a new ObjectId instead of ObjectId like this: const filter = { _id: new ObjectId(id) } which was: const filter = { _id: ObjectId(id) }. That was helpful! 

+ error: << Access to fetch at '...' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.>>