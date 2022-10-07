const soundBox = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(0.5);
  const [currentSound, setCurrentSound] = React.useState("Sound");
  return (
    <div>
      <h1>Drum Machine!</h1>
      <br />
      <div id="display">Current sound: {currentSound}</div>
      <div id="drum-machine">
        {soundBox.map((src) => (
          <Pad
            key={src.id}
            clip={src}
            volume={volume}
            current={setCurrentSound}
          />
        ))}
      </div>
      <br />
      <h2>Volume</h2>
      <input
        type="range"
        step="0.01"
        onChange={(event) => setVolume(event.target.value)}
        value={volume}
        max="1"
        min="0"
      ></input>
    </div>
  );
}

function Pad({ clip, volume, current }) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    console.log(event.keyCode);
    if (event.keyCode === clip.keyCode) {
      playIt();
      displaySound();
    }
  };

  const playIt = () => {
    const audio = document.getElementById(clip.keyTrigger);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    current((e) => clip.id);
  };

  const displaySound = () => {
    const sound = document.getElementById(clip.id);
    current = sound;
  };

  return (
    <div id="drum-pad">
      <button onClick={playIt} className="drum-pad" id={clip.id}>
        <audio id={clip.keyTrigger} src={clip.url} className="clip"></audio>
        <div id="key">{clip.keyTrigger}</div>
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
