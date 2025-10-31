// ===== صفحة الإعدادات =====

function getSettingsContent() {
    const settings = DB.get(DB.KEYS.SETTINGS);
    const categories = DB.get(DB.KEYS.CATEGORIES);

    return `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">⚙️ إعدادات النظام</h3>
            </div>
            
            <div style="display: grid; gap: 30px;">
                <!-- معلومات الشركة -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        🏢 معلومات الشركة
                    </h4>
                    <form onsubmit="saveCompanySettings(event)" id="companyForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="companyName">اسم الشركة *</label>
                                <input type="text" id="companyName" value="${settings.companyName}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="companyPhone">الهاتف</label>
                                <input type="tel" id="companyPhone" value="${settings.companyPhone}">
                            </div>
                            
                            <div class="form-group">
                                <label for="companyEmail">البريد الإلكتروني</label>
                                <input type="email" id="companyEmail" value="${settings.companyEmail}">
                            </div>
                            
                            <div class="form-group">
                                <label for="companyAddress">العنوان</label>
                                <input type="text" id="companyAddress" value="${settings.companyAddress}">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">💾 حفظ التغييرات</button>
                    </form>
                </div>
                
                <!-- الإعدادات المالية -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        💰 الإعدادات المالية
                    </h4>
                    <form onsubmit="saveFinancialSettings(event)" id="financialForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="taxRate">نسبة الضريبة (%)</label>
                                <input type="number" id="taxRate" step="0.01" min="0" max="100" value="${settings.taxRate}">
                            </div>
                            
                            <div class="form-group">
                                <label for="currency">💱 العملة</label>
                                <select id="currency" required style="font-size: 1.1rem;">
                                    <option value="ريال" ${settings.currency === 'ريال' ? 'selected' : ''}>🇸🇦 ريال سعودي (ريال)</option>
                                    <option value="€" ${settings.currency === '€' ? 'selected' : ''}>🇪🇺 يورو (€)</option>
                                    <option value="$" ${settings.currency === '$' ? 'selected' : ''}>🇺🇸 دولار أمريكي ($)</option>
                                    <option value="£" ${settings.currency === '£' ? 'selected' : ''}>🇬🇧 جنيه إسترليني (£)</option>
                                    <option value="د.إ" ${settings.currency === 'د.إ' ? 'selected' : ''}>🇦🇪 درهم إماراتي (د.إ)</option>
                                    <option value="ج.م" ${settings.currency === 'ج.م' ? 'selected' : ''}>🇪🇬 جنيه مصري (ج.م)</option>
                                    <option value="د.ك" ${settings.currency === 'د.ك' ? 'selected' : ''}>🇰🇼 دينار كويتي (د.ك)</option>
                                    <option value="د.ب" ${settings.currency === 'د.ب' ? 'selected' : ''}>🇧🇭 دينار بحريني (د.ب)</option>
                                    <option value="ر.ع" ${settings.currency === 'ر.ع' ? 'selected' : ''}>🇴🇲 ريال عماني (ر.ع)</option>
                                    <option value="ر.ق" ${settings.currency === 'ر.ق' ? 'selected' : ''}>🇶🇦 ريال قطري (ر.ق)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="lowStockAlert">تنبيه المخزون المنخفض</label>
                                <input type="number" id="lowStockAlert" min="0" value="${settings.lowStockAlert}">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">💾 حفظ التغييرات</button>
                    </form>
                </div>
                
                <!-- إعدادات الفاتورة -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        🧾 إعدادات الفاتورة
                    </h4>
                    <form onsubmit="saveInvoiceSettings(event)" id="invoiceForm">
                        <div style="display: grid; gap: 15px;">
                            <div style="background: #f9fafb; padding: 15px; border-radius: 10px;">
                                <h5 style="margin-bottom: 10px; color: #333;">عناصر الفاتورة:</h5>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showLogo" ${settings.invoiceSettings?.showLogo !== false ? 'checked' : ''}>
                                        <span>عرض الشعار</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showCompanyInfo" ${settings.invoiceSettings?.showCompanyInfo !== false ? 'checked' : ''}>
                                        <span>معلومات الشركة</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showCustomerInfo" ${settings.invoiceSettings?.showCustomerInfo !== false ? 'checked' : ''}>
                                        <span>معلومات العميل</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showInvoiceNumber" ${settings.invoiceSettings?.showInvoiceNumber !== false ? 'checked' : ''}>
                                        <span>رقم الفاتورة</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showDateTime" ${settings.invoiceSettings?.showDateTime !== false ? 'checked' : ''}>
                                        <span>التاريخ والوقت</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showPaymentMethod" ${settings.invoiceSettings?.showPaymentMethod !== false ? 'checked' : ''}>
                                        <span>طريقة الدفع</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showTax" ${settings.invoiceSettings?.showTax !== false ? 'checked' : ''}>
                                        <span>الضريبة</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showPaidAmount" ${settings.invoiceSettings?.showPaidAmount !== false ? 'checked' : ''}>
                                        <span>المبلغ المدفوع</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showChange" ${settings.invoiceSettings?.showChange !== false ? 'checked' : ''}>
                                        <span>الباقي</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showFooterMessage" ${settings.invoiceSettings?.showFooterMessage !== false ? 'checked' : ''}>
                                        <span>رسالة الشكر</span>
                                    </label>
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" id="showPoweredBy" ${settings.invoiceSettings?.showPoweredBy !== false ? 'checked' : ''}>
                                        <span>تم الإنشاء بواسطة</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="footerMessage">رسالة الشكر في الفاتورة</label>
                                <input type="text" id="footerMessage" value="${settings.invoiceSettings?.footerMessage || 'شكراً لتعاملكم معنا'}" placeholder="شكراً لتعاملكم معنا">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">💾 حفظ إعدادات الفاتورة</button>
                    </form>
                </div>

                <!-- إدارة الفئات -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        📂 إدارة فئات المنتجات
                    </h4>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="newCategory" placeholder="اسم الفئة الجديدة" style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 8px;">
                            <button onclick="addCategory()" class="btn btn-primary">➕ إضافة</button>
                        </div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${categories.map(cat => `
                            <div style="background: #f9fafb; padding: 10px 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px;">
                                <span>${cat}</span>
                                <button onclick="deleteCategory('${cat}')" style="background: none; border: none; color: var(--danger-color); cursor: pointer; font-size: 1.2rem;">×</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- تغيير كلمة المرور -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        🔒 تغيير كلمة المرور
                    </h4>
                    <form onsubmit="changePassword(event)" id="passwordForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="currentPassword">كلمة المرور الحالية</label>
                                <input type="password" id="currentPassword" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="newPassword">كلمة المرور الجديدة</label>
                                <input type="password" id="newPassword" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="confirmPassword">تأكيد كلمة المرور</label>
                                <input type="password" id="confirmPassword" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-warning">🔑 تغيير كلمة المرور</button>
                    </form>
                </div>
                
                <!-- النسخ الاحتياطي -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        💾 النسخ الاحتياطي والاستعادة
                    </h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="exportData()" class="btn btn-success">
                            📤 تصدير البيانات
                        </button>
                        <button onclick="importData()" class="btn btn-info">
                            📥 استيراد البيانات
                        </button>
                        <button onclick="clearAllData()" class="btn btn-danger">
                            🗑️ مسح جميع البيانات
                        </button>
                    </div>
                    <div class="alert alert-warning" style="margin-top: 15px;">
                        ⚠️ تأكد من عمل نسخة احتياطية قبل مسح البيانات
                    </div>
                </div>
                
                <!-- معلومات النظام -->
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border-color);">
                        ℹ️ معلومات النظام
                    </h4>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 10px;">
                        <div style="display: grid; gap: 10px;">
                            <div><strong>اسم النظام:</strong> الملك - نظام إدارة نقاط البيع</div>
                            <div><strong>الإصدار:</strong> 1.0.0</div>
                            <div><strong>المطور:</strong> محمد فتحي</div>
                            <div><strong>الترخيص:</strong> مجاني ومفتوح المصدر</div>
                            <div><strong>عدد المنتجات:</strong> ${DB.getAllProducts().length}</div>
                            <div><strong>عدد العملاء:</strong> ${DB.getAllCustomers().length}</div>
                            <div><strong>عدد المبيعات:</strong> ${DB.getAllSales().length}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// حفظ إعدادات الشركة
function saveCompanySettings(event) {
    event.preventDefault();

    const settings = DB.get(DB.KEYS.SETTINGS);

    settings.companyName = document.getElementById('companyName').value;
    settings.companyPhone = document.getElementById('companyPhone').value;
    settings.companyEmail = document.getElementById('companyEmail').value;
    settings.companyAddress = document.getElementById('companyAddress').value;

    DB.set(DB.KEYS.SETTINGS, settings);
    showAlert('تم حفظ إعدادات الشركة بنجاح', 'success');
}

// حفظ الإعدادات المالية
function saveFinancialSettings(event) {
    event.preventDefault();

    const settings = DB.get(DB.KEYS.SETTINGS);

    settings.taxRate = parseFloat(document.getElementById('taxRate').value);
    settings.currency = document.getElementById('currency').value;
    settings.lowStockAlert = parseInt(document.getElementById('lowStockAlert').value);

    DB.set(DB.KEYS.SETTINGS, settings);
    showAlert('تم حفظ الإعدادات المالية بنجاح', 'success');
}

// حفظ إعدادات الفاتورة
function saveInvoiceSettings(event) {
    event.preventDefault();

    const settings = DB.get(DB.KEYS.SETTINGS);

    settings.invoiceSettings = {
        showLogo: document.getElementById('showLogo').checked,
        showCompanyInfo: document.getElementById('showCompanyInfo').checked,
        showCustomerInfo: document.getElementById('showCustomerInfo').checked,
        showInvoiceNumber: document.getElementById('showInvoiceNumber').checked,
        showDateTime: document.getElementById('showDateTime').checked,
        showPaymentMethod: document.getElementById('showPaymentMethod').checked,
        showItemDetails: true,
        showTax: document.getElementById('showTax').checked,
        showPaidAmount: document.getElementById('showPaidAmount').checked,
        showChange: document.getElementById('showChange').checked,
        showFooterMessage: document.getElementById('showFooterMessage').checked,
        footerMessage: document.getElementById('footerMessage').value,
        showPoweredBy: document.getElementById('showPoweredBy').checked
    };

    DB.set(DB.KEYS.SETTINGS, settings);
    showAlert('تم حفظ إعدادات الفاتورة بنجاح', 'success');
}

// إضافة فئة جديدة
function addCategory() {
    const newCategory = document.getElementById('newCategory').value.trim();

    if (!newCategory) {
        showAlert('أدخل اسم الفئة', 'warning');
        return;
    }

    const categories = DB.get(DB.KEYS.CATEGORIES);

    if (categories.includes(newCategory)) {
        showAlert('الفئة موجودة بالفعل', 'warning');
        return;
    }

    categories.push(newCategory);
    DB.set(DB.KEYS.CATEGORIES, categories);

    document.getElementById('newCategory').value = '';
    showAlert('تم إضافة الفئة بنجاح', 'success');
    showPage('settings');
}

// حذف فئة
function deleteCategory(category) {
    // التحقق من عدم استخدام الفئة
    const products = DB.getAllProducts();
    const usedInProducts = products.some(p => p.category === category);

    if (usedInProducts) {
        showAlert('لا يمكن حذف الفئة لأنها مستخدمة في منتجات', 'warning');
        return;
    }

    showConfirm(
        'تأكيد الحذف',
        `هل تريد حذف الفئة "${category}"؟`,
        (confirmed) => {
            if (confirmed) {
                const categories = DB.get(DB.KEYS.CATEGORIES);
                const filtered = categories.filter(c => c !== category);
                DB.set(DB.KEYS.CATEGORIES, filtered);
                showAlert('تم حذف الفئة بنجاح', 'success');
                showPage('settings');
            }
        }
    );
}

// تغيير كلمة المرور
function changePassword(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const settings = DB.get(DB.KEYS.SETTINGS);

    // التحقق من كلمة المرور الحالية
    if (DB.hashPassword(currentPassword) !== settings.password) {
        showAlert('كلمة المرور الحالية غير صحيحة', 'danger');
        return;
    }

    // التحقق من تطابق كلمة المرور الجديدة
    if (newPassword !== confirmPassword) {
        showAlert('كلمة المرور الجديدة غير متطابقة', 'danger');
        return;
    }

    // التحقق من طول كلمة المرور
    if (newPassword.length < 3) {
        showAlert('كلمة المرور يجب أن تكون 3 أحرف على الأقل', 'warning');
        return;
    }

    // حفظ كلمة المرور الجديدة
    settings.password = DB.hashPassword(newPassword);
    DB.set(DB.KEYS.SETTINGS, settings);

    // مسح الحقول
    document.getElementById('passwordForm').reset();

    showAlert('تم تغيير كلمة المرور بنجاح', 'success');
}

