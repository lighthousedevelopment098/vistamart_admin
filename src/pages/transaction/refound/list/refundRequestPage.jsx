import React from 'react';
import RefundManagement from './refundRequests.jsx'; // Adjust the import path as needed

const PendingRefunds = () => (
  <RefundManagement status="pending" title="Pending Refunds" />
);

const ApprovedRefunds = () => (
  <RefundManagement status="approved" title="Approved Refunds " />
);

const RefundedRefunds = () => (
  <RefundManagement status="refunded" title="Refunded Refunds" />
);

const RejectedRefunds = () => (
  <RefundManagement status="rejected" title="Rejected Refunds" />
);

export {
  PendingRefunds,
  ApprovedRefunds,
  RefundedRefunds,
  RejectedRefunds
};
