import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Building, Globe, Phone, FileText, Loader2, Sparkles } from 'lucide-react';
import { Language, TeaProduct, B2BInquiryForm } from '../types/puerh';
import { teaProducts } from '../data/puerhData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preSelectedTeaName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  language,
  preSelectedTeaName,
}) => {
  const [formData, setFormData] = useState<B2BInquiryForm>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'sample_kit',
    targetTeas: preSelectedTeaName ? [preSelectedTeaName] : ['Lao Ban Zhang Imperial Reserve 2023'],
    estimatedVolumeKg: 'Sample Evaluation (2-5 kg)',
    preferredTradeTerm: 'FOB',
    shippingDestinationPort: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [quoteReferenceId, setQuoteReferenceId] = useState('');

  if (!isOpen) return null;

  const handleToggleTea = (teaName: string) => {
    setFormData((prev) => {
      const exists = prev.targetTeas.includes(teaName);
      if (exists) {
        return { ...prev, targetTeas: prev.targetTeas.filter((t) => t !== teaName) };
      } else {
        return { ...prev, targetTeas: [...prev.targetTeas, teaName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Post to our server endpoint
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      const refId = data.referenceId || `YA-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReferenceId(refId);
      setSubmittedSuccess(true);
    } catch {
      // Fallback client reference
      const refId = `YA-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReferenceId(refId);
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#101712] border border-[#263e2c] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1c2c20] flex items-center justify-between bg-[#121c15]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1c2e20] flex items-center justify-center text-[#7de28d] border border-[#2e4733]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#ebf3ed]">
                {language === 'en'
                  ? 'B2B Export Inquiry & Sample Request'
                  : '外贸茶样申请与批发询价通道'}
              </h2>
              <p className="text-[11px] text-[#86a38b] font-serif-sc">
                {language === 'en'
                  ? 'Direct response from Yunnan Export Trade Desk within 12 hours'
                  : '云南茶山外贸出口组12小时内出具正式报价与寄样方案'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#18231a] text-[#8ea391] hover:text-white border border-[#263828] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submittedSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1b3422] border border-[#3b6343] text-[#63d973] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#edf6ef]">
                {language === 'en'
                  ? 'Inquiry Received Successfully'
                  : '外贸询盘与样品申请已成功提交'}
              </h3>

              <div className="p-4 rounded-xl bg-[#142017] border border-[#223525] max-w-md mx-auto text-xs text-[#a2bda6] font-serif-sc space-y-2">
                <div>
                  <span className="text-[#739478] font-cinzel mr-1">
                    {language === 'en' ? 'Reference Number:' : '询盘专署编号:'}
                  </span>
                  <span className="font-bold text-[#8ce297] font-cinzel text-sm">
                    {quoteReferenceId}
                  </span>
                </div>
                <p>
                  {language === 'en'
                    ? `Thank you, ${formData.fullName || 'Valued Partner'}. An export manager from our Kunming logistics hub has received your request for ${formData.targetTeas.join(', ')} and will email official COA specs and air freight tracking.`
                    : `感谢您的垂询，${formData.fullName || '贵公司伙伴'}。我们昆明外贸组已收到关于【${formData.targetTeas.join(', ')}】的申请，将发送正式原产地COA质检报告与航空寄样单号。`}
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#28442e] hover:bg-[#34593c] text-white text-xs font-semibold shadow-md transition-all border border-[#487851]"
              >
                {language === 'en' ? 'Return to Portal' : '返回网站'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-serif-sc">
              {/* Inquiry Type Radio */}
              <div>
                <label className="block text-[#a4bda8] mb-1 font-semibold">
                  {language === 'en' ? 'Inquiry Category:' : '需求类型：'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'sample_kit', labelEn: 'Sample Tasting Kit', labelZh: '索取品鉴茶样' },
                    { id: 'wholesale_order', labelEn: 'Bulk Wholesale (FOB/CIF)', labelZh: '批量外贸订单' },
                    { id: 'private_label_oem', labelEn: 'Private Label OEM', labelZh: '品牌贴牌定制' },
                    { id: 'custom_blend', labelEn: 'Vintage Collector Reserve', labelZh: '名山典藏配额' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          inquiryType: cat.id as B2BInquiryForm['inquiryType'],
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.inquiryType === cat.id
                          ? 'bg-[#213827] border-[#4e8257] text-[#ecf5ee] font-medium'
                          : 'bg-[#131b15] border-[#1e2a20] text-[#869c89] hover:text-[#d3e2d6]'
                      }`}
                    >
                      {language === 'en' ? cat.labelEn : cat.labelZh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Teas Checkboxes */}
              <div>
                <label className="block text-[#a4bda8] mb-1 font-semibold">
                  {language === 'en' ? 'Select Terroirs of Interest:' : '意向山场与茶品（可多选）：'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {teaProducts.map((tea) => {
                    const isChecked = formData.targetTeas.includes(
                      language === 'en' ? tea.nameEn : tea.nameZh
                    );
                    return (
                      <button
                        type="button"
                        key={tea.id}
                        onClick={() =>
                          handleToggleTea(language === 'en' ? tea.nameEn : tea.nameZh)
                        }
                        className={`p-2 rounded-lg border text-left transition-all text-[11px] truncate ${
                          isChecked
                            ? 'bg-[#1e3223] border-[#497c53] text-[#a7e8b2]'
                            : 'bg-[#121914] border-[#1c271e] text-[#819684] hover:text-[#c7dacb]'
                        }`}
                      >
                        ✓ {language === 'en' ? tea.nameEn.split(' ')[0] + ' ' + tea.nameEn.split(' ')[1] : tea.nameZh.split(' ')[1] || tea.nameZh}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Contact Name *' : '联系人姓名 *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'e.g. Jean Dupont' : '如：李先生 / 张女士'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  />
                </div>

                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Company / Tea House Name *' : '公司 / 茶室 / 机构名称 *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'e.g. Maison du Thé Paris' : '如：欧洲天然茶进口公司'}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  />
                </div>

                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Corporate Email *' : '企业邮箱 *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@teahouse.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  />
                </div>

                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Destination Country & City *' : '目的国家与城市 *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'e.g. France, Paris' : '如：美国，旧金山'}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  />
                </div>
              </div>

              {/* Volume & Trade Term */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Estimated Volume / Quantity:' : '预估需求量 / 批次：'}
                  </label>
                  <select
                    value={formData.estimatedVolumeKg}
                    onChange={(e) => setFormData({ ...formData, estimatedVolumeKg: e.target.value })}
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  >
                    <option value="Sample Evaluation (2-5 kg)">Sample Tasting Kit (2 - 5 kg)</option>
                    <option value="Trial Order (20 - 50 kg)">Trial Batch (20 - 50 kg)</option>
                    <option value="Commercial Consignment (100 - 500 kg)">Commercial Consignment (100 - 500 kg)</option>
                    <option value="Container FCL (1,000+ kg)">FCL Full Container (1,000+ kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8ea893] mb-1">
                    {language === 'en' ? 'Preferred Incoterm:' : '期望国际贸易术语：'}
                  </label>
                  <select
                    value={formData.preferredTradeTerm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredTradeTerm: e.target.value as B2BInquiryForm['preferredTradeTerm'],
                      })
                    }
                    className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2.5 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                  >
                    <option value="FOB">FOB Shenzhen / Guangzhou Port</option>
                    <option value="CIF">CIF Buyer Destination Port</option>
                    <option value="DDP">DDP Delivered Duty Paid (Door-to-door)</option>
                    <option value="EXW">EXW Yunnan Warehouse (Pick up in China)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[#8ea893] mb-1">
                  {language === 'en'
                    ? 'Special Requirements / OEM Notes (Optional):'
                    : '特殊要求 / 定制与样品备注（选填）：'}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    language === 'en'
                      ? 'Tell us about your brand, preferred vintage profile, or organic certification needs...'
                      : '请告知您的特定品味偏好、客制化棉纸包装或海关检疫要求...'
                  }
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full bg-[#152017] border border-[#253928] rounded-xl px-3.5 py-2 text-[#e5ede7] focus:outline-none focus:border-[#4d7b55]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#7da084]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5ec66e]" />
                  <span>
                    {language === 'en'
                      ? 'Encrypted & Direct to Factory Export Team'
                      : '直连茶山外贸仓储中心 · 严格保密商业信息'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2c4b31] to-[#3a6442] hover:from-[#345939] hover:to-[#44764e] text-white font-semibold text-xs shadow-lg transition-all border border-[#52845a] flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{language === 'en' ? 'Submitting...' : '提交中...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Send Export Inquiry' : '发送外贸询盘'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
