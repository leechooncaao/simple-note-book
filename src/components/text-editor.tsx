import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  return <div>
    <MDEditor
      value={value}
      onChange={(value) => setValue(value ?? '')}
      />
  </div>;
};

export default TextEditor;
