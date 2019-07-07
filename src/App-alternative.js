import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
        gifyArray: [],
        currentImage: 0,
        selectedImage: 0,
        addClassCheck: false
  }
  toggle() {
    this.setState({addClassCheck: !this.state.addClassCheck});
  }
  //This function returns a random index for the random shuffle of the active image.
  getRandomImageId() {
    const min = 0;
    const max = this.state.gifyArray.length;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //Delete function filters the state array of images to return only those not containing the selected index. And then sets the state.
  delete = (index) => {
    const dataWithItemGone = this.state.gifyArray.filter(item => this.state.gifyArray.indexOf(item) !== index)
    this.setState({gifyArray: dataWithItemGone})
  }
  componentDidMount() {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=PEyIrGaWdf08Lw4nezyXejpD9Y0pO6Rt')
    .then(response => {
      let data = response.data.data
      console.log('data', data)
      //Make a copy of the image array in the state.
      let localGifyArray = this.state.gifyArray
      //For each bit of image data, take the appropriate url and push an object with a key=url and value=link to the copy of the state. Do this for width and height as well.
      data.forEach(el => {
        var o = {};
        o.url = el.images.downsized.url
        o.width = parseInt(el.images.downsized_large.width) * 2
        o.height = parseInt(el.images.downsized_large.height) * 2
        localGifyArray.push(o)
       })
      //Set the state to the newly populated array.
      this.setState({gifyArray: localGifyArray})
      }
    )
    .then(response => {
      //Need to have setInterval inside .then, otherwise it will run before the array gets populated, and we won't be able to reach for url in the render method.
      //This is one of 2 timers that starts on initial run automatically. It has a clear function to snap out of it in the event the user selects an image. This sets the selectedImage variable in the state.
      //Toggle function toggles addClassCheck to true or false. One value triggers dynamic application of 'slide' animation (from the left) on the active/current image, the other of next-slide (from top).
      let initialTimer = setInterval((() => {
        if(this.state.selectedImage){
          clearInterval(initialTimer)
          this.state.addClassCheck = false
        }
        this.setState({
          currentImage: this.getRandomImageId()
        });
        this.toggle();
      }), 3000)
    })
  }
  //HandleClick is passed down as a prop to the GalleryThumb child to return the index of the selected thumbnail to be set in state. This will be used to set the active image.
  handleClick = (index, state) => {
    this.setState({
      selectedImage: index,
    })
  }
  //HandleRestartClick is tied to the button that restarts the random shuffle. It resets the selectedImage to '' and restarts the 2nd timer.
  handleRestartClick = (index, state) => {
    this.setState({
      selectedImage: ''
    });
    let restartTimer = setInterval((() => {
      if(this.state.selectedImage){
          clearInterval(restartTimer)
          this.state.addClassCheck = false
        }
      this.setState({
        currentImage: this.getRandomImageId()
      });
        this.toggle();
    }), 3000)
  }
  render() {
    let localURL = ''
    let localWidth = ''
    let localHeight = ''
    //Need to check if the array is populated before trying to render, URL is undefined otherwise.
    //Check if there is a selected image, set active image to that index, or if there isn't one go to random shuffle.
    if (this.state.gifyArray.length > 0) {
      if(this.state.selectedImage){
        localURL = this.state.gifyArray[this.state.selectedImage].url
      }else{
        localURL = this.state.gifyArray[this.state.currentImage].url
      }
      localWidth = this.state.gifyArray[this.state.currentImage].width
      localHeight = this.state.gifyArray[this.state.currentImage].height
    }
    //Img renders the active image with whatever the latest index in the state is. Index sets the current url dynamically.
    //Passing handleClick as a prop to Gallery Thumb to be able to set the state in the parent.
    //Gallery Thumb renders the image thumbnails.
    //Again, the toggle function toggles addClassCheck to true or false. One value triggers dynamic application of 'slide' animation (from the left) on the active/current image, the other of next-slide (from top).
    let addClass = [""];
      if(this.state.addClassCheck) {
        addClass.push('slide');
      } else {
        addClass.push('next-slide')
      }
    let restartButton;
    if(this.state.selectedImage){
      restartButton = <button 
                        className="restart-button button-width"
                        onClick={this.handleRestartClick}>
                      Restart Random Shuffle
                      </button>
    }
    return (
      <div id="rotatingImg" className="active-image">
        <div className="wrapper">
          <img 
            width={localWidth}
            height={localHeight}
            className={addClass.join(' ')}
            src={localURL} 
            alt={"Random Gif #" + this.state.currentImage}/>
        </div>
        {restartButton}
        <GalleryThumb array={this.state.gifyArray} action={this.handleClick} removeAction={this.delete}></GalleryThumb>
      </div>
    )
  }
}
class GalleryThumb extends Component {

  render() {
    let localArray = []
    //Need to check if the array is populated before trying to render.
    if (this.props.array.length > 0) {
      localArray = this.props.array
    }
    //Parse the array to output each url as an image.
    let thumbnails = localArray.map((el, index) => {
    //Clicking on the image sets selectedImage index to be used as active image until another one is clicked or the reset shuffle button is clicked.
      return(
        <div key={index} className="thumbnailGifs">
          <img 
              className="thumbImageSize" 
              src={el.url} 
              alt={"Random Gif #" + index}
              onClick={() => this.props.action(index)}
          />
          <button  
              className="thumbnailButton gradient-button"
              onClick={() => this.props.removeAction(index)}>
              Delete
          </button>
        </div>
      )
    })
    //Return image tags to be rendered in the parent.
    return <div className="thumbnails">{thumbnails}</div>
  }
}
export default App;
