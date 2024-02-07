const Container = (props : any) => {
    return (
        <div className="container mx-auto pt-5">
            {props.children}
        </div>
    )
};
export default Container;
