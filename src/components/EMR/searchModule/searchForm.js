import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
const SearchForm = (props) => {

    return (
            
                <div class="col-10 col-md-6 col-lg-4 input-group">
                    <input type="text" class="form-control " name="name" id="name"  placeholder="Enter Search Name" aria-label="Username" aria-describedby="basic-addon1" onChange={
                        (e)=>{
                            props.getSearchName(e.target.value);
                        }}/>
                    <div class="input-group-prepend rounded">
                        <span class="input-group-text " id="basic-addon1"><SearchIcon className="text-primary"/></span>
                    </div>
                </div>
            
                
        
     );
}
 
export default SearchForm;
