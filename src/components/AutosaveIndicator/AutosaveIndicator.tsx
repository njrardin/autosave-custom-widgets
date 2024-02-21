interface AutosaveIndicatorProps {
    status: "Saved" | "Saving" | "Unsaved";
}
export default function AutosaveIndicator({ status }: AutosaveIndicatorProps){
    return (
        <div>
            <span>{status}</span>
        </div>
    );
};