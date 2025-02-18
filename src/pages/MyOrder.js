import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(SummaryApi.getOrder.url, {
                    method: SummaryApi.getOrder.method,
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setOrders(responseData.data);
                } else {
                    toast.error("Failed to load orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load orders. Please try again later.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <section className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                My Orders
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg animate-fade-in">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4">S/N</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Amount (₦)</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="border-b text-center hover:bg-gray-100 transition-all cursor-pointer"  onClick={() => navigate(`/order-detail/${order._id}`)}>
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">
                                        {format(new Date(order.createdAt), "dd MMM yyyy,hh:mm a")}
                                    </td>
                                    <td 
                                        className="py-3 px-4 text-blue-600 hover:text-blue-800 cursor-pointer transition-all"
                                        onClick={() => navigate(`/order-detail/${order._id}`)}
                                    >
                                        {order.paymentDetails.paymentReference}
                                    </td>
                                    <td className="py-3 px-4">{order.totalAmount.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-md text-sm font-semibold 
                                            ${order.orderStatus === "Delivered" ? "bg-green-200 text-green-800" : " text-yellow-800"}`}>
                                            {order.orderStatus || "Order Placed"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-600">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyOrders;
