import React from 'react';
import { useElementStyleContext } from "@/context/ElementStyleContext";

import { myFetch } from '@/utils/myFetch';

// Define the available styles
const styles = {
  "color": { "type": "select", "option": ["", "text-primary", "text-secondary", "text-accent"] },
  "outline": { "type": "select", "option": ["", "btn-outline"] },
  "bg": { "type": "select", "option": ["", "bg-base-100", "bg-base-200", "bg-base-300"] },
  "btn": { "type": "select", "option": ["", "btn-primary", "btn-secondary", "btn-accent"] },
  "card": { "type": "select", "option": [""] }
};

// InputField component
const InputField = ({ styleKey, styleValue, onChange }) => {

  const [allValues, setAllValues] = React.useState([]);

  const fetchAllValues =async  () => {

    try{
    let url = process.env.API_URL + "api/builder/class-all-values/" + styleKey;
    let data = await myFetch(url);

    let all = data.all_values.split(',')
    // console.log(all)
    setAllValues(all)
    } catch(e) {
      console.log("class not available")
    }
  }

  React.useEffect(()=>{
    console.log("Hello World!!!!!")
    fetchAllValues();
  },[])
  // Check if styleKey exists in styles
  // if (!styles[styleKey]) {
  //   return null;
  // }

  // const { type, option } = styles[styleKey];

  // if (type === "select") {
    return (
      <div>
        <label htmlFor={styleKey}>
          {styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}:
        </label>
        <select
          id={styleKey}
          value={styleValue}
          onChange={(e) => onChange(styleKey, e.target.value)}
        >
          {allValues.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  // }

  // return null;
};

import { useDomContext } from "@/context/DomContext";

// StyleHandler component
export default function StyleHandler() {
  const { domJson, dispatch } = useDomContext();
  const { elementState } = useElementStyleContext();

  // Handle change event
  const handleChange = (styleKey, styleValue) => {
    let newStyles = { ...elementState.styles, [styleKey]: styleValue };

    dispatch({
      type: 'CHANGE_ELEMENT_STYLE',
      payload: { id: elementState.elementId, styles: newStyles },
    });
  };

  return (
    <>
      {Object.entries(elementState?.styles).map(([styleKey, styleValue], index) => (
        <InputField
          key={index}
          styleKey={styleKey}
          styleValue={styleValue}
          onChange={handleChange}
        />
      ))}
    </>
  );
}
