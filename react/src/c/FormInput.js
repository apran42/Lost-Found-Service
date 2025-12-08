import react from "react";

function FormInput({label,type,value,onChange,placeholder}){
    <div>
        <label>{label}</label>
        <input
            tpye={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>

}

export default FormInput;