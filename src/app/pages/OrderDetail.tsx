import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

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
      orderDetail: 'Order Detail',
      orderId: 'Order ID',
      date: 'Date',
      status: 'Status',
      delivered: 'Delivered',
      pending: 'Pending',
      cancelled: 'Cancelled',
      clientInformation: 'Client Information',
      clientName: 'Client Name',
      mobile: 'Mobile',
      secondaryMobile: 'Secondary Mobile',
      city: 'City',
      region: 'Region',
      location: 'Location',
      shipmentDetails: 'Shipment Details',
      accountId: 'Account ID',
      type: 'Type',
      items: 'Items',
      packageSize: 'Package Size',
      replacement: 'Replacement',
      yes: 'Yes',
      no: 'No',
      financialBreakdown: 'Financial Breakdown',
      deliveryFee: 'Delivery Fee',
      invoiceId: 'Invoice ID',
      financialConfirmed: 'Financial Confirmed',
      notes: 'Notes',
      merchantNotes: 'Merchant Notes',
      driverIssueNotes: 'Driver Issue Notes',
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
      orderDetail: 'تفاصيل الطلب',
      orderId: 'رقم الطلب',
      date: 'التاريخ',
      status: 'الحالة',
      delivered: 'تم التسليم',
      pending: 'قيد الانتظار',
      cancelled: 'ملغي',
      clientInformation: 'معلومات العميل',
      clientName: 'اسم العميل',
      mobile: 'الهاتف',
      secondaryMobile: 'الهاتف الثانوي',
      city: 'المدينة',
      region: 'المنطقة',
      location: 'الموقع',
      shipmentDetails: 'تفاصيل الشحنة',
      accountId: 'معرف الحساب',
      type: 'النوع',
      items: 'العناصر',
      packageSize: 'حجم الطرد',
      replacement: 'استبدال',
      yes: 'نعم',
      no: 'لا',
      financialBreakdown: 'التفاصيل المالية',
      deliveryFee: 'رسوم التوصيل',
      invoiceId: 'رقم الفاتورة',
      financialConfirmed: 'تأكيد مالي',
      notes: 'الملاحظات',
      merchantNotes: 'ملاحظات التاجر',
      driverIssueNotes: 'ملاحظات مشكلة السائق',
      iqd: 'د.ع',
      support: 'الدعم',
      medium: 'متوسط',
      large: 'كبير',
      small: 'صغير',
    },
  };

  const t = translations[language];

  // Mock order data (in a real app, this would come from URL params and API)
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

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          <span className="text-sm font-medium">{t.backToDashboard}</span>
        </button>

        {/* Order Detail Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Section 1: Order Header */}
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">{t.orderId}:</span>
                <span className="text-lg font-semibold text-slate-800">{order.orderId}</span>
              </div>
              <div className="w-px h-5 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">{t.date}:</span>
                <span className="text-sm font-medium text-slate-700">{order.date}</span>
              </div>
              <div className="w-px h-5 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">{t.status}:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Client Information */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              {t.clientInformation}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.clientName}</span>
                <span className="text-sm font-medium text-slate-800">{order.client.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.mobile}</span>
                <span className="text-sm font-medium text-slate-800" dir="ltr">{order.client.mobile}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.secondaryMobile}</span>
                <span className="text-sm font-medium text-slate-800" dir="ltr">{order.client.secondaryMobile}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.city}</span>
                <span className="text-sm font-medium text-slate-800">{order.client.city}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.region}</span>
                <span className="text-sm font-medium text-slate-800">{order.client.region}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.location}</span>
                <span className="text-sm font-medium text-slate-800">{order.client.location}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Shipment Details */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              {t.shipmentDetails}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.accountId}</span>
                <span className="text-sm font-medium text-slate-800">{order.shipment.accountId}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.type}</span>
                <span className="text-sm font-medium text-slate-800">{order.shipment.type}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.items}</span>
                <span className="text-sm font-medium text-slate-800">{order.shipment.items}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.packageSize}</span>
                <span className="text-sm font-medium text-slate-800">{getPackageSizeLabel(order.shipment.packageSize)}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.replacement}</span>
                <span className="text-sm font-medium text-slate-800">{order.shipment.replacement ? t.yes : t.no}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Financial Breakdown */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              {t.financialBreakdown}
            </h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-blue-600 block mb-1">{t.deliveryFee}</span>
                  <span className="text-sm font-semibold text-blue-800">
                    {formatCurrency(order.financial.deliveryFee)} {t.iqd}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-blue-600 block mb-1">{t.invoiceId}</span>
                  <span className="text-sm font-semibold text-blue-800">{order.financial.invoiceId}</span>
                </div>
                <div>
                  <span className="text-xs text-blue-600 block mb-1">{t.financialConfirmed}</span>
                  <span className="text-sm font-semibold text-blue-800">
                    {order.financial.financialConfirmed ? t.yes : t.no}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Notes */}
          <div className="px-6 py-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
              {t.notes}
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.merchantNotes}</span>
                <span className="text-sm font-medium text-slate-800">{order.notes.merchantNotes}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">{t.driverIssueNotes}</span>
                <span className="text-sm font-medium text-slate-800">{order.notes.driverIssueNotes}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Support Button - Fixed Bottom Right */}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
        onClick={() => console.log('Support clicked')}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{t.support}</span>
      </button>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-slate-500">Designed by NAFCO.SPACE</p>
      </footer>
    </div>
  );
}
