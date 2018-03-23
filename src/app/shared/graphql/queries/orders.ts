import gql from 'graphql-tag';

export const AllOrders = gql`
  query GetAllOrders {
    orders {
      id
      name
      createdAt
      completedAt
      deliveryCost
      paymentMethod
      status
      user {
        name
      }
      orderItems {
        name
        price
      }
    }
  }
`;

export const OrderCreate = gql`
  mutation OrderCreate (
    $name: String!,
    $deliveryCost: Float!,
    $paymentMethod: String!
  ) {
    createOrder (
      order: {
        name: $name,
        deliveryCost: $deliveryCost,
        paymentMethod: $paymentMethod
      }
    ) {
      id
      name
      createdAt
      deliveryCost
      paymentMethod
      status
      user {
        name
      }
    }
  }
`;

export const OrderUpdate = gql`
  mutation OrderUpdate (
    $id: String!,
    $order: OrderInputType!,
  ) {
    updateOrder (
      id: $id,
      order: $order
    )
  }
`;
