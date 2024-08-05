import { useElementStyleContext } from "@/context/ElementStyleContext";


let styles = {
    "color": {"type": "select", "option":["","text-primary","text-secondary","text-accent"]},
    "outline": {"type": "select", "option":["","btn-outline",]},
    "bg": {"type": "select", "option":["","bg-base-100","bg-base-200","bg-base-300"]},  
}

const InputField = ({ styleKey, styleValue, onChange }) => {
    // console.log(styleKey, styleValue);
    const { type, option } = styles[styleKey];
    
  
    if (type === "select") {
      return (
        <div>
          <label htmlFor={styleKey}>{styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}:</label>
          <select
            id={styleKey}
            value={styleValue}
            onChange={(e) => onChange(styleKey, e.target.value)}
          >
            {option.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }
  
    return null;
  };




import { useDomContext } from "@/context/DomContext";

export default function StyleHandler() {

    const { domJson, dispatch } = useDomContext();
    const { elementState ,setElementState} = useElementStyleContext();

    // console.log(elementState);

    const handleChange = (styleKey, styleValue) => { 
        console.log("Handle Change is called");
        // const updatedDomJson = JSON.parse(JSON.stringify(domJson));

        let newStyles = elementState.styles;
        newStyles[styleKey] = styleValue;

        dispatch({
            type: 'CHANGE_ELEMENT_STYLE',
            payload: { id: elementState.elementId, styles: newStyles },
          });
        // console.log(elementState);
        // const updateElementStyle = (element) => {
        //     if (element.id === elementState?.elementId) {
        //       console.log(element);
        //       element.styles[styleKey] = styleValue;
        //     //   setElementState({styles:element.styles, elementId: element.id});
        //     } else if (element.children) {
        //       element.children.forEach(updateElementStyle);
        //     }
        //   };

        //   updateElementStyle(updatedDomJson);
        
          // // Update the state with the new JSON
        //   setDomJson(updatedDomJson);
     }

    return(
        <>


    {Object.entries(elementState?.styles).map(([styleKey, styleValue]) => (
        <InputField
        styleKey={styleKey}
        styleValue={styleValue}
        onChange={handleChange}
      />
      ))}
        </>
    )
}