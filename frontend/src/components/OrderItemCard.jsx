import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import {
  useUpdateMyRestaurant,
  useUpdateMyRestaurantOrder,
} from "@/api/MyRestaurantApi";

const OrderItemCard = ({ order }) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus) => {
    await updateRestaurantStatus({
      orderId: order._id,
      status: newStatus,
    });

    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:{" "}
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>

          <div>
            Delivery address:{" "}
            <span className="ml-2 font-normal">
              {order.deliveryDetails.address}, {order.deliveryDetails.city}
            </span>
          </div>

          <div>
            Time: <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Total Cost:{" "}
            <span className="ml-2 font-normal">
              ₹{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>

        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {order.cartItems.map((cartItem, index) => (
            <span key={index}>
              <Badge variant={"outline"} className="mr-2">
                {cartItem.quantity}
              </Badge>

              {cartItem.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent position="popper">
              {ORDER_STATUS.map((status, index) => (
                <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;

