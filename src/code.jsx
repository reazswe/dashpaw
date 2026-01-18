import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  Bell,
  Search,
  Home,
  FileText,
  PieChart,
  ShoppingCart,
  Package,
  Calendar,
  Mail,
  MessageSquare,
  User,
  Download,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Send,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

// Context & Hooks
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const useMediaQuery = (q) => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(q);
    setM(media.matches);
    const l = (e) => setM(e.matches);
    media.addEventListener("change", l);
    return () => media.removeEventListener("change", l);
  }, [q]);
  return m;
};
const useSidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);
  return {
    isOpen,
    toggle: () => setIsOpen((p) => !p),
    close: () => setIsOpen(false),
    isMobile,
  };
};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: () => setIsDark((p) => !p) }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// UI Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({ icon: Icon, title, value, change, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>
        <div className="flex items-center mt-2">
          <TrendingUp
            className={`w-4 h-4 mr-1 ${trend === "up" ? "text-green-500" : "text-red-500"} ${trend === "down" ? "rotate-180" : ""}`}
          />
          <span
            className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {change}
          </span>
        </div>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900 p-3 sm:p-4 rounded-full">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </Card>
);

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  ...props
}) => {
  const v = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  const s = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2 ${v[variant]} ${s[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        className={`w-full ${Icon ? "pl-10" : ""} px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
    )}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const v = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${v[variant]}`}
    >
      {children}
    </span>
  );
};

const Table = ({ headers, data, actions }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
          {actions && (
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {Object.values(row).map((cell, i) => (
              <td
                key={i}
                className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300"
              >
                {cell}
              </td>
            ))}
            {actions && (
              <td className="px-4 py-3 text-sm text-right">
                <div className="flex justify-end gap-2">
                  {actions(row, idx)}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) =>
  !isOpen ? null : (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

// Layout Components
const Sidebar = ({
  isOpen,
  onClose,
  isMobile,
  currentPage,
  setCurrentPage,
}) => {
  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Users, label: "Customers", id: "customers" },
    { icon: ShoppingCart, label: "Orders", id: "orders" },
    { icon: Package, label: "Products", id: "products" },
    { icon: FileText, label: "Reports", id: "reports" },
    { icon: Calendar, label: "Calendar", id: "calendar" },
    { icon: Mail, label: "Messages", id: "messages" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];
  const handleClick = useCallback(
    (id) => {
      setCurrentPage(id);
      if (isMobile) onClose();
    },
    [isMobile, onClose, setCurrentPage],
  );

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard Pro
          </h1>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

const Header = ({ onMenuClick, currentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="hidden sm:block text-xl font-semibold text-gray-900 dark:text-white capitalize">
            {currentPage}
          </h2>
          <div className="relative flex-1 max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center space-x-2 pl-2 border-l border-gray-300 dark:border-gray-600">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Data & State Management
const useAppData = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1234567890",
      orders: 45,
      spent: "$2,340",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1234567891",
      orders: 32,
      spent: "$1,890",
      status: "Active",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      phone: "+1234567892",
      orders: 28,
      spent: "$1,560",
      status: "Inactive",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1234567893",
      orders: 51,
      spent: "$3,120",
      status: "Active",
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$129.99",
      stock: 45,
      sales: 234,
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: "$299.99",
      stock: 23,
      sales: 189,
    },
    {
      id: 3,
      name: "Laptop Stand",
      category: "Accessories",
      price: "$49.99",
      stock: 67,
      sales: 445,
    },
    {
      id: 4,
      name: "USB-C Cable",
      category: "Accessories",
      price: "$19.99",
      stock: 156,
      sales: 892,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice Johnson",
      preview: "Hey, I have a question about my order...",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Bob Smith",
      preview: "Thanks for the quick delivery!",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      sender: "Carol White",
      preview: "When will the new products be available?",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      sender: "David Brown",
      preview: "I need help with my account settings.",
      time: "1 day ago",
      unread: false,
    },
  ]);

  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    company: "Acme Inc",
    notifications: true,
  });

  const orders = useMemo(
    () => [
      {
        id: "#12345",
        customer: "Alice Johnson",
        date: "2024-01-15",
        amount: "$234.00",
        status: "Delivered",
        items: 3,
      },
      {
        id: "#12346",
        customer: "Bob Smith",
        date: "2024-01-14",
        amount: "$187.50",
        status: "Processing",
        items: 2,
      },
      {
        id: "#12347",
        customer: "Carol White",
        date: "2024-01-13",
        amount: "$542.00",
        status: "Delivered",
        items: 5,
      },
      {
        id: "#12348",
        customer: "David Brown",
        date: "2024-01-12",
        amount: "$95.00",
        status: "Cancelled",
        items: 1,
      },
      {
        id: "#12349",
        customer: "Emma Davis",
        date: "2024-01-11",
        amount: "$312.00",
        status: "Shipped",
        items: 4,
      },
    ],
    [],
  );

  const chartData = useMemo(
    () => ({
      revenue: [
        { month: "Jan", revenue: 4200, expenses: 2400, profit: 1800 },
        { month: "Feb", revenue: 5300, expenses: 2800, profit: 2500 },
        { month: "Mar", revenue: 4800, expenses: 2600, profit: 2200 },
        { month: "Apr", revenue: 6100, expenses: 3200, profit: 2900 },
        { month: "May", revenue: 7200, expenses: 3600, profit: 3600 },
        { month: "Jun", revenue: 6800, expenses: 3400, profit: 3400 },
      ],
      traffic: [
        { name: "Desktop", value: 45, color: "#3b82f6" },
        { name: "Mobile", value: 35, color: "#8b5cf6" },
        { name: "Tablet", value: 20, color: "#ec4899" },
      ],
      sales: [
        { month: "Jan", sales: 4200, visitors: 12400, conversion: 3.4 },
        { month: "Feb", sales: 5300, visitors: 14200, conversion: 3.7 },
        { month: "Mar", sales: 4800, visitors: 13100, conversion: 3.7 },
        { month: "Apr", sales: 6100, visitors: 15800, conversion: 3.9 },
        { month: "May", sales: 7200, visitors: 18200, conversion: 4.0 },
        { month: "Jun", sales: 6800, visitors: 16900, conversion: 4.0 },
      ],
    }),
    [],
  );

  return {
    customers,
    setCustomers,
    products,
    setProducts,
    messages,
    setMessages,
    settings,
    setSettings,
    orders,
    chartData,
  };
};

// Page Components
const DashboardPage = ({ chartData, orders }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
        icon={DollarSign}
        title="Total Revenue"
        value="$48,574"
        change="+12.5%"
        trend="up"
      />
      <StatCard
        icon={Users}
        title="Active Users"
        value="2,845"
        change="+8.2%"
        trend="up"
      />
      <StatCard
        icon={ShoppingCart}
        title="Total Orders"
        value="1,247"
        change="-3.1%"
        trend="down"
      />
      <StatCard
        icon={BarChart3}
        title="Conversion Rate"
        value="3.24%"
        change="+2.4%"
        trend="up"
      />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="lg:col-span-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Revenue Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData.revenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Traffic Sources
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={chartData.traffic}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              dataKey="value"
            >
              {chartData.traffic.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          Recent Orders
        </h2>
        <Button size="sm" variant="ghost">
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {orders.slice(0, 4).map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {o.customer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {o.id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">
                {o.amount}
              </p>
              <Badge
                variant={
                  o.status === "Delivered"
                    ? "success"
                    : o.status === "Processing"
                      ? "warning"
                      : "danger"
                }
              >
                {o.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const AnalyticsPage = ({ chartData }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Eye}
        title="Page Views"
        value="125.4K"
        change="+15.3%"
        trend="up"
      />
      <StatCard
        icon={Users}
        title="Unique Visitors"
        value="45.2K"
        change="+8.7%"
        trend="up"
      />
      <StatCard
        icon={Clock}
        title="Avg. Session"
        value="4m 32s"
        change="+12.1%"
        trend="up"
      />
      <StatCard
        icon={TrendingUp}
        title="Bounce Rate"
        value="32.4%"
        change="-5.2%"
        trend="up"
      />
    </div>
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Sales Performance
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData.sales}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Conversion Rate Trend
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData.sales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="conversion" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Top Performing Pages
        </h2>
        <div className="space-y-4">
          {[
            { page: "/products", views: "45.2K", rate: "4.5%" },
            { page: "/home", views: "38.7K", rate: "3.8%" },
            { page: "/pricing", views: "29.1K", rate: "5.2%" },
            { page: "/about", views: "18.5K", rate: "2.1%" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.page}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.views} views
                </p>
              </div>
              <Badge variant="success">{item.rate}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const CustomersPage = ({ customers, setCustomers }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const handleAdd = useCallback(() => {
    if (form.name && form.email && form.phone) {
      setCustomers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...form,
          orders: 0,
          spent: "$0",
          status: "Active",
        },
      ]);
      setForm({ name: "", email: "", phone: "" });
      setModalOpen(false);
    }
  }, [form, setCustomers]);
  const handleDelete = useCallback(
    (id) => setCustomers((prev) => prev.filter((c) => c.id !== id)),
    [setCustomers],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your customer database
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Add Customer
        </Button>
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Search customers..." icon={Search} />
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
        </div>
        <Table
          headers={["Name", "Email", "Phone", "Orders", "Spent", "Status"]}
          data={customers.map((c) => ({
            name: c.name,
            email: c.email,
            phone: c.phone,
            orders: c.orders,
            spent: c.spent,
            status: (
              <Badge variant={c.status === "Active" ? "success" : "default"}>
                {c.status}
              </Badge>
            ),
          }))}
          actions={(row, idx) => (
            <>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600"
                onClick={() => handleDelete(customers[idx].id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      </Card>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Customer"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Phone"
            placeholder="+1234567890"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAdd}>
              Add Customer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const OrdersPage = ({ orders }) => {
  const getStatusVariant = (s) =>
    ({
      Delivered: "success",
      Processing: "warning",
      Shipped: "info",
      Cancelled: "danger",
    })[s] || "default";
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Track and manage orders
          </p>
        </div>
        <Button icon={Download}>Export</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: ShoppingCart,
            title: "Total Orders",
            value: "1,247",
            bg: "blue",
          },
          { icon: CheckCircle, title: "Delivered", value: "892", bg: "green" },
          { icon: Clock, title: "Processing", value: "245", bg: "yellow" },
          { icon: XCircle, title: "Cancelled", value: "110", bg: "red" },
        ].map((s, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div
                className={`p-3 bg-${s.bg}-100 dark:bg-${s.bg}-900 rounded-full`}
              >
                <s.icon
                  className={`w-6 h-6 text-${s.bg}-600 dark:text-${s.bg}-400`}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {s.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {s.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Search orders..." icon={Search} />
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
        </div>
        <Table
          headers={[
            "Order ID",
            "Customer",
            "Date",
            "Items",
            "Amount",
            "Status",
          ]}
          data={orders.map((o) => ({
            id: o.id,
            customer: o.customer,
            date: o.date,
            items: o.items,
            amount: o.amount,
            status: (
              <Badge variant={getStatusVariant(o.status)}>{o.status}</Badge>
            ),
          }))}
          actions={() => (
            <>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Download className="w-4 h-4" />
              </button>
            </>
          )}
        />
      </Card>
    </div>
  );
};

const ProductsPage = ({ products, setProducts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const handleAdd = useCallback(() => {
    if (form.name && form.category && form.price && form.stock) {
      setProducts((prev) => [
        ...prev,
        { id: prev.length + 1, ...form, sales: 0 },
      ]);
      setForm({ name: "", category: "", price: "", stock: "" });
      setModalOpen(false);
    }
  }, [form, setProducts]);
  const handleDelete = useCallback(
    (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    [setProducts],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          title="Total Products"
          value="1,247"
          change="+5.2%"
          trend="up"
        />
        <StatCard
          icon={DollarSign}
          title="Product Value"
          value="$124K"
          change="+8.7%"
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          title="Best Seller"
          value="892"
          change="+15.3%"
          trend="up"
        />
        <StatCard
          icon={XCircle}
          title="Out of Stock"
          value="12"
          change="-2.1%"
          trend="up"
        />
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Search products..." icon={Search} />
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
        </div>
        <Table
          headers={["Product Name", "Category", "Price", "Stock", "Sales"]}
          data={products.map((p) => ({
            name: p.name,
            category: <Badge>{p.category}</Badge>,
            price: p.price,
            stock: (
              <Badge variant={p.stock < 30 ? "danger" : "success"}>
                {p.stock}
              </Badge>
            ),
            sales: p.sales,
          }))}
          actions={(row, idx) => (
            <>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600"
                onClick={() => handleDelete(products[idx].id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      </Card>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Product"
      >
        <div className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Category"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Input
            label="Price"
            placeholder="$0.00"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Input
            label="Stock"
            type="number"
            placeholder="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAdd}>
              Add Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ReportsPage = ({ chartData }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Reports
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Generate and view business reports
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          icon: FileText,
          title: "Sales Report",
          desc: "Monthly sales overview",
          bg: "blue",
        },
        {
          icon: Users,
          title: "Customer Report",
          desc: "Customer insights",
          bg: "green",
        },
        {
          icon: Package,
          title: "Inventory Report",
          desc: "Stock levels",
          bg: "purple",
        },
      ].map((r, i) => (
        <Card
          key={i}
          className="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 bg-${r.bg}-100 dark:bg-${r.bg}-900 rounded-lg`}
            >
              <r.icon
                className={`w-8 h-8 text-${r.bg}-600 dark:text-${r.bg}-400`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {r.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {r.desc}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Sales vs Target
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData.revenue.map((d) => ({
            month: d.month,
            sales: d.revenue,
            target: d.revenue > 5000 ? 6000 : 5000,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

const CalendarPage = () => {
  const events = [
    {
      title: "Team Meeting",
      date: "2024-01-18",
      time: "10:00 AM",
      type: "meeting",
    },
    {
      title: "Product Launch",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "event",
    },
    {
      title: "Client Call",
      date: "2024-01-22",
      time: "11:30 AM",
      type: "call",
    },
    {
      title: "Quarterly Review",
      date: "2024-01-25",
      time: "3:00 PM",
      type: "meeting",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your schedule and events
          </p>
        </div>
        <Button icon={Plus}>Add Event</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            January 2024
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 p-2"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`text-center p-3 rounded-lg cursor-pointer transition-colors ${day === 18 ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"}`}
              >
                {day}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {e.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {e.date}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {e.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const MessagesPage = ({ messages }) => {
  const [selected, setSelected] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Messages
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Communicate with your customers
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="mb-4">
            <Input placeholder="Search messages..." icon={Search} />
          </div>
          <div className="space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(m)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${selected?.id === m.id ? "bg-blue-50 dark:bg-blue-900" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {m.sender[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {m.sender}
                      </h4>
                      {m.unread && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {m.preview}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {m.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          {selected ? (
            <div className="flex flex-col h-[500px]">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {selected.sender[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selected.sender}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Online
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                    {selected.sender[0]}
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="text-gray-900 dark:text-white">
                      {selected.preview}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                    <p className="text-white">
                      Thanks for reaching out! How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                />
                <Button icon={Send}>Send</Button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a message to start chatting
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

const SettingsPage = ({ settings, setSettings }) => {
  const handleSave = () => alert("Settings saved successfully!");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account settings
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Profile Settings
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={settings.name}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
              />
              <Input
                label="Company"
                value={settings.company}
                onChange={(e) =>
                  setSettings({ ...settings, company: e.target.value })
                }
              />
            </div>
            <div className="pt-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Preferences
              </h4>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email updates
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      notifications: !settings.notifications,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Account
            </h3>
            <div className="space-y-3">
              <Button
                variant="secondary"
                icon={User}
                className="w-full justify-start"
              >
                Edit Profile
              </Button>
              <Button
                variant="secondary"
                icon={Settings}
                className="w-full justify-start"
              >
                Privacy Settings
              </Button>
              <Button variant="danger" className="w-full justify-start">
                Delete Account
              </Button>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Security
            </h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                Two-Factor Auth
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AApp = () => {
  const { isOpen, toggle, close, isMobile } = useSidebar();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const data = useAppData();

  const pages = {
    dashboard: (
      <DashboardPage chartData={data.chartData} orders={data.orders} />
    ),
    analytics: <AnalyticsPage chartData={data.chartData} />,
    customers: (
      <CustomersPage
        customers={data.customers}
        setCustomers={data.setCustomers}
      />
    ),
    orders: <OrdersPage orders={data.orders} />,
    products: (
      <ProductsPage products={data.products} setProducts={data.setProducts} />
    ),
    reports: <ReportsPage chartData={data.chartData} />,
    calendar: <CalendarPage />,
    messages: <MessagesPage messages={data.messages} />,
    settings: (
      <SettingsPage settings={data.settings} setSettings={data.setSettings} />
    ),
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            isOpen={isOpen}
            onClose={close}
            isMobile={isMobile}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={toggle} currentPage={currentPage} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {pages[currentPage]}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AApp;
