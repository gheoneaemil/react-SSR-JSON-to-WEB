I've implemented a react application, using the latest version of react, via create-react-app tool.
Then I've created a nodejs app for rendering the files on the server-side.
The react app has one component which takes in its URL a parameter that represents the hash of the design that will be fetched after that from the creatopy systems.
The hash based design fetch and the HTML generation are made on the server side.
There were approx. 3 approaches for rendering the server-side rendered HTML on front-end:
1. to use the dangerouslySetInnerHTML
2. to send the component as a whole directly to the application
3. to send the stringified version of the server-side rendered component via the application bundle by adding it inside the root div of the react application, keeping react in full control.

I chose the 3rd option. The first one is not really a recommended approach, even though in this case we're in full control over the HTML inserted in the app.

The main challenge was to understand the meaning behind some of the json design properties and how they should be assembled inside my HTML generator.

If I had more time I'd implement the worker threads for both the fetch + HTML generation together so that I do not overload the event loop in case of usage spikes.
And also make the HTML generator more accurate or spot on, assuming that I'll have more time to read and understand the JSON design properties.