import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Download, Calendar, Package, DollarSign, FileText, Clock } from 'lucide-react';

interface Order {
  id: number;
  accountId: string;
  orderId: string;
  date: string;
  client: string;
  mobile: string;
  city: string;
  region: string;
  type: string;
  items: number;
  packageSize: string;
  delivery: number;
  invoiceId: string;
  merchantNotes: string;
  status: 'delivered' | 'pending' | 'cancelled';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [dateRange, setDateRange] = useState('last-30-days');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage') as 'en' | 'ar' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const isRTL = language === 'ar';

  const translations = {
    en: {
      merchantName: 'Al-Rashid Delivery Corp',
      logout: 'Logout',
      dashboard: 'Dashboard',
      totalDeliveredOrders: 'Total Delivered Orders',
      totalDeliveryFees: 'Total Delivery Fees',
      totalInvoicedOrders: 'Total Invoiced Orders',
      pendingInvoiceOrders: 'Pending Invoice Orders',
      dateRange: 'Date Range',
      exportExcel: 'Export to Excel',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      thisMonth: 'This Month',
      accountId: 'Account ID',
      orderId: 'Order ID',
      date: 'Date',
      client: 'Client',
      mobile: 'Mobile',
      city: 'City',
      region: 'Region',
      type: 'Type',
      items: 'Items',
      packageSize: 'Package Size',
      delivery: 'Delivery',
      invoiceId: 'Invoice ID',
      merchantNotes: 'Merchant Notes',
      status: 'Status',
      delivered: 'Delivered',
      pending: 'Pending',
      cancelled: 'Cancelled',
      iqd: 'IQD',
      orders: 'orders',
      medium: 'Medium',
      large: 'Large',
      small: 'Small',
    },
    ar: {
      merchantName: 'شركة الرشيد للتوصيل',
      logout: 'تسجيل الخروج',
      dashboard: 'لوحة التحكم',
      totalDeliveredOrders: 'إجمالي الطلبات المسلمة',
      totalDeliveryFees: 'إجمالي رسوم التوصيل',
      totalInvoicedOrders: 'إجمالي الطلبات المفوترة',
      pendingInvoiceOrders: 'طلبات الفواتير المعلقة',
      dateRange: 'النطاق الزمني',
      exportExcel: 'تصدير إلى Excel',
      last7Days: 'آخر 7 أيام',
      last30Days: 'آخر 30 يوم',
      last90Days: 'آخر 90 يوم',
      thisMonth: 'هذا الشهر',
      accountId: 'معرف الحساب',
      orderId: 'رقم الطلب',
      date: 'التاريخ',
      client: 'العميل',
      mobile: 'الهاتف',
      city: 'المدينة',
      region: 'المنطقة',
      type: 'النوع',
      items: 'العناصر',
      packageSize: 'حجم الطرد',
      delivery: 'التوصيل',
      invoiceId: 'رقم الفاتورة',
      merchantNotes: 'ملاحظات التاجر',
      status: 'الحالة',
      delivered: 'تم التسليم',
      pending: 'قيد الانتظار',
      cancelled: 'ملغي',
      iqd: 'د.ع',
      orders: 'طلب',
      medium: 'متوسط',
      large: 'كبير',
      small: 'صغير',
    },
  };

  const t = translations[language];

  // Mock data for delivered orders
  const orders: Order[] = [
    { id: 1, accountId: 'HQ', orderId: '133409062', date: '2026-03-22', client: 'Mohamed Alkhafaji', mobile: '+9647728045727', city: 'بغداد', region: 'شارع فلسطين', type: 'كتب', items: 3, packageSize: 'medium', delivery: 5000, invoiceId: '2828051', merchantNotes: 'التوصيل صباحا فقط', status: 'delivered' },
    { id: 2, accountId: 'Service Center', orderId: '132846392', date: '2026-03-19', client: 'سالم دعبول', mobile: '+9647711111111', city: 'اربيل', region: 'اتلانتك', type: 'ملابس', items: 1, packageSize: 'large', delivery: 7500, invoiceId: '-1', merchantNotes: 'لا يوجد', status: 'pending' },
    { id: 3, accountId: 'HQ', orderId: '133521847', date: '2026-03-21', client: 'Ahmed Hassan', mobile: '+9647722334455', city: 'البصرة', region: 'الجمهورية', type: 'الكترونيات', items: 2, packageSize: 'medium', delivery: 6000, invoiceId: '2828052', merchantNotes: 'التسليم مساء', status: 'delivered' },
    { id: 4, accountId: 'Service Center', orderId: '133298741', date: '2026-03-20', client: 'فاطمة علي', mobile: '+9647733445566', city: 'النجف', region: 'المدينة', type: 'مجوهرات', items: 1, packageSize: 'small', delivery: 4500, invoiceId: '2828053', merchantNotes: 'حساس - التعامل بحذر', status: 'delivered' },
    { id: 5, accountId: 'HQ', orderId: '133674523', date: '2026-03-23', client: 'Omar Jabbar', mobile: '+9647744556677', city: 'كربلاء', region: 'العباسية', type: 'أدوات منزلية', items: 5, packageSize: 'large', delivery: 8000, invoiceId: '-1', merchantNotes: 'طرد كبير', status: 'pending' },
    { id: 6, accountId: 'Service Center', orderId: '132965214', date: '2026-03-18', client: 'ليلى محمود', mobile: '+9647755667788', city: 'الموصل', region: 'الجامعة', type: 'كتب', items: 4, packageSize: 'medium', delivery: 5500, invoiceId: '2828054', merchantNotes: 'التوصيل ظهرا', status: 'delivered' },
    { id: 7, accountId: 'HQ', orderId: '133847596', date: '2026-03-24', client: 'Hassan Qasim', mobile: '+9647766778899', city: 'بغداد', region: 'الكرادة', type: 'ملابس', items: 2, packageSize: 'medium', delivery: 5000, invoiceId: '2828055', merchantNotes: 'عنوان دقيق مرفق', status: 'delivered' },
    { id: 8, accountId: 'Service Center', orderId: '133125874', date: '2026-03-17', client: 'مريم فاضل', mobile: '+9647777889900', city: 'اربيل', region: 'الشرق', type: 'أحذية', items: 1, packageSize: 'small', delivery: 4000, invoiceId: '-1', merchantNotes: 'التحقق من المقاس', status: 'pending' },
    { id: 9, accountId: 'HQ', orderId: '133945268', date: '2026-03-25', client: 'كريم عدنان', mobile: '+9647788990011', city: 'البصرة', region: 'العشار', type: 'الكترونيات', items: 3, packageSize: 'large', delivery: 7500, invoiceId: '2828056', merchantNotes: 'يحتاج توقيع', status: 'delivered' },
    { id: 10, accountId: 'Service Center', orderId: '132745632', date: '2026-03-16', client: 'نور سالم', mobile: '+9647799001122', city: 'بغداد', region: 'المنصور', type: 'مستحضرات تجميل', items: 2, packageSize: 'small', delivery: 4500, invoiceId: '2828057', merchantNotes: 'طرد هش', status: 'delivered' },
  ];

  // Calculate summary metrics
  const totalDeliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const totalDeliveryFees = orders.reduce((sum, order) => sum + order.delivery, 0);
  const totalInvoicedOrders = orders.filter(order => order.invoiceId !== '-1').length;
  const pendingInvoiceOrders = orders.filter(order => order.invoiceId === '-1').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-IQ' : 'en-IQ').format(amount);
  };

  const handleLogout = () => {
    localStorage.removeItem('appLanguage');
    navigate('/');
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
    // Export logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return t.delivered;
      case 'pending':
        return t.pending;
      case 'cancelled':
        return t.cancelled;
      default:
        return status;
    }
  };

  const getPackageSizeLabel = (size: string) => {
    switch (size) {
      case 'medium':
        return t.medium;
      case 'large':
        return t.large;
      case 'small':
        return t.small;
      default:
        return size;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Merchant Name */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-800">
                {t.merchantName}
              </span>
            </div>

            {/* Right side - Language toggle and Logout */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Delivered Orders Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{t.totalDeliveredOrders}</p>
            <p className="text-2xl font-semibold text-slate-800">
              {formatCurrency(totalDeliveredOrders)} <span className="text-sm font-normal text-slate-500">{t.orders}</span>
            </p>
          </div>

          {/* Total Delivery Fees Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{t.totalDeliveryFees}</p>
            <p className="text-2xl font-semibold text-slate-800">
              {formatCurrency(totalDeliveryFees)} <span className="text-sm font-normal text-slate-500">{t.iqd}</span>
            </p>
          </div>

          {/* Total Invoiced Orders Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{t.totalInvoicedOrders}</p>
            <p className="text-2xl font-semibold text-slate-800">
              {formatCurrency(totalInvoicedOrders)} <span className="text-sm font-normal text-slate-500">{t.orders}</span>
            </p>
          </div>

          {/* Pending Invoice Orders Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{t.pendingInvoiceOrders}</p>
            <p className="text-2xl font-semibold text-slate-800">
              {formatCurrency(pendingInvoiceOrders)} <span className="text-sm font-normal text-slate-500">{t.orders}</span>
            </p>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* Table Header with Filters */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-800">{t.dashboard}</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date Range Filter */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" style={{ left: isRTL ? 'auto' : '0.75rem', right: isRTL ? '0.75rem' : 'auto' }} />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    style={{ paddingLeft: isRTL ? '1rem' : '2.5rem', paddingRight: isRTL ? '2.5rem' : '1rem' }}
                  >
                    <option value="last-7-days">{t.last7Days}</option>
                    <option value="last-30-days">{t.last30Days}</option>
                    <option value="last-90-days">{t.last90Days}</option>
                    <option value="this-month">{t.thisMonth}</option>
                  </select>
                </div>

                {/* Export Button */}
                <button
                  onClick={handleExportExcel}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.exportExcel}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.accountId}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.orderId}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.date}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.client}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.mobile}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.city}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.region}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.type}
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.items}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.packageSize}
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.delivery} ({t.iqd})
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.invoiceId}
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.merchantNotes}
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.status}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700 font-medium">
                      {order.accountId}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-600 max-w-[90px] truncate">
                      {order.orderId}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700">
                      {order.date}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-800 font-medium">
                      {order.client}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-600 max-w-[110px] truncate" dir="ltr">
                      {order.mobile}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700">
                      {order.city}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-600">
                      {order.region}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700">
                      {order.type}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700 text-center">
                      {order.items}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-600">
                      {getPackageSizeLabel(order.packageSize)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-700 text-right" dir="ltr">
                      {formatCurrency(order.delivery)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-600">
                      {order.invoiceId}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-600 max-w-[140px] truncate">
                      {order.merchantNotes}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}