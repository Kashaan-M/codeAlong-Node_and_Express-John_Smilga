/* API vs SSR */

/*
 Since API is the most over-used term in the community let us define what we mean by API
 In HTML or Express JS, API is simply an http interface to interact with out data . Now data is sent using JSON. And in order to send back our response(for the API)
 we are going to use 'res.json()'

 === Server Side Rendering ===
 The other flavor we have is SSR, where we set up templates and send back entire HTML,CSS, JS ourself and we are going to do that using 'res.render()'
