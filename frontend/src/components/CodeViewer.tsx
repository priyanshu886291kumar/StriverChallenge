import React from "react";

interface CodeViewerProps {
  content: string;
  language?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ content, language }) => {
  return (
    <div className="code-viewer bg-gray-100 p-4 rounded shadow my-1">
      <pre className="overflow-auto">
        <code className={`code ${language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
