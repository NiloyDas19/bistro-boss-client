import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChessKing } from "react-icons/fa";
import swal from "sweetalert";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleDelete = (id) => {
        console.log(id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/users/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                swal("User deleted successfully", {
                                    icon: "success",
                                });
                                refetch();
                            }
                            else {
                                swal("Your cart is safe!");
                            }
                        })
                } else {
                    swal("Your cart is safe!");
                }
            });
    }

    const handleUser = (id) => {
        console.log(id);
    }

    return (
        <div>
            <div className="flex justify-between mb-10">
                <h1 className="text-3xl">All Users</h1>
                <p className="text-3xl">Total Users : {users.length}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleUser(user._id)}
                                            className="btn bg-red-500 btn-lg">
                                            <FaChessKing />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn bg-red-800 btn-lg">
                                            <RiDeleteBin6Line />
                                        </button>
                                    </td>

                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;