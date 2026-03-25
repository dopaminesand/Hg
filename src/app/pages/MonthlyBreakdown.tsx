import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface MonthlyData {
  month: string;
  ordersCount: number;
  totalDeliveryFees: number;
  invoicedOrders: number;
  pendingInvoiceOrders: number;
}

interface ProvinceData {
  name: string;
  nameAr: string;
  orders: number;
}

export default function MonthlyBreakdown() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
      monthlyBreakdown: 'Monthly Breakdown',
      exportExcel: 'Export to Excel',
      monthlyDeliveryFeesOverview: 'Monthly Delivery Fees Overview',
      ordersByAccount: 'Orders by Account',
      ordersByProvince: 'Orders by Province',
      month: 'Month',
      ordersCount: 'Orders Count',
      totalDeliveryFees: 'Total Delivery Fees',
      invoicedOrders: 'Invoiced Orders',
      pendingInvoiceOrders: 'Pending Invoice Orders',
      iqd: 'IQD',
      orders: 'orders',
      page: 'Page',
      of: 'of',
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      mayShort: 'May',
      jun: 'Jun',
      jul: 'Jul',
      aug: 'Aug',
      sep: 'Sep',
      oct: 'Oct',
      nov: 'Nov',
      dec: 'Dec',
    },
    ar: {
      merchantName: 'شركة الرشيد للتوصيل',
      logout: 'تسجيل الخروج',
      monthlyBreakdown: 'التفصيل الشهري',
      exportExcel: 'تصدير إلى Excel',
      monthlyDeliveryFeesOverview: 'نظرة عامة على رسوم التوصيل الشهرية',
      ordersByAccount: 'الطلبات حسب الحساب',
      ordersByProvince: 'الطلبات حسب المحافظة',
      month: 'الشهر',
      ordersCount: 'عدد الطلبات',
      totalDeliveryFees: 'إجمالي رسوم التوصيل',
      invoicedOrders: 'الطلبات المفوترة',
      pendingInvoiceOrders: 'طلبات الفواتير المعلقة',
      iqd: 'د.ع',
      orders: 'طلب',
      page: 'صفحة',
      of: 'من',
      january: 'يناير',
      february: 'فبراير',
      march: 'مارس',
      april: 'أبريل',
      may: 'مايو',
      june: 'يونيو',
      july: 'يوليو',
      august: 'أغسطس',
      september: 'سبتمبر',
      october: 'أكتوبر',
      november: 'نوفمبر',
      december: 'ديسمبر',
      jan: 'ينا',
      feb: 'فبر',
      mar: 'مار',
      apr: 'أبر',
      mayShort: 'ماي',
      jun: 'يون',
      jul: 'يول',
      aug: 'أغس',
      sep: 'سبت',
      oct: 'أكت',
      nov: 'نوف',
      dec: 'ديس',
    },
  };

  const t = translations[language];

  // Monthly chart data
  const monthlyChartData = [
    { month: t.jan, value: 180000 },
    { month: t.feb, value: 165000 },
    { month: t.mar, value: 220000 },
    { month: t.apr, value: 195000 },
    { month: t.mayShort, value: 235000 },
    { month: t.jun, value: 210000 },
    { month: t.jul, value: 245000 },
    { month: t.aug, value: 230000 },
    { month: t.sep, value: 215000 },
    { month: t.oct, value: 255000 },
    { month: t.nov, value: 240000 },
    { month: t.dec, value: 275000 },
  ];

  // Account distribution data
  const accountData = [
    { name: 'HQ', value: 65, color: '#3b82f6' },
    { name: 'Service Center', value: 35, color: '#10b981' },
  ];

  // Province data
  const provinceData: ProvinceData[] = [
    { name: 'Baghdad', nameAr: 'بغداد', orders: 145 },
    { name: 'Basra', nameAr: 'البصرة', orders: 87 },
    { name: 'Erbil', nameAr: 'اربيل', orders: 63 },
    { name: 'Mosul', nameAr: 'الموصل', orders: 41 },
    { name: 'Karbala', nameAr: 'كربلاء', orders: 38 },
  ];

  // Table data
  const monthlyTableData: MonthlyData[] = [
    { month: t.january, ordersCount: 45, totalDeliveryFees: 225000, invoicedOrders: 40, pendingInvoiceOrders: 5 },
    { month: t.february, ordersCount: 38, totalDeliveryFees: 190000, invoicedOrders: 35, pendingInvoiceOrders: 3 },
    { month: t.march, ordersCount: 62, totalDeliveryFees: 310000, invoicedOrders: 58, pendingInvoiceOrders: 4 },
    { month: t.april, ordersCount: 51, totalDeliveryFees: 255000, invoicedOrders: 47, pendingInvoiceOrders: 4 },
    { month: t.may, ordersCount: 58, totalDeliveryFees: 290000, invoicedOrders: 54, pendingInvoiceOrders: 4 },
    { month: t.june, ordersCount: 49, totalDeliveryFees: 245000, invoicedOrders: 45, pendingInvoiceOrders: 4 },
    { month: t.july, ordersCount: 66, totalDeliveryFees: 330000, invoicedOrders: 62, pendingInvoiceOrders: 4 },
    { month: t.august, ordersCount: 54, totalDeliveryFees: 270000, invoicedOrders: 50, pendingInvoiceOrders: 4 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-IQ' : 'en-IQ').format(amount);
  };

  const handleLogout = () => {
    localStorage.removeItem('appLanguage');
    navigate('/');
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  // Pagination
  const totalPages = Math.ceil(monthlyTableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = monthlyTableData.slice(startIndex, startIndex + itemsPerPage);

  const getProvinceColor = (orders: number) => {
    const maxOrders = Math.max(...provinceData.map(p => p.orders));
    const intensity = orders / maxOrders;
    
    // Blue gradient based on order volume
    if (intensity > 0.8) return '#1e40af'; // Dark blue
    if (intensity > 0.6) return '#3b82f6'; // Medium blue
    if (intensity > 0.4) return '#60a5fa'; // Light blue
    if (intensity > 0.2) return '#93c5fd'; // Lighter blue
    return '#dbeafe'; // Very light blue
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">{t.monthlyBreakdown}</h1>
          <button
            onClick={handleExportExcel}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{t.exportExcel}</span>
          </button>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.monthlyDeliveryFeesOverview}</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value) + ' ' + t.iqd, t.totalDeliveryFees]}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Two Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.ordersByAccount}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accountData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {accountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => `${value}: ${entry.payload.value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Province Map Visualization */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.ordersByProvince}</h2>
            <div className="space-y-3">
              {provinceData.map((province) => (
                <div
                  key={province.name}
                  className="group relative flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-400 transition-all cursor-pointer"
                  style={{
                    backgroundColor: getProvinceColor(province.orders) + '20',
                    borderColor: getProvinceColor(province.orders),
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getProvinceColor(province.orders) }}
                    />
                    <span className="font-medium text-slate-800">
                      {isRTL ? province.nameAr : province.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700 font-semibold">{formatCurrency(province.orders)}</span>
                    <span className="text-sm text-slate-500">{t.orders}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isRTL ? province.nameAr : province.name}: {formatCurrency(province.orders)} {t.orders}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.month}
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.ordersCount}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.totalDeliveryFees} ({t.iqd})
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.invoicedOrders}
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {t.pendingInvoiceOrders}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedData.map((row, index) => (
                  <tr 
                    key={row.month} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                      {row.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 text-center">
                      {formatCurrency(row.ordersCount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 text-right" dir="ltr">
                      {formatCurrency(row.totalDeliveryFees)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 text-center">
                      {formatCurrency(row.invoicedOrders)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 text-center">
                      {formatCurrency(row.pendingInvoiceOrders)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {t.page} {currentPage} {t.of} {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRTL ? '›' : '‹'}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRTL ? '‹' : '›'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
