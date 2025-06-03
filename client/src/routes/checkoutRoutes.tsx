import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutPage from '../pages/checkout/CheckoutPage';
import SuccessPage from '../pages/checkout/SuccessPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

const checkoutRoutes = (
  <>
    <Route
      path="/checkout/:courseId"
      element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/checkout/success"
      element={
        <ProtectedRoute>
          <SuccessPage />
        </ProtectedRoute>
      }
    />
  </>
);

export default checkoutRoutes; 