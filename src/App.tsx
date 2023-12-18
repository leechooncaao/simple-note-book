import React, {useEffect, useRef, useState} from 'react';
// import './App.css';
import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const esbuildRef = useRef(false);

  useEffect(() => {
    startService();
    esbuildRef.current = true;
  }, []);

  const startService = async () => {
    if (esbuildRef.current) return; 
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  const onClick = async () => {
    if (!esbuildRef.current) return;

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
        </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
