import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const MenuItem = ({ menuItem, addToCart }) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="font-bold">₹{menuItem.price}</CardContent>
    </Card>
  );
};

export default MenuItem;

