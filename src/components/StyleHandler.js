import React from 'react';
import { useElementStyleContext } from "@/context/ElementStyleContext";

import { myFetch } from '@/utils/myFetch';


// InputField component
const InputField = ({ styleKey, styleValue, elementState, dispatch }) => {


  const [allValues, setAllValues] = React.useState([]);

  // const [key, setKey] = React.useState(styleKey);
  const [selectvalue, setSelectValue] = React.useState(styleValue);

  const fetchAllValues =async  () => {
    setAllValues([]);

    try{
    let url = process.env.API_URL + "api/builder/class-all-values/" + styleKey;
    let data = await myFetch(url);

    let all = data.all_values.split(',')
    // console.log(all)
    // console.log(all)
    setAllValues(all)

    } catch(e) {
      console.log("class not available")
    }
  }

  React.useEffect(()=>{
    console.log("Hello World!!!!!")
    fetchAllValues();
  },[elementState])


  const handleClick = (value) => {
    // setKey(k);
    console.log(value);

    // console.log(styleKey, styleValue);
    let newStyles = { ...elementState.styles, [styleKey]: value };
    console.log(newStyles);

    // console.log(elementState.styles);

    dispatch({
      type: 'CHANGE_ELEMENT_STYLE',
      payload: { id: elementState.elementId, styles: newStyles },
    });

    // console.log(elementState.styles);
    setSelectValue(value);
    // console(k, v)
  }

  // if (type === "select") {
    return (
      <div>
        <label htmlFor={styleKey}>
          {styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}:
        </label>
        <select
          value={selectvalue}
          onChange={(e) => handleClick(e.target.value)}
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
  const { elementState } = useElementStyleContext();

  const { domJson, dispatch } = useDomContext();


  return (
    <>
      {Object.entries(elementState?.styles).map(([styleKey, styleValue], index) => (
        <InputField
          key={index}
          styleKey={styleKey}
          styleValue={styleValue}
          elementState={elementState}
          dispatch={dispatch}
        />
      ))}
    </>
  );
}
