var Checkbox = (props) => {
    return (
        <input
            type="checkbox"
            key={props.key}
            defaultChecked={props.defaultValue}
            onClick={(e) => {
                props.onChange(!props.defaultValue);
            }}
        />
    );
};

export { Checkbox };