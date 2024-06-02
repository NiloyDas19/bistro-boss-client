import { RiDeleteBin6Line } from "react-icons/ri";
import useCart from "../../../hooks/useCart";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((pre, curr) => pre + curr.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        console.log(id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this food cart!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/carts/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                swal("Cart deleted successfully", {
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

    return (
        <div className="w-full">
            <div className="flex justify-between mb-8">
                <h2 className="text-4xl">Items : {cart.length}</h2>
                <h2 className="text-4xl">Total Price : {totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn bg-red-800 btn-lg">
                                        <RiDeleteBin6Line />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;