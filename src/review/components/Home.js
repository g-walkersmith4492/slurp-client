import React from 'react'
import video from '../../SlurpAnimation.mp4'

const Home = () => {
  console.log('hello')
  return (
    <div className="home-background">
      <div id="video-wrapper">
        <video playsInline autoPlay muted loop id="bg-video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default Home
