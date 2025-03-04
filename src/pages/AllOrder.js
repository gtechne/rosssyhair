import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(SummaryApi.allOrder.url, {
                    method: SummaryApi.allOrder.method,
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
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
        <section className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4  text-gray-800">All Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg animate-fade-in">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-4 border">S/N</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Order ID</th>
                            <th className="py-2 px-4 border">Customer Email</th>
                            <th className="py-2 px-4 border">Order Amount (₦)</th>
                            <th className="py-2 px-4 border">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="border-b text-center hover:bg-gray-100 transition-all cursor-pointer"
                                onClick={() => navigate(`/admin-panel/order-details/${order._id}`)}
                                >
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">
                                        {format(new Date(order.createdAt), "dd MMM yyyy,hh:mm a")}
                                    </td>
                                    <td
                                        className="py-2 px-4 border text-blue-600 cursor-pointer"
                                        onClick={() => navigate(`/admin-panel/order-details/${order._id}`)}
                                    >
                                        {order.paymentDetails.paymentReference}
                                    </td>
                                    <td className="py-2 px-4 border">{order.email}</td>
                                    <td className="py-2 px-4 border">{order.totalAmount.toFixed(2)}</td>
                                    <td className="py-2 px-4 border">{order.orderStatus || "Order Placed"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-600">
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

export default AllOrder;
