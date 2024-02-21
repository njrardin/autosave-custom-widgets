import _ from "lodash";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import useMockApi from "./useMockAPI";


export default function usePlanningForm() {
    const { getFormData, postQuestions } = useMockApi();
    const defaultValues = getFormData();

    const { formState, register, getValues, reset, control } = useForm({ defaultValues });
    const { dirtyFields } = formState;
    const debouncedSubmit = useCallback(
        _.debounce(async (data: any) => {
            if (Object.keys(dirtyFields).length == 0) return;

            // Only submit the dirty fields
            const dirtyData = Object.keys(dirtyFields).reduce((acc: any, key) => {
                acc[key] = data[key];
                return acc;
            }, {});
            //! This is where the questions post to the API
            postQuestions(dirtyData);
            reset(data, {
                keepValues: true,
            });
        }, 1000),
        [dirtyFields]
    );
    const onChange = async () => {
        const currValues = getValues();
        await debouncedSubmit(currValues);
    };

    return {
        onChange,
        register: register,
        isDirty: formState.isDirty,
        control,
    };
}