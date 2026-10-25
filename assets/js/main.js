/**
 * Punjab's Attire - Main JavaScript
 * Handles waitlist lead capture (WhatsApp & Email) and Google Sheets integration
 */

// ============================================================
// CONFIGURATION: Injected automatically by GitHub Actions secret
// In local development, you can define window.LOCAL_GOOGLE_SHEET_URL
// in assets/js/config.local.js (which is ignored by git)
// ============================================================
const INJECTED_URL = '{{GOOGLE_SHEET_URL}}';
const GOOGLE_SHEET_URL = (INJECTED_URL && !INJECTED_URL.startsWith('{{'))
    ? INJECTED_URL
    : (window.LOCAL_GOOGLE_SHEET_URL || '');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notify-form');
    const phoneInput = document.getElementById('phone-input');
    const emailInput = document.getElementById('email-input');
    const botCheck = document.getElementById('bot-check');
    const feedback = document.getElementById('notify-feedback');
    const btn = document.getElementById('notify-btn');

    // Check if user previously subscribed in this browser
    const savedContact = localStorage.getItem('pa_subscribed_contact') || localStorage.getItem('pa_subscribed_email');
    if (savedContact && feedback) {
        feedback.innerHTML = `
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#091528]/95 border border-[#e5a93c]/60 rounded-xl text-[#f5d78e] text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md animate-fade-in">
                <span class="text-base text-[#e5a93c]">✨</span>
                <span>You're on our VIP waitlist (<strong class="text-white font-semibold">${savedContact}</strong>)! We'll notify you first.</span>
            </div>
        `;
        feedback.classList.remove('hidden');
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Anti-bot Honeypot check: If bot filled hidden field, exit silently
            if (botCheck && botCheck.value.trim() !== '') {
                console.warn('Bot detected and blocked.');
                return;
            }

            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            // Validation: User must provide at least one contact method
            if (!phone && !email) {
                if (feedback) {
                    feedback.innerHTML = `
                        <div class="p-2.5 bg-amber-950/70 border border-amber-500/50 rounded-xl text-amber-300 text-xs shadow-md">
                            ⚠️ Please provide your WhatsApp number or email address.
                        </div>
                    `;
                    feedback.classList.remove('hidden');
                }
                if (phoneInput) phoneInput.focus();
                return;
            }

            // Visual loading state
            const originalBtnText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="inline-flex items-center gap-1.5"><svg class="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> SENDING...</span>`;

            try {
                // Dispatch to Google Apps Script endpoint
                if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== '') {
                    console.log('Submitting to Google Sheet...', { phone, email });
                    const formData = new FormData();
                    if (phone) formData.append('phone', phone);
                    if (email) formData.append('email', email);
                    formData.append('timestamp', new Date().toISOString());

                    await fetch(GOOGLE_SHEET_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                    });
                    console.log('Submission sent successfully to Google Sheet.');
                }

                // Persist subscription in browser storage
                const primaryContact = phone || email;
                localStorage.setItem('pa_subscribed_contact', primaryContact);

                // Update button visual state
                btn.innerHTML = `✓ ADDED TO VIP LIST`;
                btn.classList.add('opacity-85', 'cursor-default');

                // Display friendly success feedback
                if (feedback) {
                    const notifyTarget = phone ? `WhatsApp (${phone})` : `email (${email})`;
                    feedback.innerHTML = `
                        <div class="p-3.5 bg-emerald-950/90 border border-emerald-400/50 rounded-xl text-emerald-200 text-xs sm:text-sm shadow-xl backdrop-blur-md animate-fade-in">
                            🎉 <strong>Thank you!</strong> You're on our launch list. We'll reach out to your ${notifyTarget}. 
                            <a href="https://chat.whatsapp.com/Fs37cZAzrcT5xDpqOVY6xR?s=cl&p=a&mlu=4&ilr=4" target="_blank" rel="noopener noreferrer" class="underline text-[#f5d78e] font-semibold hover:text-white ml-1">
                                Click here to join our WhatsApp VIP Group
                            </a> for instant updates!
                        </div>
                    `;
                    feedback.classList.remove('hidden');
                }

                if (phoneInput) phoneInput.value = '';
                if (emailInput) emailInput.value = '';

            } catch (error) {
                console.error('Waitlist submission error:', error);
                const primaryContact = phone || email;
                localStorage.setItem('pa_subscribed_contact', primaryContact);

                btn.disabled = false;
                btn.innerHTML = originalBtnText;

                if (feedback) {
                    feedback.innerHTML = `
                        <div class="p-3.5 bg-yellow-950/60 border border-yellow-500/40 rounded-xl text-yellow-300 text-xs sm:text-sm shadow-xl">
                            Saved locally! You can also <a href="https://chat.whatsapp.com/Fs37cZAzrcT5xDpqOVY6xR?s=cl&p=a&mlu=4&ilr=4" target="_blank" class="underline font-bold text-white">join our WhatsApp VIP group</a> directly.
                        </div>
                    `;
                    feedback.classList.remove('hidden');
                }
            }
        });
    }
});
