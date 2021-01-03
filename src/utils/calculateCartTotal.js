const calculateCartTotal = products => {
  const total = products.reduce((acc, el) => {
    acc += el.product.price * 100 * el.quantity;
    return acc;
  }, 0);
  const cartTotal = (total / 100).toFixed(2);

  return { cartTotal, stripeTotal: total };
};

export default calculateCartTotal;
