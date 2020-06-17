import React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
    value: string;
    language?: string;
}

export const CodeBlock = ({ value, language }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter language={language} style={Style}>
            {value}
        </SyntaxHighlighter>
    );
};

const Color = {
    PRIMARY: "#66d9ef",
};

const Style = {
    'code[class*="language-"]': {
        color: "#f8f8f2",
        background: "none",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
    },
    'pre[class*="language-"]': {
        color: "#f8f8f2",
        background: "black",
        textShadow: "0 1px rgba(0, 0, 0, 0.3)",
        fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        lineHeight: "1.5",
        MozTabSize: "4",
        OTabSize: "4",
        tabSize: "4",
        WebkitHyphens: "none",
        MozHyphens: "none",
        msHyphens: "none",
        hyphens: "none",
        padding: "1em",
        margin: ".5em 0",
        overflow: "auto",
        borderRadius: "0.3em",
    },
    ':not(pre) > code[class*="language-"]': {
        background: "black",
        padding: ".1em",
        borderRadius: ".3em",
        whiteSpace: "normal",
    },
    comment: {
        color: "slategray",
    },
    prolog: {
        color: "slategray",
    },
    doctype: {
        color: "slategray",
    },
    cdata: {
        color: "slategray",
    },
    punctuation: {
        color: "#f8f8f2",
    },
    ".namespace": {
        Opacity: ".7",
    },
    property: {
        color: "#e6db74",
    },
    tag: {
        color: "#e6db74",
    },
    constant: {
        color: "#e6db74",
    },
    symbol: {
        color: "#e6db74",
    },
    deleted: {
        color: "#e6db74",
    },
    boolean: {
        color: "#ae81ff",
    },
    number: {
        color: "#ae81ff",
    },
    selector: {
        color: Color.PRIMARY,
    },
    "attr-name": {
        color: Color.PRIMARY,
    },
    string: {
        color: "#e6db74",
    },
    char: {
        color: Color.PRIMARY,
    },
    builtin: {
        color: Color.PRIMARY,
    },
    inserted: {
        color: Color.PRIMARY,
    },
    operator: {
        color: "#f8f8f2",
    },
    entity: {
        color: "#f8f8f2",
        cursor: "help",
    },
    url: {
        color: "#f8f8f2",
    },
    ".language-css .token.string": {
        color: "#f8f8f2",
    },
    ".style .token.string": {
        color: "#f8f8f2",
    },
    variable: {
        color: "#f8f8f2",
    },
    atrule: {
        color: "#e6db74",
    },
    "attr-value": {
        color: "#e6db74",
    },
    function: {
        color: "#e6db74",
    },
    "class-name": {
        color: "#e6db74",
    },
    keyword: {
        color: "#66d9ef",
    },
    regex: {
        color: "#fd971f",
    },
    important: {
        color: "#fd971f",
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
};
