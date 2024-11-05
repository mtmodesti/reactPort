import AddUser from "../../components/addUser/Adduser";
import DeleteUser from "../../components/deleteUser/DeleteUser";
import "./userMaintenance.css";
import Getusers from "../../components/getUsers/GetUsers";
import UpdateUser from "../../components/updateUser/Updateuser";

const UserMaintenance = () => {
  return (
    <div className="wrapper">
        <AddUser />
        <DeleteUser />
        <Getusers />
        <UpdateUser />
    </div>
  );
};

export default UserMaintenance;
