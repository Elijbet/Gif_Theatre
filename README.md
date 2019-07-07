## Gif Theater

> Make a gif theater that shuffles random gifs with an animated transition. Swap it, if the user clicks on a thumbnail, and give an option to resume random shufle upon click on resume button.

### Project Images

![Gif Theater](https://drive.google.com/uc?export=view&id=1eloe6zVX_Ff8BN8i5moGLOZ7I5GNrMxO)

### Project Roadmap

- Make a call to the giphy API and pull in a list of random images: https://api.giphy.com/v1/gifs/trending?api_key=YOUR_KEY
- Set the active image in the state of the Gallery component
- Create a list of inactive images using the GalleryThumb Component
- Add an automatic timer that changes the active images after 3 seconds
- On click of each GalleryThumb, update the active image
- Add a remove button on the GalleryThumb that deletes images when clicked
- Add a slick animation to transition between active images
- The transition animation alternates between images sliding from left to center and from top to center.Buttons with animations on hover and alternating gradient pattern
- Add any extra styling & behaviour to make it look polished
- Gifs randomly shuffle until you click on one. The it lingers on that image unless you click on another
- When you click on a thumbnail image a button pops up giving the option to go back to random shuffle

### HIDE SECRET KEYS

- create a file called .env in the root of your project's directory
- inside the .env file, prepend REACT_APP_title to your API key name of choice and assign it
- add the .env file to your .gitignore file
- access the API key via the process.env object
- restart the server
- (vue docs)[https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code]

### To Run locally

navigate to project folder
```
npm start
```