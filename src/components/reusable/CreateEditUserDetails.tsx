const CreateEditUserDetails = () => {
    return ( 
        <div>
            <h1>CreateEditUserDetails</h1>
            <form>
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
                <label>Email</label>
                <input type="text" placeholder="Email" />
                <label>Phone</label>
                <input type="text" placeholder="Phone" />
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default CreateEditUserDetails;