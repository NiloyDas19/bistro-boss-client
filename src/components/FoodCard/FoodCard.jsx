import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";



const FoodCard = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    console.log(location);
    const [, refetch] = useCart();

    const handleAddToCart = food => {
        console.log(food);
        if(user && user.email){
            // TODO : send cart item to the database
            const cartItem = {
                menuId : _id,
                email : user.email,
                name, 
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
              .then( res => {
                console.log(res.data);
                if(res.data.insertedId){
                    swal({
                        title: "Good job!",
                        text: "Cart Added Successfully!",
                        icon: "success",
                        button: "close!",
                      });
                }
                refetch();
              })
              .catch(error => {
                console.log(error.message);
              });
        }
        else{
            swal({
                title: "You are not logged in",
                text: "Please Log in for add to the cart",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  navigate('/login', {state: location?.pathname});
                } 
              });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button 
                    onClick={() => handleAddToCart(item)}
                    className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;