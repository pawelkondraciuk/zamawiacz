import gql from 'graphql-tag';

export const OrderItemCreate = gql`
  mutation CreateOrderItem(
    $orderId: String!
    $orderItem: OrderItemInputType!
  ) {
    createOrderItem(
      order: $orderId,
      orderItem: $orderItem,
    ) {
      id,
      name,
      price,
    }
  }
`;

export const OrderItemRemove = gql`
  mutation removeOrderItem(
    $id: String!
  ) {
    removeOrderItem(
      id: $id,
    ) {
      id,
      name,
      price,
    }
  }
`;
