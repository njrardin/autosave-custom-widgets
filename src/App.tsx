import { Control, Controller, UseFormRegister } from "react-hook-form";
import "./App.css";
import AutosaveIndicator from "./components/AutosaveIndicator";
import usePlanningForm from "./hooks/useAutosaveForm";
import { useState } from "react";

export default function App() {
    const { onChange, register, isDirty, control } = usePlanningForm();
    const autosaveStatus = isDirty ? "Saving" : "Saved";

    return (
        <>
            <h1>Autosaving Form w/ Custom Widgets</h1>

            <AutosaveIndicator status={autosaveStatus} />
            <div className="card">
                <form onChange={onChange}>
                    <TextInput name="q1" register={register} />
                    <CheckboxInput name="q2" checkboxes={["checkbox1", "checkbox2"]} register={register} />
                    <AppendableListQuestion question={{ id: "q3" }} control={control} />
                </form>
            </div>
        </>
    );
}

interface TextInputProps {
    name: string;
    register: UseFormRegister<any>;
}
function TextInput({ name, register }: TextInputProps) {
    return (
<>
            <label htmlFor={name}>{name}</label>
            <input {...register(name)} />
    
</>    );
}

interface CheckboxInputProps {
    name: string;
    checkboxes: string[];
    register: UseFormRegister<any>;
}
function CheckboxInput({ checkboxes, name, register }: CheckboxInputProps) {
    return (
        <fieldset>
            <legend>{name}</legend>
            {checkboxes.map((checkbox) => (
                <div key={checkbox}>
                    <input type="checkbox" value={checkbox} {...register(name)} />
                    <label>{checkbox}</label>
                </div>
            ))}
        </fieldset>
    );
}

interface AppendableListQuestionProps {
    question: {
        id: string;
    };
    control: Control;
}
function AppendableListQuestion({ question, control }: AppendableListQuestionProps) {
    const { id } = question;

    return (
        <Controller
            name={id.toString()}
            control={control}
            render={({ field: { onChange, value, } }) => (
                <AppendableList items={value} onChange={onChange} />
            )}
        />
    );
}

interface AppendableListProps {
    items: string[];
    onChange: (
        items: string[]
    ) => void;
}
function AppendableList({ items, onChange }: AppendableListProps) {
    if (!items) {
        items = [];
    }
    const [adderValue, setAdderValue] = useState("");

    // Add an item to the list when the button is clicked
    function addItem() {
        if (adderValue === "") return;
        const newItem = adderValue;
        const newList = [...items, newItem];
        onChange(newList);
        setAdderValue("");
    }

    function removeItem(value: string) {
        const newList = items.filter((item) => item !== value);
        onChange(newList);
    }

    // Update the value of the adder input
    function onChangeAdderValue(e: React.ChangeEvent<HTMLInputElement>) {
        setAdderValue(e.target.value);
    }

    return (
        <div >
            <div>
                <input type="text" placeholder="Add..." onChange={onChangeAdderValue} value={adderValue}/>
                <button type="button" onClick={addItem}>+</button>
            </div>
            <ul>
                {items.map((value) => (
                    <li key={value}>
                        {value}
                        <button type="button" onClick={() => removeItem(value)}>-</button>
                    </li>
                ))}
            </ul>
            <input type="hidden" disabled />
        </div>
    );
}