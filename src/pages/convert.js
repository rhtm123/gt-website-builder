import { myFetch } from "@/utils/myFetch";
import React from "react";

export default function Convert() {
  const [html, setHtml] = React.useState("");
  const [json, setJson] = React.useState("");

  // Function to generate unique IDs
  // const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  // Convert HTML string to JSON


  // Handle the conversion when button is clicked
  const handleClick = async () => {
    // Create a temporary container to parse the HTML string

    let url =  process.env.API_URL + "api/builder/convert-html-to-json/"

    try {
      let data = await myFetch(url, "POST", {html: html});
      console.log(data);
      setJson(JSON.stringify(data))
      // setJson(data);
    } catch (e) {
      console.log(e)
    }
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, 'text/html');
    // const div = doc.querySelector('div'); // Get the first div element

    // if (div) {
    //   // Convert the content of the div to JSON
    //   const json = htmlToJson(div, { current: 1 });
    //   setJson(JSON.stringify(json, null, 2)); // Pretty-print JSON
    // } else {
    //   setJson("No <div> element found in the provided HTML.");
    // }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-60"
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        placeholder="Paste your HTML here"
      />
      <button onClick={handleClick}>Convert</button>
      <pre>{json}</pre> {/* Use <pre> to display formatted JSON */}
    </div>
  );
}
