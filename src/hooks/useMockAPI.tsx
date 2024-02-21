export default function useMockApi() {
    function getFormData() {
        return {
            "q1": "Text",
            "q2": ["checkbox1", "checkbox2"],
            "q3": ["John Smith"],
        };
    }

    function postQuestions(questions: any) {
        console.log("Questions posted:", questions);
    }

    return {
        getFormData,
        postQuestions,
    };
}
