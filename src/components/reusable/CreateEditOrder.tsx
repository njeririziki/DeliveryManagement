

const CreateEditOrder = () => {
    return ( 
        <div>
            <h1>CreateEditOrder</h1>
            <form>
                <label>Order Name</label>
                <input type="text" placeholder="Order Name" />
                <label>Order Description</label>
                <input type="text" placeholder="Order Description" />
                <label>Order Price</label>
                <input type="text" placeholder="Order Price" />
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default CreateEditOrder;