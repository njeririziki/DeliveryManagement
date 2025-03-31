const CreateEditUserDetails = () => {
    return ( 
        <div>
            
            
            <form className="grid grid-cols-2 gap-4">
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