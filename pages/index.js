import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react'; //allows you to store what the yser types

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('') //store output of API that we want to show the user
  const [isGenerating, setIsGenerating] = useState(false) //creates a loading state, which allows us to tell the user that their prompt is generating

  const callGenerateEndpoint = async () => {
    setIsGenerating(true); // when user presses button, we turn on generating so loading screen can be shown

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', { //dk wtf this does
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // convert response to JSON (dk why tho)
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`); // set "apiOutput" @ the top to output.text, which is what gpt3 sends
    setIsGenerating(false); //generating is all done!
  }
  const onUserChangedText = (event) => {
    //console.log(event.target.value); ---> shows if we rlly are capturing the stuff the user is typing in.
    setUserInput(event.target.value); // sets user input to whatever is in the text area?? don't rlly understand yet
  };
  return (
    <div className="root">
      <Head>
        <title>tronald dump</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>yo i'm tronald dump: donald trump's alter ego
            </h1>
          </div>
          <div className="header-subtitle">
            <h2>ask me anything. don't worry, i'm very nice.</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="get ready for some love, peace, and calm..."
          className="prompt-box"
          value={userInput} //whatever the user inputs is going to be shown in the text area
          onChange={onUserChangedText}  //whenever the user types smth new, it calls onUserChangedText       
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'} //better if-else in JS. if true, show loader; if false, show generate word
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>ask</p>} 
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p> /* shows API output on the screen */
            </div>
          </div>)}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
