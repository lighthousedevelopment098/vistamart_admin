
import React from 'react';
import OrderManagement from './OrderManagement.jsx';

const PendingOrders = () => (
  <OrderManagement status="pending" title="Pending" />
);

const ConfirmedOrders = () => (
  <OrderManagement status="confirmed" title="Confirmed" />
);

const DeliveredOrders = () => (
  <OrderManagement status="delivered" title="Delivered" />
);

const PackagingOrders = () => (
  <OrderManagement status="packaging" title="Packaging" />
);

const OutForDeliveryOrders = () => (
  <OrderManagement status="out_for_delivery" title="Out for Delivery" />
);

const FailedToDeliverOrders = () => (
  <OrderManagement status="failed_to_deliver" title="Failed to Deliver" />
);

const ReturnedOrders = () => (
  <OrderManagement status="returned" title="Returned" />
);

const CanceledOrders = () => (
  <OrderManagement status="canceled" title="Canceled" />
);

export {
  PendingOrders,
  ConfirmedOrders,
  DeliveredOrders,
  PackagingOrders,
  OutForDeliveryOrders,
  FailedToDeliverOrders,
  ReturnedOrders,
  CanceledOrders
};
