### How I built it

1. I started off by defining the types, this meant I knew what I'd be working with for the input and output
2. I then defined the types based on CURL commands and the design doc I was given
3. Setup server, I created functions to call the API given and called it from sveltekit server.
4. Create svelte store for dashboard, in charge of querying the API and showing results
5. Create components for charts, use in dashboard component. Get the data to display in this from (4)
