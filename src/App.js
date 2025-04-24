import './App.css';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function App() {
  const videoConstraints = {
    facingMode: "user"
  };

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = () => {
    setCameraOn(true);
    setImgSrc(null); // сбросить предыдущую фотографию
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        setCameraOn(false); // выключить камеру после фото (если нужно)
      } else {
        alert("Не удалось сделать фото, попробуйте ещё раз");
      }
    }
  };

  return (
    <div className="App App-header">


      <div className='camera'>
        {!cameraOn && (
          <button className='button' onClick={startCamera}>Open Camera</button>
        )}

        {cameraOn && (
          <div>
            <div style={{"position": "relative"}}> 
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: 320, height: 240 }}
              playsInline
              autoPlay
            />
              <svg
  style={{
    position: "absolute",
    top: -60,
    left: 0,
    pointerEvents: "none",
    width: 320,
    height: 400
  }}
  viewBox="0 0 320 400"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Овал головы */}
  <ellipse
    cx="160"
    cy="180"
    rx="90"
    ry="120"
    stroke="#00FF00"
    strokeWidth="4"
    fill="none"
  />
  {/* Левый глаз - контур */}
  <ellipse
    cx="110"
    cy="150"
    rx="20"
    ry="12"
    fill="none"
    stroke="#00FF00"
    strokeWidth="2"
  />
  {/* Правый глаз - контур */}
  <ellipse
    cx="210"
    cy="150"
    rx="20"
    ry="12"
    fill="none"
    stroke="#00FF00"
    strokeWidth="2"
                />
                
                 {/* Левое ухо */}
  <ellipse
    cx="60"
    cy="180"
    rx="15"
    ry="40"
    fill="none"
    stroke="#00FF00"
    strokeWidth="3"
  />
  {/* Правое ухо */}
  <ellipse
    cx="260"
    cy="180"
    rx="15"
    ry="40"
    fill="none"
    stroke="#00FF00"
    strokeWidth="3"
  />


              </svg>

            </div>

            <button className='button' onClick={capture}>Take Photo</button>
          </div>
        )}

        {imgSrc && (
          <img src={imgSrc} alt="captured" style={{ marginTop: 20, width: 320 }} />
        )}
      </div>
    </div>
  );
}

export default App;
