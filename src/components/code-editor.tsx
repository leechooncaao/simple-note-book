import './code-editor.css';
import './syntax.css';
import MonacoEditor from "@monaco-editor/react";
import monaco from 'monaco-editor';
import prettier from 'prettier';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from "prettier/plugins/estree";
import {useCallback, useState} from "react";
import Highlighter from 'monaco-jsx-highlighter';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    wordWrap: 'on',
    minimap:  { enabled: false },
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2
  }
  
  const onChangeValue = (value: string | undefined) => {
    const currentValue = value ?? '';
    onChange(currentValue);
    setValue(currentValue);
  }

  const onFormatClick = async () => {
    const formattedValue = await prettier.format(value, {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true
    });

    setValue(formattedValue.replace(/\n$/, ''));
  }

  const handleEditorDidMount = useCallback((monacoEditor: any, monaco: any) => {
    const highlighter = new Highlighter(monaco, parse, traverse, monacoEditor);
    highlighter.highlightOnDidChangeModelContent();
  }, []);

  return (
    <div className='editor-wrapper'>
      <button 
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onChangeValue}
        value={value}
        height='100%' 
        language='javascript'
        theme='vs-dark'
        options={editorOptions}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
