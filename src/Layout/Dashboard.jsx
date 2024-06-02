import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart, FaStar } from "react-icons/fa";
import { FaListCheck, FaMessage, FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex gap-5">
            {/* Dashboard Sidebar */}
            <div className="flex w-64 min-h-screen bg-orange-400">
                <ul className="menu w-full p-2">
                    <li>
                        <NavLink to="/dashboard/userHome" className="w-full">
                            <FaHome/>
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation" className="w-full">
                            <FaCalendar/>
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart" className="w-full">
                            <FaShoppingCart />
                            My Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review" className="w-full">
                            <FaAd />
                           Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings" className="w-full">
                            <FaList />
                           My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="w-full">
                            <FaHome />
                           Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="w-full">
                            <FaListCheck />
                           Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad" className="w-full">
                            <FaShop />
                           Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="w-full">
                            <FaMessage />
                           Contact
                        </NavLink>
                    </li>

                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;