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
              videoConstraints={{ facingMode: { exact: "user" } }}
              style={{ width: "100%", height: "320px" }}
              playsInline
              autoPlay
              muted
            />
              <svg
                  style={{
                    position: "absolute",
                    top: -20,
                    left: -40,
                    pointerEvents: "none",
                    width: 280,
                    height: 300
                  }}
                  viewBox="0 0 280 300"
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
              </svg>

            </div>

            <button className='button' onClick={capture}>Take Photo</button>
          </div>
        )}

        {imgSrc && (
          <img src={imgSrc} alt="captured" style={{ marginTop: 10, width: 320 }} />
        )}
      </div>
    </div>
  );
}

export default App;
