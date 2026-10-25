/**
 * Punjab's Attire - Main JavaScript
 * Handles waitlist lead capture and Google Sheets integration
 */

// ============================================================
// CONFIGURATION: Injected automatically by GitHub Actions secret
// In local development, you can define window.LOCAL_GOOGLE_SHEET_URL
// ============================================================
const INJECTED_URL = '{{GOOGLE_SHEET_URL}}';
const GOOGLE_SHEET_URL = (INJECTED_URL && !INJECTED_URL.startsWith('{{'))
    ? INJECTED_URL
    : (window.LOCAL_GOOGLE_SHEET_URL || '');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notify-form');
    const emailInput = document.getElementById('email-input');
    const botCheck = document.getElementById('bot-check');
    const feedback = document.getElementById('notify-feedback');
    const btn = document.getElementById('notify-btn');

    // Check if user previously subscribed in this browser
    const savedEmail = localStorage.getItem('pa_subscribed_email');
    if (savedEmail && feedback) {
        feedback.innerHTML = `
            <span class="text-[#e5a93c] font-medium">
                ✨ You're already on our VIP waitlist (${savedEmail})! We'll notify you first.
            </span>
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

            const email = emailInput.value.trim();
            if (!email) return;

            // Visual loading state
            const originalBtnText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="inline-flex items-center gap-1.5"><svg class="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> SENDING...</span>`;

            try {
                // If a Google Sheets URL is configured, post to it
                if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== '') {
                    const params = new URLSearchParams();
                    params.append('email', email);
                    params.append('timestamp', new Date().toISOString());

                    await fetch(GOOGLE_SHEET_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: params.toString()
                    });
                }

                // Persist subscription in browser storage
                localStorage.setItem('pa_subscribed_email', email);

                // Update button visual state
                btn.innerHTML = `✓ NOTIFIED`;
                btn.classList.add('opacity-85', 'cursor-default');

                // Display friendly success feedback
                if (feedback) {
                    feedback.innerHTML = `
                        <div class="p-3.5 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs sm:text-sm shadow-xl backdrop-blur-sm animate-fade-in">
                            🎉 <strong>Thank you!</strong> You've been added to our VIP launch list. 
                            <a href="https://chat.whatsapp.com/Fs37cZAzrcT5xDpqOVY6xR?s=cl&p=a&mlu=4&ilr=4" target="_blank" rel="noopener noreferrer" class="underline text-[#e5a93c] font-semibold hover:text-yellow-200 ml-1">
                                Join our WhatsApp Group
                            </a> for exclusive preview drops!
                        </div>
                    `;
                    feedback.classList.remove('hidden');
                }

                emailInput.value = '';

            } catch (error) {
                console.error('Waitlist submission error:', error);
                // Fallback: still save locally so visitor is not frustrated
                localStorage.setItem('pa_subscribed_email', email);

                btn.disabled = false;
                btn.innerHTML = originalBtnText;

                if (feedback) {
                    feedback.innerHTML = `
                        <div class="p-3.5 bg-yellow-950/60 border border-yellow-500/40 rounded-xl text-yellow-300 text-xs sm:text-sm shadow-xl">
                            Saved locally! Also feel free to <a href="https://chat.whatsapp.com/Fs37cZAzrcT5xDpqOVY6xR?s=cl&p=a&mlu=4&ilr=4" target="_blank" class="underline font-bold text-white">join our WhatsApp group</a> directly.
                        </div>
                    `;
                    feedback.classList.remove('hidden');
                }
            }
        });
    }
});
