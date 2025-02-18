import React from "react";
import { Link} from "react-router-dom";


const UserMenu = () => {
    

    

    return (
        <div className="p-4">
            <nav className="grid gap-2">
                <Link to={"/dashboard/profile"} className="px-4 py-2 rounded-md hover:bg-gray-100">
                    Profile
                </Link>
                <Link to={"my-order"} className="px-4 py-2 rounded-md hover:bg-gray-100">
                    My Orders
                </Link>
                
            </nav>
        </div>
    );
};

export default UserMenu;
