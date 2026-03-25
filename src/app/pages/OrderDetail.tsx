import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, ArrowLeft, ArrowRight, MessageCircle, Phone, MapPin, Package, CreditCard, FileText } from 'lucide-react';

// Simple barcode component that generates random bars
function Barcode({ value }: { value: string }) {
  // Generate random bar pattern based on value
  const generateBars = () => {
    const bars = [];
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = 0; i < 50; i++) {
      const width = ((seed * (i + 1) * 7) % 3) + 1;
      const isBar = ((seed * (i + 1) * 13) % 2) === 0;
      bars.push({ width, isBar });
    }
    return bars;
  };

  const bars = generateBars();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end h-16 gap-px">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={bar.isBar ? 'bg-slate-900' : 'bg-transparent'}
            style={{ width: `${bar.width}px`, height: '100%' }}
          />
        ))}
      </div>
      <span className="text-xs font-mono text-slate-600 tracking-widest">{value}</span>
    </div>
  );
}

export default function OrderDetail() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

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
      backToDashboard: 'Back to Dashboard',
      orderTicket: 'Order Ticket',
      orderId: 'Order ID',
      date: 'Date',
      status: 'Status',
      delivered: 'Delivered',
      pending: 'Pending',
      cancelled: 'Cancelled',
      clientInformation: 'Client',
      clientName: 'Name',
      mobile: 'Mobile',
      secondaryMobile: 'Alt. Mobile',
      city: 'City',
      region: 'Region',
      location: 'Location',
      shipmentDetails: 'Shipment',
      accountId: 'Account',
      type: 'Type',
      items: 'Items',
      packageSize: 'Size',
      replacement: 'Replacement',
      yes: 'Yes',
      no: 'No',
      financialBreakdown: 'Payment',
      deliveryFee: 'Delivery Fee',
      invoiceId: 'Invoice',
      financialConfirmed: 'Confirmed',
      notes: 'Notes',
      merchantNotes: 'Merchant',
      driverIssueNotes: 'Driver Issue',
      iqd: 'IQD',
      support: 'Support',
      medium: 'Medium',
      large: 'Large',
      small: 'Small',
    },
    ar: {
      merchantName: 'شركة الرشيد للتوصيل',
      logout: 'تسجيل الخروج',
      backToDashboard: 'العودة إلى لوحة التحكم',
      orderTicket: 'تذكرة الطلب',
      orderId: 'رقم الطلب',
      date: 'التاريخ',
      status: 'الحالة',
      delivered: 'تم التسليم',
      pending: 'قيد الانتظار',
      cancelled: 'ملغي',
      clientInformation: 'العميل',
      clientName: 'الاسم',
      mobile: 'الهاتف',
      secondaryMobile: 'هاتف بديل',
      city: 'المدينة',
      region: 'المنطقة',
      location: 'الموقع',
      shipmentDetails: 'الشحنة',
      accountId: 'الحساب',
      type: 'النوع',
      items: 'العناصر',
      packageSize: 'الحجم',
      replacement: 'استبدال',
      yes: 'نعم',
      no: 'لا',
      financialBreakdown: 'الدفع',
      deliveryFee: 'رسوم التوصيل',
      invoiceId: 'الفاتورة',
      financialConfirmed: 'مؤكد',
      notes: 'الملاحظات',
      merchantNotes: 'التاجر',
      driverIssueNotes: 'مشكلة السائق',
      iqd: 'د.ع',
      support: 'الدعم',
      medium: 'متوسط',
      large: 'كبير',
      small: 'صغير',
    },
  };

  const t = translations[language];

  const order = {
    orderId: '133409062',
    date: '2026-03-22',
    status: 'delivered' as const,
    client: {
      name: 'Mohamed Alkhafaji',
      mobile: '+9647728045727',
      secondaryMobile: '+9647711111111',
      city: 'بغداد',
      region: 'شارع فلسطين',
      location: 'near market',
    },
    shipment: {
      accountId: 'HQ',
      type: 'كتب',
      items: 3,
      packageSize: 'medium',
      replacement: false,
    },
    financial: {
      deliveryFee: 5000,
      invoiceId: '2828051',
      financialConfirmed: true,
    },
    notes: {
      merchantNotes: 'التوصيل صباحا فقط',
      driverIssueNotes: 'لا يوجد',
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-IQ' : 'en-IQ').format(amount);
  };

  const handleLogout = () => {
    localStorage.removeItem('appLanguage');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500 text-white';
      case 'pending':
        return 'bg-amber-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-slate-500 text-white';
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

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          <span className="text-sm font-medium">{t.backToDashboard}</span>
        </button>

        {/* Ticket Container */}
        <div className="relative">
          {/* Ticket Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Ticket Header with Status */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.orderTicket}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="text-3xl font-bold tracking-wide">#{order.orderId}</div>
              <div className="text-sm text-slate-400 mt-1">{order.date}</div>
            </div>

            {/* Perforated Edge */}
            <div className="relative h-4 bg-slate-100">
              <div className="absolute inset-x-0 top-0 h-4 flex items-center justify-between px-0">
                <div className="w-4 h-8 bg-slate-100 rounded-r-full -ml-2" />
                <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-2" />
                <div className="w-4 h-8 bg-slate-100 rounded-l-full -mr-2" />
              </div>
            </div>

            {/* Ticket Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Client Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.clientInformation}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{t.clientName}</span>
                    <span className="text-sm font-semibold text-slate-800">{order.client.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{t.mobile}</span>
                    <span className="text-sm font-medium text-slate-700" dir="ltr">{order.client.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{t.secondaryMobile}</span>
                    <span className="text-sm font-medium text-slate-700" dir="ltr">{order.client.secondaryMobile}</span>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.location}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 bg-white rounded-full border border-slate-200 text-slate-700">{order.client.city}</span>
                    <span className="px-3 py-1 bg-white rounded-full border border-slate-200 text-slate-700">{order.client.region}</span>
                    <span className="px-3 py-1 bg-white rounded-full border border-slate-200 text-slate-600 text-xs">{order.client.location}</span>
                  </div>
                </div>
              </div>

              {/* Shipment Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.shipmentDetails}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">{t.type}</div>
                    <div className="text-sm font-semibold text-slate-800">{order.shipment.type}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">{t.items}</div>
                    <div className="text-lg font-bold text-slate-800">{order.shipment.items}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">{t.packageSize}</div>
                    <div className="text-sm font-semibold text-slate-800">{getPackageSizeLabel(order.shipment.packageSize)}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="flex-1 bg-slate-50 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500">{t.accountId}</span>
                    <span className="text-sm font-semibold text-slate-800">{order.shipment.accountId}</span>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500">{t.replacement}</span>
                    <span className={`text-sm font-semibold ${order.shipment.replacement ? 'text-amber-600' : 'text-slate-500'}`}>
                      {order.shipment.replacement ? t.yes : t.no}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.financialBreakdown}</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-emerald-700">{t.deliveryFee}</span>
                    <span className="text-xl font-bold text-emerald-800">
                      {formatCurrency(order.financial.deliveryFee)} <span className="text-sm font-medium">{t.iqd}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-600">{t.invoiceId}: {order.financial.invoiceId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.financial.financialConfirmed ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                      {order.financial.financialConfirmed ? t.yes : t.no}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.notes}</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <span className="text-xs text-amber-600 block mb-1">{t.merchantNotes}</span>
                    <span className="text-sm text-amber-800">{order.notes.merchantNotes}</span>
                  </div>
                  {order.notes.driverIssueNotes && order.notes.driverIssueNotes !== 'لا يوجد' && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                      <span className="text-xs text-red-600 block mb-1">{t.driverIssueNotes}</span>
                      <span className="text-sm text-red-800">{order.notes.driverIssueNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Perforated Edge Bottom */}
            <div className="relative h-4 bg-slate-100">
              <div className="absolute inset-x-0 top-0 h-4 flex items-center justify-between px-0">
                <div className="w-4 h-8 bg-slate-100 rounded-r-full -ml-2" />
                <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-2" />
                <div className="w-4 h-8 bg-slate-100 rounded-l-full -mr-2" />
              </div>
            </div>

            {/* Barcode Section */}
            <div className="bg-white px-6 py-6 flex flex-col items-center">
              <Barcode value={order.orderId} />
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-3 text-center border-t border-slate-100">
              <p className="text-xs text-slate-400">Designed by NAFCO.SPACE</p>
            </div>
          </div>
        </div>
      </main>

      {/* Support Button */}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
        onClick={() => console.log('Support clicked')}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{t.support}</span>
      </button>
    </div>
  );
}
