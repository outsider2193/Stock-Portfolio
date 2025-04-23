import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "1",
      user: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      plan: "Premium",
      status: "active",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
    },
    {
      id: "2",
      user: "Michael Chen",
      email: "michael.chen@example.com",
      plan: "Basic",
      status: "expired",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
    },
    {
      id: "3",
      user: "Emily Williams",
      email: "emily.williams@example.com",
      plan: "Premium",
      status: "active",
      startDate: "2025-03-15",
      endDate: "2025-04-14",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedSubscription || {},
  });

  const onSubmit = (data) => {
    if (selectedSubscription) {
      // Update existing subscription
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === selectedSubscription.id ? { ...sub, ...data, id: sub.id } : sub
        )
      );
    } else {
      // Add new subscription
      const newSubscription = {
        id: (subscriptions.length + 1).toString(),
        ...data,
      };
      setSubscriptions([...subscriptions, newSubscription]);
    }
    setShowAddForm(false);
    setSelectedSubscription(null);
    reset();
  };

  const handleEdit = (subscription) => {
    setSelectedSubscription(subscription);
    setShowAddForm(true);
    reset(subscription);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setSelectedSubscription(null);
            reset();
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Subscription
        </button>
      </div>

      {/* Subscription Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://readdy.ai/api/search-image?query=professional headshot portrait natural lighting neutral background&width=40&height=40&seq=${
                          parseInt(subscription.id) + 6
                        }&orientation=squarish`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.user}
                      </div>
                      <div className="text-sm text-gray-500">{subscription.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{subscription.plan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : subscription.status === "expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscription.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscription.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Subscription Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-6">
              {selectedSubscription ? "Edit Subscription" : "Add New Subscription"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("user", { required: "User name is required" })}
                />
                {errors.user && (
                  <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("plan", { required: "Plan is required" })}
                >
                  <option value="">Select Plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
                {errors.plan && (
                  <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("startDate", { required: "Start date is required" })}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("endDate", { required: "End date is required" })}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedSubscription(null);
                    reset();
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {selectedSubscription ? "Update Subscription" : "Add Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;