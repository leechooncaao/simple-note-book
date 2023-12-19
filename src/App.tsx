import React, {useEffect, useRef, useState} from 'react';
import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const esbuildRef = useRef<any>(false);
  const iframeRef = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    if (esbuildRef.current) return; 
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.19.9/esbuild.wasm'
    });
    esbuildRef.current = true;
  };

  const onClick = async () => {
    if (!esbuildRef.current || !iframeRef?.current) return;

    iframeRef.current.srcdoc = html;

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

    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }  
        }, false);
      </script>
    </body>
  </html>
  `;

  return (
    <div>
      <textarea rows={5} cols={39} value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
        </div>
      <iframe title='preview' ref={iframeRef} srcDoc={html} sandbox='allow-scripts'/>
    </div>
  );
}

export default App;
