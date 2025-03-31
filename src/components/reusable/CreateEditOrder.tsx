

const CreateEditOrder = () => {
    return ( 
        <div>
       
            <form className="grid grid-cols-2 gap-4">
                <label>Order Name</label>
                <input type="text" placeholder="Order Name" />
                <label>Order Description</label>
                <input type="text" placeholder="Order Description" />
                <label>Order Price</label>
                <input type="text" placeholder="Order Price" />
                <button type="submit">Submit</button>
            </form>
        </div>
     );
}
 
export default CreateEditOrder;