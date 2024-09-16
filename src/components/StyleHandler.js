import React from 'react';
import { useElementStyleContext } from "@/context/ElementStyleContext";

import { myFetch } from '@/utils/myFetch';


// InputField component
const InputField = ({ styleKey, styleValue, elementState, dispatch }) => {

  // console.log(styleKey, styleValue);

  const [allValues, setAllValues] = React.useState([]);

  // const [key, setKey] = React.useState(styleKey);
  const [selectvalue, setSelectValue] = React.useState(styleValue);

  const fetchAllValues =async  () => {
    setAllValues([]);

    try{
    let v = styleKey.split(":");
    let prefix = ""; let key = "";
    if (v.length > 1) {
      prefix = v[0];
      key = v[1];
    } else {
      key = styleKey;
    }
    let url = process.env.API_URL + "api/builder/class-all-values/" + key;
    // console.log(url);
    let data = await myFetch(url);

    let all = data.all_values.split(',')
    if (prefix !== "") {
      all = all.map(v => prefix + ":" + v);
    }
    // console.log(all)
    // console.log(all)
    setAllValues(all)

    } catch(e) {
      console.log("class not available")
    }
  }

  React.useEffect(()=>{
    // console.log("Hello World!!!!!")
    fetchAllValues();
  },[elementState])


  const handleClick = (value) => {
    // setKey(k);
    // console.log(value);

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
      <div className='border-1 bg-base-200 rounded-md p-1 m-1'>
        <label htmlFor={styleKey}>
          {styleKey}
        </label>
        <select
          value={selectvalue}
          className='select select-bordered select-sm'
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



const AttributeField = ({ attributeKey, attributeValue, elementState, dispatch }) => {
  const [inputValue, setInputValue] = React.useState(attributeValue);

  const handleChange = (e) => {
    const value = e.target.value;
    let newAttributes = { ...elementState.attributes, [attributeKey]: value };
    dispatch({
      type: 'CHANGE_ELEMENT_ATTRIBUTE',
      payload: { id: elementState.elementId, attributes: newAttributes },
    });
    setInputValue(value);
  }

  return (
    <div className='border-1 bg-base-200 rounded-md p-1 m-1'>
      <label htmlFor={attributeKey}>
        {attributeKey}
      </label>
      <input
        type="text"
        value={inputValue}
        className='input input-bordered input-sm'
        onChange={handleChange}
      />
    </div>
  );
};


import { useDomContext } from "@/context/DomContext";

// StyleHandler component
export default function StyleHandler() {
  const { elementState, setElementState } = useElementStyleContext();
  const { dispatch } = useDomContext();

  const handleDeleteClick = (event, elementId) => {
    event.stopPropagation();
    setElementState({ styles: {}, elementId: null });
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { id: elementId },
    });
  };

  if (elementState.elementId === null) {
    return null;
  }

  return (
    <>
      <button
        onClick={(e) => handleDeleteClick(e, elementState.elementId)}
        className="btn btn-sm btn-error rounded absolute top-2 right-2"
      >
        Delete
      </button>

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
