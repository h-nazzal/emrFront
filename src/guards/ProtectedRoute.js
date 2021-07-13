
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({component:Component,Guard,...rest})
{
    return (
        <Route
        {...rest}
        render={(props)=>{
            if(Guard){
                return <Component {...props}/>
            }else{
                return <Redirect to={{
                    pathname:"",
                    state:{
                        from : props.location
                    }
                }}/>
            }
        }}
        />
    )
}