import { useState } from "react";

function useInput(){
    const [value, setValue] = useState("")
    
    const handleChange = (e) =>{
        setValue(e.target.value);
    };

    const reset = () =>{
        setValue("");
    }

    return { value, handleChange, reset }

}



export default useInput;